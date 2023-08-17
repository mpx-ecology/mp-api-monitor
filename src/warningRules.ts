import { WarningRule } from './index'
import type { RecordDataQueue } from './types'

export interface WarningCfg {
  onWarning: (msg: string, recordData: RecordDataQueue) => void
}

export interface CountCfg extends WarningCfg {
  count: number
  duration?: number
}

export interface ParallelismCfg extends WarningCfg {
  parallelism: number
}

export interface ErrorCfg extends WarningCfg {
  errno?: number
}

export interface SizeCfg extends WarningCfg {
  size: number
  count?: number
  duration?: number
}
/**
 * 获取API调用次数报警规则
 * @example
 * ```ts
 * // 获取报警规则，API在100ms内不应该调用超过2次
 * const countRule = getCountRule({
 *   count: 2,
 *   duration: 100,
 *   onWarning(msg, recordDataQueue) {
 *     console.error(msg, recordDataQueue)
 *   }
 * })
 * // 对 getLocation 和 getSystemInfoSync 应用该报警规则
 * monitor.addWarningRule([
 *   'getLocation',
 *   'getSystemInfoSync'
 * ], countRule)
 * ```
 */
export function getCountRule(countCfg: CountCfg): WarningRule {
  return function (recordData) {
    const now = +new Date()
    for (let i = recordData.length - 1; i >= 0; i--) {
      const item = recordData[i]
      if (countCfg.duration && now - item.startTime > countCfg.duration) break
      if (recordData.length - i > countCfg.count) {
        const msg = `${item.type} api invoking exceeded count limit ${countCfg.count}${countCfg.duration ? ` in ${countCfg.duration}ms` : ''}, please check!`
        countCfg.onWarning(msg, recordData)
        break
      }
    }
  }
}
/**
 * 获取异步API调用并发数报警规则
 * @example
 * ```ts
 * // 调用并发数不应该超过10
 * const parallelismRule = getParallelismRule({
 *   parallelism: 10,
 *   onWarning(msg, recordData) {
 *     console.error(msg, recordData)
 *   }
 * })
 * // 对 request 应用该规则
 * monitor.addWarningRule('request', parallelismRule)
 * ```
 */
export function getParallelismRule(parallelismCfg: ParallelismCfg): WarningRule {
  return function (recordData) {
    const item = recordData[recordData.length - 1]
    if (recordData.meta.parallelism > parallelismCfg.parallelism) {
      const msg = `${item.type} api invoking exceeded parallelism limit ${parallelismCfg.parallelism}, please check!`
      parallelismCfg.onWarning(msg, recordData)
    }
  }
}

const routeTypes = [
  'switchTab',
  'reLaunch',
  'redirectTo',
  'navigateTo',
  'navigateBack'
]
/**
 * 获取路由API调用并发数报警规则
 * @example
 * ```ts
 * // 路由API调用并发数不应该超过1，对所有路由API共同生效
 * monitor.addWarningRule([
 *   'switchTab',
 *   'reLaunch',
 *   'redirectTo',
 *   'navigateTo',
 *   'navigateBack'
 * ], getRouteParallelismRule({
 *   parallelism: 1,
 *   onWarning(msg, recordData) {
 *     console.error(msg, recordData)
 *   }
 * }))
 * ```
 */
export function getRouteParallelismRule(parallelismCfg: ParallelismCfg): WarningRule {
  return function (recordData, monitor) {
    let parallelism = 0
    const item = recordData[recordData.length - 1]
    for (const type of routeTypes) {
      const routeRecordData = monitor.getRecordData(type)
      if (routeRecordData) parallelism += routeRecordData.meta.parallelism
      if (parallelism > parallelismCfg.parallelism) {
        const msg = `${item.type} api invoking exceeded route parallelism limit ${parallelismCfg.parallelism}, please check!`
        parallelismCfg.onWarning(msg, recordData)
        break
      }
    }
  }
}
/**
 * 获取API调用报错报警规则，不传递errno则对于所有错误都报警
 * @example
 * ```ts
 * // request返回错误码600000时报警
 * monitor.addWarningRule('request', getErrorRule({
 *   errno: 600000,
 *   onWarning(msg, recordData) {
 *     console.error(msg, recordData)
 *   }
 * }))
 * ```
 */
export function getErrorRule(errorCfg: ErrorCfg): WarningRule {
  const rule: WarningRule = function (recordData) {
    const item = recordData[recordData.length - 1]
    if (errorCfg.errno ? errorCfg.errno === item.errno : item.errno !== undefined) {
      const msg = `${item.type} api invoking with errno ${item.errno}, please check!`
      errorCfg.onWarning(msg, recordData)
    }
  }
  rule.stage = 'post'
  return rule
}
/**
 * 获取API发送数据size报警规则，可以通过count限定一定次数内累积size不超过阈值，也可以通过duration限定一定时间内累积size不超过阈值
 * @example
 * ```ts
 * // setData单次发送数据大小不应该超过10K
 * monitor.addWarningRule('setData', getSizeRule({
 *   size: 10000,
 *   count: 1,
 *   onWarning(msg, recordData) {
 *     console.error(msg, recordData)
 *   }
 * }))
 * ```
 */
export function getSizeRule(sizeCfg: SizeCfg): WarningRule {
  return function (recordData) {
    const now = +new Date()
    let size = 0
    for (let i = recordData.length - 1; i >= 0; i--) {
      const item = recordData[i]
      size += item.size || 0
      if (sizeCfg.count && recordData.length - i > sizeCfg.count) break
      if (sizeCfg.duration && now - item.startTime > sizeCfg.duration) break
      if (size > sizeCfg.size) {
        const msg = `${item.type} api invoking exceeded size limit ${sizeCfg.size}${sizeCfg.duration ? ` in ${sizeCfg.duration}ms` : ''}, please check!`
        sizeCfg.onWarning(msg, recordData)
        break
      }
    }
  }
}
/**
 * 获取API接收数据size报警规则，可以通过count限定一定次数内累积size不超过阈值，也可以通过duration限定一定时间内累积size不超过阈值
 * @example
 * ```ts
 * // request在1s内累积接收数据大小不应该超过100K
 * monitor.addWarningRule('request', getResultSizeRule({
 *   size: 100000,
 *   duration: 1000,
 *   onWarning(msg, recordData) {
 *     console.error(msg, recordData)
 *   }
 * }))
 * ```
 */
export function getResultSizeRule(sizeCfg: SizeCfg): WarningRule {
  const rule: WarningRule = function (recordData) {
    const now = +new Date()
    let size = 0
    for (let i = recordData.length - 1; i >= 0; i--) {
      const item = recordData[i]
      size += item.resultSize || 0
      if (sizeCfg.count && recordData.length - i > sizeCfg.count) break
      if (sizeCfg.duration && now - item.startTime > sizeCfg.duration) break
      if (size > sizeCfg.size) {
        const msg = `${item.type} api invoking exceeded resultSize limit ${sizeCfg.size}${sizeCfg.duration ? ` in ${sizeCfg.duration}ms` : ''}, please check!`
        sizeCfg.onWarning(msg, recordData)
        break
      }
    }
  }
  rule.stage = 'post'
  return rule
}
