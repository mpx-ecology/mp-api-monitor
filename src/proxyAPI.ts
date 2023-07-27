import { byteLength, getContextInfo, getEnvObj, getEnv } from './utils'
import { getCurrentContext } from './context'
import { addRecordData, updateMeta, checkWarningRules, getDataGenerator } from './monitor'

const envObj = getEnvObj()
const env = getEnv()

const syncList = [
  'clearStorage',
  'hideToast',
  'hideLoading',
  'drawCanvas',
  'canIUse',
  'stopRecord',
  'pauseVoice',
  'stopVoice',
  'pauseBackgroundAudio',
  'stopBackgroundAudio',
  'showNavigationBarLoading',
  'hideNavigationBarLoading',
  'createAnimation',
  'createAnimationVideo',
  'createSelectorQuery',
  'createIntersectionObserver',
  'hideKeyboard',
  'stopPullDownRefresh',
  'createWorker',
  'pageScrollTo',
  'reportAnalytics',
  'getMenuButtonBoundingClientRect',
  'reportMonitor',
  'createOffscreenCanvas',
  'reportEvent'
]

const syncListMap = syncList.reduce<IAnyObject>((acc, cur) => {
  acc[cur] = true
  return acc
}, {})

function isSync (key: string, config: RecordAPIConfig) {
  return syncListMap[key] ||
    /^get\w*Manager$/.test(key) || // 获取manager的api
    /^create\w*Context$/.test(key) || // 创建上下文相关api
    /^(on|off)/.test(key) || // 以 on* 或 off开头的方法
    /\w+Sync$/.test(key) ||// 以Sync结尾的方法
    (config.isAsync && config.isAsync.includes(key))
}

let proxyed = false

export function proxyAPI (config: RecordAPIConfig) {
  if (!envObj || proxyed) return

  Object.keys(envObj).forEach((type: keyof typeof envObj) => {
    if (
      (config.include && !config.include.includes(type)) ||
      (config.exclude && config.exclude.includes(type))
    ) return

    const original = envObj[type]

    if (typeof original !== 'function') return

    let value: (...args: any[]) => any

    if (isSync(type, config)) {
      // sync
      value = function (this: typeof envObj, ...args) {
        const recordData: RecordData = {
          type,
          startTime: +new Date()
        }
        const preDataGen = getDataGenerator(type)
        if (preDataGen) {
          Object.assign(recordData, preDataGen(args))
        }

        addRecordData(recordData)

        checkWarningRules(type)

        const result = original.apply(this, args)

        recordData.endTime = +new Date()
        recordData.duration = recordData.endTime - recordData.startTime
        const postDataGen = getDataGenerator(type, 'post')
        if (postDataGen) {
          Object.assign(recordData, postDataGen([result]))
        }

        checkWarningRules(type, 'post')

        return result
      }

    } else {
      // async
      value = function (this: typeof envObj, ...args) {
        let recordData: RecordData = {
          type,
          startTime: +new Date()
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

        const opt = args[0] || {}
        const successRaw = opt.success
        const failRaw = opt.fail
        opt.success = function (...args: any[]) {
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
          successRaw && successRaw.apply(this, args)
        }

        opt.fail = function (...args: any[]) {
          const res = args[0]
          if (env === 'ali') {
            recordData.errno = res.error
            recordData.errMsg = res.errorMessage
          } else {
            recordData.errno = res.errno
            recordData.errMsg = res.errMsg
          }

          recordData.endTime = +new Date()
          recordData.duration = recordData.endTime - recordData.startTime

          updateMeta(type, (meta) => {
            meta.parallelism--
          })
          checkWarningRules(type, 'post')

          // for gc
          recordData = null as unknown as RecordData
          failRaw && failRaw.apply(this, args)
        }
        args[0] = opt
        return original.apply(this, args)
      }
    }

    Object.defineProperty(envObj, type, {
      value,
      writable: false,
      configurable: true,
      enumerable: true
    })
  })

  proxyed = true
}
