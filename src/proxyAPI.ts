import { getEnvObj, getEnv } from './utils'
import { addRecordData, updateMeta, checkWarningRules, getDataGenerators } from './monitor'
import type { IAnyObject, StackConfig, RecordData } from './types'

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

function isSync(key: string) {
  return syncListMap[key] ||
    /^get\w*Manager$/.test(key) || // 获取manager的api
    /^create\w*Context$/.test(key) || // 创建上下文相关api
    /^(on|off)/.test(key) || // 以 on* 或 off开头的方法
    /\w+Sync$/.test(key) ||// 以Sync结尾的方法
    (customSyncList && customSyncList.includes(key))
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

let stackConfig: StackConfig | null = null
/**
 * 设置是否在API recordData中生成stack信息，开启时会有一定额外开销，建议配合include/exclude局部开启，传递false则关闭。
 */
export function setStackConfig(config: StackConfig | boolean) {
  if (config) {
    console.warn('Recording stack info will increase performance overhead, do not enable it unless necessary!')
    stackConfig = config === true ? {} : config
  } else {
    stackConfig = null
  }
}

let customSyncList: string[] | null = null
/**
 * 自定义设置同步API list，list中的API将被作为同步方法进行录代理录制，一般情况下不用设置。
 */
export function setCustomSyncList(list: string[]) {
  customSyncList = list
}

export function proxyAPI() {
  if (!envObj || proxyed) return

  Object.keys(envObj).forEach((type: keyof typeof envObj) => {
    const original = envObj[type]
    if (typeof original !== 'function') return

    const sync = isSync(type)

    const value = function (this: typeof envObj, ...args: any[]) {
      let stackInfo: string[] = []
      if (stackConfig) {
        if (
          (stackConfig.include && !stackConfig.include.includes(type)) ||
          (stackConfig.exclude && stackConfig.exclude.includes(type))
        ) {
          // skip stack
        } else {
          stackInfo = __call_trace(stackConfig.depth)
        }
      }
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
