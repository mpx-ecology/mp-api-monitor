/// <reference types="miniprogram-api-typings" />
type IAnyObject = Record<string, any>;
interface PageInfo {
    index: number;
    route: string;
}
interface ContextInfo {
    is?: string;
    pageInfo?: PageInfo;
}
interface InitialConfig {
    recordSetData?: boolean;
    recordAPI?: boolean | RecordAPIConfig;
    dataLimit?: number;
}
interface Summary {
    setData?: GroupData[];
    request?: GroupData[];
    api?: GroupData[];
}
type Stage = 'pre' | 'post';
interface WarningRule {
    (recordData: RecordDataQueue, monitor: APIMonitor): void;
    stage?: Stage;
}
interface RecordData {
    type: string;
    startTime: number;
    endTime?: number;
    duration?: number;
    contextInfo?: ContextInfo;
    stack?: string[];
    size?: number;
    resultSize?: number;
    errno?: number;
    errMsg?: string;
    [key: string]: any;
}
interface RecordDataQueue extends Array<RecordData> {
    meta: RecordMeta;
}
interface RecordMeta {
    parallelism: number;
}
interface GroupData {
    count: number;
    duration: number;
    size: number;
    resultSize: number;
}
interface DataGen {
    (args: any[], recordData: RecordData): IAnyObject | void;
}
interface Filter {
    (item: RecordData): boolean;
}
interface GroupBy {
    (item: RecordData): string;
}
interface SortBy {
    (item: GroupData): number;
}
interface StatisticConfig {
    filter?: Filter;
    groupBy?: GroupBy;
    sortBy?: SortBy;
}
interface RecordAPIConfig {
    include?: string[];
    exclude?: string[];
}
interface StackConfig {
    include?: string[];
    exclude?: string[];
    depth?: number;
}

/**
 * 自定义recordData生成逻辑，可以为一个type设置多个dataGen，返回的数据会合并到recordData中
 * @example
 * ```ts
 * setDataGenerator('setData', (args, recordData) => {
 *   // args为原始入参数组，对于setData来说args[0]为发送的数据，args[1]为setData回调
 *   const data = args[0]
 *   // recordData为当前recordData
 *   if (recordData.size && recordData.size > 10000) {
 *     // 返回的数据会合并到recordData当中，当发送数据size大于10K时，在recordData中存储原始数据便于排查
 *     return {
 *       data
 *     }
 *   }
 * })
 * ```
 */
declare function setDataGenerator(type: string, dataGen: DataGen, stage?: Stage): void;

/**
 * 设置是否在API recordData中生成stack信息，开启时会有一定额外开销，建议配合include/exclude局部开启，传递false则关闭。
 */
declare function setStackConfig(config: StackConfig | boolean): void;
/**
 * 自定义设置同步API list，list中的API将被作为同步方法进行录代理录制，一般情况下不用设置。
 */
declare function setCustomSyncList(list: string[]): void;

/**
 * 传入字符串获取字节长度
 */
declare function byteLength(str: string): number;

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
declare function getCountRule(countCfg: CountCfg): WarningRule;
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
declare function getParallelismRule(parallelismCfg: ParallelismCfg): WarningRule;
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
declare function getRouteParallelismRule(parallelismCfg: ParallelismCfg): WarningRule;
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
declare function getErrorRule(errorCfg: ErrorCfg): WarningRule;
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
declare function getSizeRule(sizeCfg: SizeCfg): WarningRule;
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
declare function getResultSizeRule(sizeCfg: SizeCfg): WarningRule;

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
declare class APIMonitor {
    /** @internal */
    private recordData;
    /** @internal */
    private preWarningRules;
    /** @internal */
    private postWarningRules;
    /** @internal */
    private config;
    /** @internal */
    private dataCount;
    /** @internal */
    isActive: boolean;
    constructor(config?: InitialConfig);
    /**
     * 开始录制，传递 {clear} 为true会先执行 {@link clearData}
     */
    startRecord(clear?: boolean): void;
    /**
     * 结束录制
     */
    endRecord(): void;
    /** @internal */
    checkWarningRules(type: string, stage?: Stage): void;
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
    addWarningRule(types: string | string[], rule: WarningRule, stage?: Stage): void;
    /** @internal */
    getWarningRules(type: string, stage?: Stage): WarningRule[] | undefined;
    /** @internal */
    filterRecordData(data: RecordData): boolean;
    /** @internal */
    addRecordData(data: RecordData): void;
    /** @internal */
    updateMeta(type: string, updater: (meta: RecordMeta) => void): void;
    /**
     * 返回当前录制的全量recordData
     */
    getAllRecordData(): Map<string, RecordDataQueue>;
    /**
     * 返回当前录制的全量recordData的类型数组，可传入 {exclude} 过滤特定类型
     */
    getAllRecordDataTypes(exclude?: Array<string>): string[];
    /**
     * 返回类型为 {type} 的recordData
     */
    getRecordData(type: string): RecordDataQueue | undefined;
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
    getStatistics(types?: string[], { filter, groupBy, sortBy }?: StatisticConfig): GroupData[];
    /**
     * 在内部调用 {@link getStatistics} 分别对setData、request和其余API进行分组统计获取数据摘要
     */
    getSummary(): Summary;
    /**
     * 清除全量recordData
     */
    clearData(): void;
    /**
     * 销毁monitor实例
     */
    destroy(): void;
}

export { APIMonitor, ContextInfo, CountCfg, DataGen, ErrorCfg, Filter, GroupBy, GroupData, IAnyObject, InitialConfig, PageInfo, ParallelismCfg, RecordAPIConfig, RecordData, RecordDataQueue, RecordMeta, SizeCfg, SortBy, StackConfig, Stage, StatisticConfig, Summary, WarningCfg, WarningRule, byteLength, getCountRule, getErrorRule, getParallelismRule, getResultSizeRule, getRouteParallelismRule, getSizeRule, setCustomSyncList, setDataGenerator, setStackConfig };
