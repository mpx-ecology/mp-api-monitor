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
    setData?: IAnyObject;
    request?: IAnyObject;
    api?: IAnyObject;
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
    (args: any[]): IAnyObject | void;
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
    isAsync?: string[];
    needStack?: StackConfig | boolean;
}
interface StackConfig {
    include?: string[];
    exclude?: string[];
    depth?: number;
}

declare function setDataGenerator(type: string, dataGen: DataGen, stage?: Stage): void;
declare function getDataGenerator(type: string, stage?: Stage): DataGen | undefined;

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
declare function getCountRule(countCfg: CountCfg): WarningRule;
declare function getParallelismRule(parallelismCfg: ParallelismCfg): WarningRule;
declare function getRouteParallelismRule(parallelismCfg: ParallelismCfg): WarningRule;
declare function getErrorRule(errorCfg: ErrorCfg): WarningRule;
declare function getSizeRule(sizeCfg: SizeCfg): WarningRule;
declare function getResultSizeRule(sizeCfg: SizeCfg): WarningRule;

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

export { APIMonitor, ContextInfo, CountCfg, DataGen, ErrorCfg, Filter, GroupBy, GroupData, IAnyObject, InitialConfig, PageInfo, ParallelismCfg, RecordAPIConfig, RecordData, RecordDataQueue, RecordMeta, SizeCfg, SortBy, StackConfig, Stage, StatisticConfig, Summary, WarningCfg, WarningRule, byteLength, getCountRule, getDataGenerator, getErrorRule, getParallelismRule, getResultSizeRule, getRouteParallelismRule, getSizeRule, setDataGenerator };
