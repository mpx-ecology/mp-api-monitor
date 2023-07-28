/// <reference types="miniprogram-api-typings" />

type IAnyObject = Record<string, any>

interface ComponentIns extends WechatMiniprogram.Component.Instance<IAnyObject, IAnyObject, IAnyObject> {
  $page?: WechatMiniprogram.Page.Instance<IAnyObject, IAnyObject>
}

declare let my: typeof wx

declare let Mixin: typeof Behavior

interface RequestConfig extends WechatMiniprogram.RequestOption {
  headers?: IAnyObject
}

interface AliErr {
  error: number
  errorMessage: string
}

type RequestResult = Optional<WechatMiniprogram.RequestSuccessCallbackResult & WechatMiniprogram.Err & AliErr & {
  headers: IAnyObject
}>

interface PageInfo {
  index: number,
  route: string
}

interface ContextInfo {
  is?: string
  pageInfo?: PageInfo
}

interface RecordData {
  type: string
  startTime: number
  endTime?: number
  duration?: number
  contextInfo?: ContextInfo
  size?: number
  resultSize?: number
  errno?: number
  errMsg?: string

  [key: string]: any
}

interface GroupData {
  count: number
  duration: number
  size: number
  resultSize: number
}

interface RecordDataQueue extends Array<RecordData> {
  meta: RecordMeta
}

interface RecordMeta {
  parallelism: number
}

type Stage = 'pre' | 'post'

interface DataGen {
  (args: any[]): IAnyObject | void
}

interface Filter {
  (item: RecordData): boolean
}

interface GroupBy {
  (item: RecordData): string
}

interface SortBy {
  (item: GroupData): number
}

interface StatisticConfig {
  filter?: Filter
  groupBy?: GroupBy
  sortBy?: SortBy
}

interface RecordAPIConfig {
  include?: string[],
  exclude?: string[],
  isAsync?: string[]
}
