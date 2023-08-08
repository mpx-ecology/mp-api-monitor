@mpxjs/mp-api-monitor

# @mpxjs/mp-api-monitor

## Table of contents

### Classes

- [APIMonitor](classes/APIMonitor.md)

### Interfaces

- [ContextInfo](interfaces/ContextInfo.md)
- [CountCfg](interfaces/CountCfg.md)
- [DataGen](interfaces/DataGen.md)
- [ErrorCfg](interfaces/ErrorCfg.md)
- [Filter](interfaces/Filter.md)
- [GroupBy](interfaces/GroupBy.md)
- [GroupData](interfaces/GroupData.md)
- [InitialConfig](interfaces/InitialConfig.md)
- [PageInfo](interfaces/PageInfo.md)
- [ParallelismCfg](interfaces/ParallelismCfg.md)
- [RecordAPIConfig](interfaces/RecordAPIConfig.md)
- [RecordData](interfaces/RecordData.md)
- [RecordDataQueue](interfaces/RecordDataQueue.md)
- [RecordMeta](interfaces/RecordMeta.md)
- [SizeCfg](interfaces/SizeCfg.md)
- [SortBy](interfaces/SortBy.md)
- [StackConfig](interfaces/StackConfig.md)
- [StatisticConfig](interfaces/StatisticConfig.md)
- [Summary](interfaces/Summary.md)
- [WarningCfg](interfaces/WarningCfg.md)
- [WarningRule](interfaces/WarningRule.md)

### Type Aliases

- [IAnyObject](index.md#ianyobject)
- [Stage](index.md#stage)

### Functions

- [byteLength](index.md#bytelength)
- [getCountRule](index.md#getcountrule)
- [getDataGenerator](index.md#getdatagenerator)
- [getErrorRule](index.md#geterrorrule)
- [getParallelismRule](index.md#getparallelismrule)
- [getResultSizeRule](index.md#getresultsizerule)
- [getRouteParallelismRule](index.md#getrouteparallelismrule)
- [getSizeRule](index.md#getsizerule)
- [setDataGenerator](index.md#setdatagenerator)

## Type Aliases

### IAnyObject

Ƭ **IAnyObject**: `Record`<`string`, `any`\>

#### Defined in

[src/types.ts:3](https://github.com/mpx-ecology/mp-api-monitor/blob/95e0f31/src/types.ts#L3)

___

### Stage

Ƭ **Stage**: ``"pre"`` \| ``"post"``

#### Defined in

[src/types.ts:44](https://github.com/mpx-ecology/mp-api-monitor/blob/95e0f31/src/types.ts#L44)

## Functions

### byteLength

▸ **byteLength**(`str`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`number`

#### Defined in

[src/utils/index.ts:3](https://github.com/mpx-ecology/mp-api-monitor/blob/95e0f31/src/utils/index.ts#L3)

___

### getCountRule

▸ **getCountRule**(`countCfg`): [`WarningRule`](interfaces/WarningRule.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `countCfg` | [`CountCfg`](interfaces/CountCfg.md) |

#### Returns

[`WarningRule`](interfaces/WarningRule.md)

#### Defined in

[src/warningRules.ts:27](https://github.com/mpx-ecology/mp-api-monitor/blob/95e0f31/src/warningRules.ts#L27)

___

### getDataGenerator

▸ **getDataGenerator**(`type`, `stage?`): `undefined` \| [`DataGen`](interfaces/DataGen.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `type` | `string` | `undefined` |
| `stage` | [`Stage`](index.md#stage) | `'pre'` |

#### Returns

`undefined` \| [`DataGen`](interfaces/DataGen.md)

#### Defined in

[src/monitor.ts:49](https://github.com/mpx-ecology/mp-api-monitor/blob/95e0f31/src/monitor.ts#L49)

___

### getErrorRule

▸ **getErrorRule**(`errorCfg`): [`WarningRule`](interfaces/WarningRule.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `errorCfg` | [`ErrorCfg`](interfaces/ErrorCfg.md) |

#### Returns

[`WarningRule`](interfaces/WarningRule.md)

#### Defined in

[src/warningRules.ts:76](https://github.com/mpx-ecology/mp-api-monitor/blob/95e0f31/src/warningRules.ts#L76)

___

### getParallelismRule

▸ **getParallelismRule**(`parallelismCfg`): [`WarningRule`](interfaces/WarningRule.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `parallelismCfg` | [`ParallelismCfg`](interfaces/ParallelismCfg.md) |

#### Returns

[`WarningRule`](interfaces/WarningRule.md)

#### Defined in

[src/warningRules.ts:42](https://github.com/mpx-ecology/mp-api-monitor/blob/95e0f31/src/warningRules.ts#L42)

___

### getResultSizeRule

▸ **getResultSizeRule**(`sizeCfg`): [`WarningRule`](interfaces/WarningRule.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `sizeCfg` | [`SizeCfg`](interfaces/SizeCfg.md) |

#### Returns

[`WarningRule`](interfaces/WarningRule.md)

#### Defined in

[src/warningRules.ts:106](https://github.com/mpx-ecology/mp-api-monitor/blob/95e0f31/src/warningRules.ts#L106)

___

### getRouteParallelismRule

▸ **getRouteParallelismRule**(`parallelismCfg`): [`WarningRule`](interfaces/WarningRule.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `parallelismCfg` | [`ParallelismCfg`](interfaces/ParallelismCfg.md) |

#### Returns

[`WarningRule`](interfaces/WarningRule.md)

#### Defined in

[src/warningRules.ts:60](https://github.com/mpx-ecology/mp-api-monitor/blob/95e0f31/src/warningRules.ts#L60)

___

### getSizeRule

▸ **getSizeRule**(`sizeCfg`): [`WarningRule`](interfaces/WarningRule.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `sizeCfg` | [`SizeCfg`](interfaces/SizeCfg.md) |

#### Returns

[`WarningRule`](interfaces/WarningRule.md)

#### Defined in

[src/warningRules.ts:88](https://github.com/mpx-ecology/mp-api-monitor/blob/95e0f31/src/warningRules.ts#L88)

___

### setDataGenerator

▸ **setDataGenerator**(`type`, `dataGen`, `stage?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `type` | `string` | `undefined` |
| `dataGen` | [`DataGen`](interfaces/DataGen.md) | `undefined` |
| `stage` | [`Stage`](index.md#stage) | `'pre'` |

#### Returns

`void`

#### Defined in

[src/monitor.ts:44](https://github.com/mpx-ecology/mp-api-monitor/blob/95e0f31/src/monitor.ts#L44)
