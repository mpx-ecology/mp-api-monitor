import { addMonitor, removeMonitor, setDataGenerator, getDataGenerators } from './monitor'
import { proxySetData } from './proxySetData'
import { proxyAPI } from './proxyAPI'
import { filterTrue, groupByType, sortByCount, byteLength } from './utils'
import { initDataGen } from './dataGen'
import type { RecordDataQueue, WarningRule, InitialConfig, Stage, RecordData, RecordMeta, StatisticConfig, GroupData, Summary } from './types'

export { setDataGenerator, getDataGenerators, byteLength }
export * from './warningRules'
export type {
  RecordDataQueue,
  WarningRule,
  InitialConfig,
  Stage,
  RecordData,
  RecordMeta,
  StatisticConfig,
  GroupData,
  Summary,
  RecordAPIConfig,
  ContextInfo,
  PageInfo,
  StackConfig,
  Filter,
  GroupBy,
  SortBy,
  IAnyObject,
  DataGen
} from './types'

initDataGen()

export class APIMonitor {
  recordData = new Map<string, RecordDataQueue>()
  isActive = false
  preWarningRules = new Map<string, Array<WarningRule>>()
  postWarningRules = new Map<string, Array<WarningRule>>()
  config: InitialConfig
  dataCount: number = 0

  constructor(config?: InitialConfig) {
    this.config = Object.assign({
      recordSetData: true,
      recordAPI: true
    }, config)

    addMonitor(this)

    if (this.config.recordSetData) {
      proxySetData()
    }
    if (this.config.recordAPI) {
      proxyAPI(typeof this.config.recordAPI === 'boolean' ? {} : this.config.recordAPI)
    }
  }

  clearData() {
    this.recordData.clear()
  }

  startRecord(clear?: boolean) {
    if (clear) this.clearData()
    this.isActive = true
  }

  endRecord() {
    this.isActive = false
  }

  checkWarningRules(type: string, stage: Stage = 'pre') {
    const warningRules = this.getWarningRules(type, stage)
    const recordData = this.getRecordData(type)
    if (warningRules && recordData) {
      warningRules.forEach((warningRule) => {
        warningRule(recordData, this)
      })
    }
  }

  addWarningRule(types: string | string[], rule: WarningRule, stage: Stage = 'pre') {
    if (typeof types === 'string') types = [types]
    types.forEach((type) => {
      const warningRulesMap = (rule.stage || stage) === 'pre' ? this.preWarningRules : this.postWarningRules
      const rules = warningRulesMap.get(type) || []
      if (!warningRulesMap.has(type)) warningRulesMap.set(type, rules)
      rules.push(rule)
    })
  }

  getWarningRules(type: string, stage: Stage = 'pre') {
    const warningRulesMap = stage === 'pre' ? this.preWarningRules : this.postWarningRules
    return warningRulesMap.get(type)
  }

  addRecordData(data: RecordData) {
    if (this.config.dataLimit) {
      this.dataCount++
      if (this.dataCount > this.config.dataLimit) this.clearData()
    }

    const dataQueue = this.recordData.get(data.type) || [] as unknown as RecordDataQueue
    if (!this.recordData.has(data.type)) {
      this.recordData.set(data.type, dataQueue)
      dataQueue.meta = {
        parallelism: 0
      }
    }
    dataQueue.push(data)
  }

  updateMeta(type: string, updater: (meta: RecordMeta) => void) {
    const recordData = this.getRecordData(type)
    if (recordData) updater(recordData.meta)
  }

  getAllRecordData() {
    return this.recordData
  }

  getAllRecordDataTypes(exclude: Array<string> = []) {
    return [...this.recordData.keys()].filter((key) => !exclude.includes(key))
  }

  getRecordData(type: string) {
    if (!type) throw new Error('Arg [type] must be passed, such as monitor.getRecordData(\'request\'), you can also check valid type string by monitor.getAllRecordDataTypes().')
    return this.recordData.get(type)
  }

  getStatistics(types: string[] = [], { filter = filterTrue, groupBy = groupByType, sortBy = sortByCount }: StatisticConfig = {}) {
    const groupMap = new Map<string, GroupData>()

    types.forEach((type) => {
      const recordData = this.getRecordData(type)
      if (recordData) {
        recordData.forEach((data) => {
          if (!filter(data)) return
          const key = groupBy(data)
          const groupData = groupMap.get(key) || {
            key,
            count: 0,
            size: 0,
            resultSize: 0,
            duration: 0
          }
          if (!groupMap.has(key)) groupMap.set(key, groupData)
          groupData.count++
          groupData.duration += data.duration || 0
          groupData.size += data.size || 0
          groupData.resultSize += data.resultSize || 0
        })
      }
    })

    return [...groupMap.values()].sort((a, b) => sortBy(b) - sortBy(a))
  }

  getSummary() {
    const { config } = this
    const summary: Summary = {}
    if (config.recordSetData) {
      summary.setData = this.getStatistics(['setData'], {
        groupBy: (data) => data.contextInfo?.is || 'unknown',
        sortBy: (data) => data.size
      })
    }

    if (config.recordAPI) {
      if (this.getRecordData('request')) {
        summary.request = this.getStatistics(['request'], {
          groupBy: (data) => {
            if (!data.url) return 'unknown'
            const idx = data.url.indexOf('?')
            return idx === -1 ? data.url : data.url.slice(0, idx)
          }
        })
      }

      const otherTypes = this.getAllRecordDataTypes(['setData', 'request'])
      summary.api = this.getStatistics(otherTypes)
    }
    return summary
  }

  destroy() {
    this.clearData()
    this.preWarningRules.clear()
    this.postWarningRules.clear()
    this.isActive = false
    removeMonitor(this)
  }
}
