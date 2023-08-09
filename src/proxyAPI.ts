import { getEnvObj, getEnv } from './utils'
import { addRecordData, updateMeta, checkWarningRules, getDataGenerators } from './monitor'
import type { IAnyObject, RecordAPIConfig, StackConfig, RecordData } from './types'

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
  'reportEvent',
  'nextTick'
]

const syncListMap = syncList.reduce<IAnyObject>((acc, cur) => {
  acc[cur] = true
  return acc
}, {})

function isSync(key: string, config: RecordAPIConfig) {
  return syncListMap[key] ||
    /^get\w*Manager$/.test(key) || // 获取manager的api
    /^create\w*Context$/.test(key) || // 创建上下文相关api
    /^(on|off)/.test(key) || // 以 on* 或 off开头的方法
    /\w+Sync$/.test(key) ||// 以Sync结尾的方法
    (config.isAsync && config.isAsync.includes(key))
}

function __call_trace(depth?: number) {
  const result: string[] = []
  try {
    throw new Error()
  } catch (e) {
    if (e.stack) {
      const stacks = e.stack.split('\n')
      let start = -1
      for (let i = 0; i < stacks.length; i++) {
        const info = stacks[i].trim()
        if (start === -1) {
          if (info.includes('__call_trace')) start = i
          continue
        } else {
          if (depth && i - start > depth) break
          if (info) result.push(info)
        }
      }
    }
  }
  return result
}

let proxyed = false

export function proxyAPI(config: RecordAPIConfig) {
  if (!envObj || proxyed) return

  let stackConfig: StackConfig = {}

  if (config.needStack) {
    stackConfig = typeof config.needStack === 'boolean' ? {} : config.needStack
    console.warn('Recording stack info will significantly increase performance overhead, do not enable it unless necessary!')
  }

  Object.keys(envObj).forEach((type: keyof typeof envObj) => {
    if (
      (config.include && !config.include.includes(type)) ||
      (config.exclude && config.exclude.includes(type))
    ) return

    const original = envObj[type]
    if (typeof original !== 'function') return

    const sync = isSync(type, config)

    let needStack = false
    if (config.needStack) {
      if (
        (stackConfig.include && !stackConfig.include.includes(type)) ||
        (stackConfig.exclude && stackConfig.exclude.includes(type))
      ) {
        // skip stack
      } else {
        needStack = true
      }
    }

    const value = function (this: typeof envObj, ...args: any[]) {
      const stackInfo: string[] = needStack ? __call_trace(stackConfig.depth) : []
      let recordData: RecordData = {
        type,
        startTime: +new Date()
      }
      if (stackInfo.length) recordData.stack = stackInfo
      const preDataGens = getDataGenerators(type)
      if (preDataGens) {
        for (const preDataGen of preDataGens) {
          Object.assign(recordData, preDataGen(args, recordData))
        }
      }
      addRecordData(recordData)

      if (sync) {
        // sync
        checkWarningRules(type)
        const result = original.apply(this, args)
        recordData.endTime = +new Date()
        recordData.duration = recordData.endTime - recordData.startTime
        const postDataGens = getDataGenerators(type, 'post')
        if (postDataGens) {
          for (const postDataGen of postDataGens) {
            Object.assign(recordData, postDataGen([result], recordData))
          }
        }
        checkWarningRules(type, 'post')
        return result
      } else {
        //async
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
          const postDataGens = getDataGenerators(type, 'post')
          if (postDataGens) {
            for (const postDataGen of postDataGens) {
              Object.assign(recordData, postDataGen(args, recordData))
            }
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
