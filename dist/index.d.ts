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

declare function setDataGenerator(type: string, dataGen: DataGen, stage?: Stage): void;

declare function setCurrentContext(context: ComponentIns): void;
declare function unsetCurrentContext(): void;
declare function getCurrentContext(): ComponentIns | undefined;

interface WarningCfg {
    onWarning: (msg: string, recordData: RecordDataQueue) => void;
}
interface CountCfg extends WarningCfg {
    count: number;
    duration?: number;
}
interface ParallelismCfg extends WarningCfg {
    parallelism: number;
}
interface ErrorCfg extends WarningCfg {
    errno?: number;
}
interface SizeCfg extends WarningCfg {
    size: number;
    count?: number;
    duration?: number;
}
declare function getCountRule(countCfg: CountCfg): WarningRule;
declare function getParallelismRule(parallelismCfg: ParallelismCfg): WarningRule;
declare function getRouteParallelismRule(parallelismCfg: ParallelismCfg): WarningRule;
declare function getErrorRule(errorCfg: ErrorCfg): WarningRule;
declare function getSizeRule(sizeCfg: SizeCfg): WarningRule;
declare function getResultSizeRule(sizeCfg: SizeCfg): WarningRule;

interface InitialConfig {
    recordSetData?: boolean;
    recordAPI?: boolean | RecordAPIConfig;
    dataLimit?: number;
    getCurrentContext?: () => ComponentIns | undefined;
}
interface Summary {
    setData?: IAnyObject;
    request?: IAnyObject;
    api?: IAnyObject;
}
interface WarningRule {
    (recordData: RecordDataQueue, monitor: APIMonitor): void;
    stage?: Stage;
}
declare class APIMonitor {
    recordData: Map<string, RecordDataQueue>;
    isActive: boolean;
    preWarningRules: Map<string, WarningRule[]>;
    postWarningRules: Map<string, WarningRule[]>;
    config: InitialConfig;
    dataCount: number;
    constructor(config?: InitialConfig);
    clearData(): void;
    startRecord(clear?: boolean): void;
    endRecord(): void;
    checkWarningRules(type: string, stage?: Stage): void;
    addWarningRule(types: string | string[], rule: WarningRule, stage?: Stage): void;
    getWarningRules(type: string, stage?: Stage): WarningRule[] | undefined;
    addRecordData(data: RecordData): void;
    updateMeta(type: string, updater: (meta: RecordMeta) => void): void;
    getAllRecordData(): Map<string, RecordDataQueue>;
    getAllRecordDataTypes(exclude?: Array<string>): string[];
    getRecordData(type: string): RecordDataQueue | undefined;
    getStatistics(types?: string[], { filter, groupBy, sortBy }?: StatisticConfig): GroupData[];
    getSummary(): Summary;
    destroy(): void;
}

export { WarningRule, APIMonitor as default, getCountRule, getCurrentContext, getErrorRule, getParallelismRule, getResultSizeRule, getRouteParallelismRule, getSizeRule, setCurrentContext, setDataGenerator, unsetCurrentContext };
