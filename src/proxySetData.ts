import { addRecordData, updateMeta, checkWarningRules, getDataGenerator } from './monitor'
import { getContextInfo, byteLength, getEnv } from './utils'
/* eslint-disable prefer-spread, no-global-assign */
let proxyed = false
const env = getEnv()
const type = 'setData'

function doProxy (context: ComponentIns) {
  const setDataRaw = context.setData
  context._lastTime = 0
  context._lastCallback = null
  context._setting = 0
  context.setData = function (...args) {
    const data = args[0]
    let recordData: RecordData = {
      type,
      startTime: +new Date(),
      size: data ? byteLength(JSON.stringify(data)) : 0,
      contextInfo: getContextInfo(context)
    }

    const preDataGen = getDataGenerator(type)
    if (preDataGen) {
      Object.assign(recordData, preDataGen(args))
    }

    addRecordData(recordData)
    updateMeta(type, (meta) => {
      meta.parallelism++
    })

    checkWarningRules(type)

    const callbackRaw = args[1]
    args[1] = function (...args) {
      recordData.endTime = +new Date()
      recordData.duration = recordData.endTime - recordData.startTime
      const postDataGen = getDataGenerator(type, 'post')
      if (postDataGen) {
        Object.assign(recordData, postDataGen(args))
      }
      updateMeta(type, (meta) => {
        meta.parallelism--
      })
      checkWarningRules(type, 'post')

      // for gc
      recordData = null as unknown as RecordData
      return callbackRaw && callbackRaw.apply(this, args)
    }

    setDataRaw.apply(this, args)
  }
}

export function proxySetData () {
  if (proxyed) return
  proxyed = true
  // proxyPage
  const PageRaw = Page
  const proxyPage = function (...args: any[]) {
    const options = args[0]
    const onLoadRaw = options.onLoad
    options.onLoad = function (this: ComponentIns, ...args: any[]) {
      doProxy(this)
      onLoadRaw && onLoadRaw.apply(this, args)
    }
    return PageRaw.apply(null, args)
  }

  Page = proxyPage

  const ComponentRaw = Component

  const proxyComponent = function (...args: any[]) {
    const options = args[0]
    if (env === 'wx') {
      const behavior = Behavior({
        created (this: ComponentIns) {
          doProxy(this)
        }
      })
      const rawBehaviors = options.behaviors
      options.behaviors = rawBehaviors ? [behavior].concat(rawBehaviors) : [behavior]
    } else if (env === 'ali') {
      const mixinObj = {
        onInit (this: ComponentIns) {
          doProxy(this)
        }
      }
      const mixin = Mixin ? Mixin(mixinObj) : mixinObj
      const rawMixins = options.mixins
      options.mixins = rawMixins ? [mixin].concat(rawMixins) : [mixin]
    }
    return ComponentRaw.apply(null, args)
  }

  Component = proxyComponent

}
