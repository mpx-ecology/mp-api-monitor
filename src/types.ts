import type { APIMonitor } from "./index"

export type IAnyObject = Record<string, any>

export interface ComponentIns extends WechatMiniprogram.Component.Instance<IAnyObject, IAnyObject, IAnyObject> {
  $page?: WechatMiniprogram.Page.Instance<IAnyObject, IAnyObject>
}

export interface RequestConfig extends WechatMiniprogram.RequestOption {
  headers?: IAnyObject
}

export type RequestResult = Optional<WechatMiniprogram.RequestSuccessCallbackResult & WechatMiniprogram.Err & AliErr & {
  headers: IAnyObject
}>

export interface AliErr {
  error: number
  errorMessage: string
}

export interface PageInfo {
  index: number,
  route: string
}

export interface ContextInfo {
  is?: string
  pageInfo?: PageInfo
}

export interface InitialConfig {
  recordSetData?: boolean
  recordAPI?: boolean | RecordAPIConfig
  dataLimit?: number
}

export interface Summary {
  setData?: IAnyObject
  request?: IAnyObject
  api?: IAnyObject
}

export type Stage = 'pre' | 'post'

export interface WarningRule {
  (recordData: RecordDataQueue, monitor: APIMonitor): void

  stage?: Stage
}

export interface RecordData {
  type: string
  startTime: number
  endTime?: number
  duration?: number
  contextInfo?: ContextInfo
  stack?: string[]
  size?: number
  resultSize?: number
  errno?: number
  errMsg?: string

  [key: string]: any
}

export interface RecordDataQueue extends Array<RecordData> {
  meta: RecordMeta
}

export interface RecordMeta {
  parallelism: number
}

export interface GroupData {
  count: number
  duration: number
  size: number
  resultSize: number
}

export interface DataGen {
  (args: any[]): IAnyObject | void
}

export interface Filter {
  (item: RecordData): boolean
}

export interface GroupBy {
  (item: RecordData): string
}

export interface SortBy {
  (item: GroupData): number
}

export interface StatisticConfig {
  filter?: Filter
  groupBy?: GroupBy
  sortBy?: SortBy
}

export interface RecordAPIConfig {
  include?: string[]
  exclude?: string[]
  isAsync?: string[]
  needStack?: StackConfig | boolean
}

export interface StackConfig {
  include?: string[]
  exclude?: string[]
  depth?: number
}
