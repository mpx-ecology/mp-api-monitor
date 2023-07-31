import { WarningRule } from './index'

interface WarningCfg {
  onWarning: (msg: string, recordData: RecordDataQueue) => void
}

interface CountCfg extends WarningCfg {
  count: number
  duration?: number
}

interface ParallelismCfg extends WarningCfg {
  parallelism: number
}

interface ErrorCfg extends WarningCfg {
  errno?: number
}

interface SizeCfg extends WarningCfg {
  size: number
  count?: number
  duration?: number
}

export function getCountRule (countCfg: CountCfg): WarningRule {
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

export function getParallelismRule (parallelismCfg: ParallelismCfg): WarningRule {
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

export function getRouteParallelismRule (parallelismCfg: ParallelismCfg): WarningRule {
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

export function getErrorRule (errorCfg: ErrorCfg): WarningRule {
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

export function getSizeRule (sizeCfg: SizeCfg): WarningRule {
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

export function getResultSizeRule (sizeCfg: SizeCfg): WarningRule {
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
