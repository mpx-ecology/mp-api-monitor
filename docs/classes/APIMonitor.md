[@mpxjs/mp-api-monitor](../README.md) / APIMonitor

# Class: APIMonitor

## Table of contents

### Constructors

- [constructor](APIMonitor.md#constructor)

### Properties

- [config](APIMonitor.md#config)
- [dataCount](APIMonitor.md#datacount)
- [isActive](APIMonitor.md#isactive)
- [postWarningRules](APIMonitor.md#postwarningrules)
- [preWarningRules](APIMonitor.md#prewarningrules)
- [recordData](APIMonitor.md#recorddata)

### Methods

- [addRecordData](APIMonitor.md#addrecorddata)
- [addWarningRule](APIMonitor.md#addwarningrule)
- [checkWarningRules](APIMonitor.md#checkwarningrules)
- [clearData](APIMonitor.md#cleardata)
- [destroy](APIMonitor.md#destroy)
- [endRecord](APIMonitor.md#endrecord)
- [getAllRecordData](APIMonitor.md#getallrecorddata)
- [getAllRecordDataTypes](APIMonitor.md#getallrecorddatatypes)
- [getRecordData](APIMonitor.md#getrecorddata)
- [getStatistics](APIMonitor.md#getstatistics)
- [getSummary](APIMonitor.md#getsummary)
- [getWarningRules](APIMonitor.md#getwarningrules)
- [startRecord](APIMonitor.md#startrecord)
- [updateMeta](APIMonitor.md#updatemeta)

## Constructors

### constructor

• **new APIMonitor**(`config?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config?` | [`InitialConfig`](../interfaces/InitialConfig.md) |

#### Defined in

[src/index.ts:41](https://github.com/mpx-ecology/mp-api-monitor/blob/cec6529/src/index.ts#L41)

## Properties

### config

• **config**: [`InitialConfig`](../interfaces/InitialConfig.md)

#### Defined in

[src/index.ts:38](https://github.com/mpx-ecology/mp-api-monitor/blob/cec6529/src/index.ts#L38)

___

### dataCount

• **dataCount**: `number` = `0`

#### Defined in

[src/index.ts:39](https://github.com/mpx-ecology/mp-api-monitor/blob/cec6529/src/index.ts#L39)

___

### isActive

• **isActive**: `boolean` = `false`

#### Defined in

[src/index.ts:35](https://github.com/mpx-ecology/mp-api-monitor/blob/cec6529/src/index.ts#L35)

___

### postWarningRules

• **postWarningRules**: `Map`<`string`, [`WarningRule`](../interfaces/WarningRule.md)[]\>

#### Defined in

[src/index.ts:37](https://github.com/mpx-ecology/mp-api-monitor/blob/cec6529/src/index.ts#L37)

___

### preWarningRules

• **preWarningRules**: `Map`<`string`, [`WarningRule`](../interfaces/WarningRule.md)[]\>

#### Defined in

[src/index.ts:36](https://github.com/mpx-ecology/mp-api-monitor/blob/cec6529/src/index.ts#L36)

___

### recordData

• **recordData**: `Map`<`string`, [`RecordDataQueue`](../interfaces/RecordDataQueue.md)\>

#### Defined in

[src/index.ts:34](https://github.com/mpx-ecology/mp-api-monitor/blob/cec6529/src/index.ts#L34)

## Methods

### addRecordData

▸ **addRecordData**(`data`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`RecordData`](../interfaces/RecordData.md) |

#### Returns

`void`

#### Defined in

[src/index.ts:95](https://github.com/mpx-ecology/mp-api-monitor/blob/cec6529/src/index.ts#L95)

___

### addWarningRule

▸ **addWarningRule**(`types`, `rule`, `stage?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `types` | `string` \| `string`[] | `undefined` |
| `rule` | [`WarningRule`](../interfaces/WarningRule.md) | `undefined` |
| `stage` | [`Stage`](../README.md#stage) | `'pre'` |

#### Returns

`void`

#### Defined in

[src/index.ts:80](https://github.com/mpx-ecology/mp-api-monitor/blob/cec6529/src/index.ts#L80)

___

### checkWarningRules

▸ **checkWarningRules**(`type`, `stage?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `type` | `string` | `undefined` |
| `stage` | [`Stage`](../README.md#stage) | `'pre'` |

#### Returns

`void`

#### Defined in

[src/index.ts:70](https://github.com/mpx-ecology/mp-api-monitor/blob/cec6529/src/index.ts#L70)

___

### clearData

▸ **clearData**(): `void`

#### Returns

`void`

#### Defined in

[src/index.ts:57](https://github.com/mpx-ecology/mp-api-monitor/blob/cec6529/src/index.ts#L57)

___

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

#### Defined in

[src/index.ts:184](https://github.com/mpx-ecology/mp-api-monitor/blob/cec6529/src/index.ts#L184)

___

### endRecord

▸ **endRecord**(): `void`

#### Returns

`void`

#### Defined in

[src/index.ts:66](https://github.com/mpx-ecology/mp-api-monitor/blob/cec6529/src/index.ts#L66)

___

### getAllRecordData

▸ **getAllRecordData**(): `Map`<`string`, [`RecordDataQueue`](../interfaces/RecordDataQueue.md)\>

#### Returns

`Map`<`string`, [`RecordDataQueue`](../interfaces/RecordDataQueue.md)\>

#### Defined in

[src/index.ts:116](https://github.com/mpx-ecology/mp-api-monitor/blob/cec6529/src/index.ts#L116)

___

### getAllRecordDataTypes

▸ **getAllRecordDataTypes**(`exclude?`): `string`[]

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `exclude` | `string`[] | `[]` |

#### Returns

`string`[]

#### Defined in

[src/index.ts:120](https://github.com/mpx-ecology/mp-api-monitor/blob/cec6529/src/index.ts#L120)

___

### getRecordData

▸ **getRecordData**(`type`): `undefined` \| [`RecordDataQueue`](../interfaces/RecordDataQueue.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

#### Returns

`undefined` \| [`RecordDataQueue`](../interfaces/RecordDataQueue.md)

#### Defined in

[src/index.ts:124](https://github.com/mpx-ecology/mp-api-monitor/blob/cec6529/src/index.ts#L124)

___

### getStatistics

▸ **getStatistics**(`types?`, `«destructured»?`): [`GroupData`](../interfaces/GroupData.md)[]

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `types` | `string`[] | `[]` |
| `«destructured»` | [`StatisticConfig`](../interfaces/StatisticConfig.md) | `{}` |

#### Returns

[`GroupData`](../interfaces/GroupData.md)[]

#### Defined in

[src/index.ts:129](https://github.com/mpx-ecology/mp-api-monitor/blob/cec6529/src/index.ts#L129)

___

### getSummary

▸ **getSummary**(): [`Summary`](../interfaces/Summary.md)

#### Returns

[`Summary`](../interfaces/Summary.md)

#### Defined in

[src/index.ts:157](https://github.com/mpx-ecology/mp-api-monitor/blob/cec6529/src/index.ts#L157)

___

### getWarningRules

▸ **getWarningRules**(`type`, `stage?`): `undefined` \| [`WarningRule`](../interfaces/WarningRule.md)[]

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `type` | `string` | `undefined` |
| `stage` | [`Stage`](../README.md#stage) | `'pre'` |

#### Returns

`undefined` \| [`WarningRule`](../interfaces/WarningRule.md)[]

#### Defined in

[src/index.ts:90](https://github.com/mpx-ecology/mp-api-monitor/blob/cec6529/src/index.ts#L90)

___

### startRecord

▸ **startRecord**(`clear?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `clear?` | `boolean` |

#### Returns

`void`

#### Defined in

[src/index.ts:61](https://github.com/mpx-ecology/mp-api-monitor/blob/cec6529/src/index.ts#L61)

___

### updateMeta

▸ **updateMeta**(`type`, `updater`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `updater` | (`meta`: [`RecordMeta`](../interfaces/RecordMeta.md)) => `void` |

#### Returns

`void`

#### Defined in

[src/index.ts:111](https://github.com/mpx-ecology/mp-api-monitor/blob/cec6529/src/index.ts#L111)
