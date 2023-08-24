import { addMonitor, removeMonitor, setDataGenerator } from './monitor'
import { proxySetData } from './proxySetData'
import { proxyAPI, setCustomSyncList, setStackConfig } from './proxyAPI'
import { filterTrue, groupByType, sortByCount, byteLength } from './utils'
import { initDataGen } from './dataGen'
import type {
  RecordDataQueue,
  WarningRule,
  InitialConfig,
  Stage,
  RecordData,
  RecordMeta,
  StatisticConfig,
  GroupData,
  Summary
} from './types'

export * from './warningRules'
export { setDataGenerator, setCustomSyncList, setStackConfig, byteLength }
export type {
  InitialConfig,
  RecordAPIConfig,
  StackConfig,
  RecordData,
  RecordDataQueue,
  RecordMeta,
  ContextInfo,
  PageInfo,
  GroupData,
  Summary,
  WarningRule,
  StatisticConfig,
  Filter,
  GroupBy,
  SortBy,
  DataGen,
  Stage,
  IAnyObject
} from './types'

initDataGen()

/**
 * APIMonitor类，支持创建多个monitor实例对API调用进行代理录制，每个实例拥有独立的录制配置和报警规则，但原始录制数据在多个monitor实例间共享。
 * @example
 * ```ts
 * const monitor = new APIMonitor()
 * monitor.startRecord()
 * setTimeout(() => {
 *   console.log(monitor.getSummary())
 * }, 10000)
 * ```
 */

export class APIMonitor {
  /** @internal */
  private recordData = new Map<string, RecordDataQueue>()
  /** @internal */
  private preWarningRules = new Map<string, Array<WarningRule>>()
  /** @internal */
  private postWarningRules = new Map<string, Array<WarningRule>>()
  /** @internal */
  private config: InitialConfig
  /** @internal */
  private dataCount: number = 0
  /** @internal */
  isActive = false

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
      proxyAPI()
    }
  }

  /**
   * 开始录制，传递 {clear} 为true会先执行 {@link clearData}
   */
  startRecord(clear?: boolean) {
    if (clear) this.clearData()
    this.isActive = true
  }

  /**
   * 结束录制
   */
  endRecord() {
    this.isActive = false
  }

  /** @internal */
  checkWarningRules(type: string, stage: Stage = 'pre') {
    const warningRules = this.getWarningRules(type, stage)
    const recordData = this.getRecordData(type)
    if (warningRules && recordData) {
      warningRules.forEach((warningRule) => {
        warningRule(recordData, this)
      })
    }
  }

  /**
   * 添加报警规则，报警规则可以通过 {@link getCountRule} 等帮助函数快速生成，也可以基于recordData完全自定义。
   * @example
   * ```ts
   * // getLocation 和 getSystemInfoSync 100ms 内不应该调用超过2次
   * monitor.addWarningRule([
   *   'getLocation',
   *   'getSystemInfoSync'
   * ], getCountRule({
   *   count: 2,
   *   duration: 100,
   *   onWarning(msg, recordData) {
   *     console.error(msg, recordData)
   *   }
   * }))
   * ```
   */
  addWarningRule(types: string | string[], rule: WarningRule, stage: Stage = 'pre') {
    if (typeof types === 'string') types = [types]
    types.forEach((type) => {
      const warningRulesMap = (rule.stage || stage) === 'pre' ? this.preWarningRules : this.postWarningRules
      const rules = warningRulesMap.get(type) || []
      if (!warningRulesMap.has(type)) warningRulesMap.set(type, rules)
      rules.push(rule)
    })
  }

  /** @internal */
  getWarningRules(type: string, stage: Stage = 'pre') {
    const warningRulesMap = stage === 'pre' ? this.preWarningRules : this.postWarningRules
    return warningRulesMap.get(type)
  }

  /** @internal */
  filterRecordData(data: RecordData) {
    const type = data.type
    if (type === 'setData') {
      return !!this.config.recordSetData
    }
    const recordAPI = this.config.recordAPI
    if (recordAPI) {
      const config = typeof recordAPI === 'boolean' ? {} : recordAPI
      if (
        (config.include && !config.include.includes(type)) ||
        (config.exclude && config.exclude.includes(type))
      ) {
        // skip
      } else {
        return true
      }
    }
    return false
  }

  /** @internal */
  addRecordData(data: RecordData) {
    if (!this.filterRecordData(data)) return
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

  /** @internal */
  updateMeta(type: string, updater: (meta: RecordMeta) => void) {
    const recordData = this.getRecordData(type)
    if (recordData) updater(recordData.meta)
  }

  /**
   * 返回当前录制的全量recordData
   */
  getAllRecordData() {
    return this.recordData
  }

  /**
   * 返回当前录制的全量recordData的类型数组，可传入 {exclude} 过滤特定类型
   */
  getAllRecordDataTypes(exclude: Array<string> = []) {
    return [...this.recordData.keys()].filter((key) => !exclude.includes(key))
  }

  /**
   * 返回类型为 {type} 的recordData
   */
  getRecordData(type: string) {
    if (!type) throw new Error('Arg [type] must be passed, such as monitor.getRecordData(\'request\'), you can also check valid type string by monitor.getAllRecordDataTypes().')
    return this.recordData.get(type)
  }

  /**
   * 根据传入的 {types} 数组对recordData进行分组统计，可以通过第二个参数自定义统计的过滤、分组和排序逻辑
   * @example
   * ```ts
   * // 对setData进行分组统计，根据所属组件进行分组，根据发送数据大小进行排序
   * const info = monitor.getStatistics(['setData'], {
   *   groupBy: (data) => data.contextInfo?.is || 'unknown',
   *   sortBy: (data) => data.size
   * })
   * console.log(info)
   * ```
   */
  getStatistics(types: string[] = [], {
    filter = filterTrue,
    groupBy = groupByType,
    sortBy = sortByCount
  }: StatisticConfig = {}) {
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

  /**
   * 在内部调用 {@link getStatistics} 分别对setData、request和其余API进行分组统计获取数据摘要
   */
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

  /**
   * 清除全量recordData
   */
  clearData() {
    this.recordData.clear()
  }

  /**
   * 销毁monitor实例
   */
  destroy() {
    this.clearData()
    this.preWarningRules.clear()
    this.postWarningRules.clear()
    this.isActive = false
    removeMonitor(this)
  }
}
