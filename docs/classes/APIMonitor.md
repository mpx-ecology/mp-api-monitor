[@mpxjs/mp-api-monitor](../index.md) / APIMonitor

# Class: APIMonitor

APIMonitor类，支持创建多个monitor实例对API调用进行代理录制，每个实例拥有独立的录制配置和报警规则，但原始录制数据在多个monitor实例间共享。

**`Example`**

```ts
const monitor = new APIMonitor()
monitor.startRecord()
setTimeout(() => {
  console.log(monitor.getSummary())
}, 10000)
```

## Table of contents

### Constructors

- [constructor](APIMonitor.md#constructor)

### Methods

- [startRecord](APIMonitor.md#startrecord)
- [endRecord](APIMonitor.md#endrecord)
- [addWarningRule](APIMonitor.md#addwarningrule)
- [getAllRecordData](APIMonitor.md#getallrecorddata)
- [getAllRecordDataTypes](APIMonitor.md#getallrecorddatatypes)
- [getRecordData](APIMonitor.md#getrecorddata)
- [getStatistics](APIMonitor.md#getstatistics)
- [getSummary](APIMonitor.md#getsummary)
- [clearData](APIMonitor.md#cleardata)
- [destroy](APIMonitor.md#destroy)

## Constructors

### constructor

• **new APIMonitor**(`config?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config?` | [`InitialConfig`](../interfaces/InitialConfig.md) |

#### Defined in

[src/index.ts:69](https://github.com/mpx-ecology/mp-api-monitor/blob/master/src/index.ts#L69)

## Methods

### startRecord

▸ **startRecord**(`clear?`): `void`

开始录制，传递 {clear} 为true会先执行 [clearData](APIMonitor.md#cleardata)

#### Parameters

| Name | Type |
| :------ | :------ |
| `clear?` | `boolean` |

#### Returns

`void`

#### Defined in

[src/index.ts:87](https://github.com/mpx-ecology/mp-api-monitor/blob/master/src/index.ts#L87)

___

### endRecord

▸ **endRecord**(): `void`

结束录制

#### Returns

`void`

#### Defined in

[src/index.ts:95](https://github.com/mpx-ecology/mp-api-monitor/blob/master/src/index.ts#L95)

___

### addWarningRule

▸ **addWarningRule**(`types`, `rule`, `stage?`): `void`

添加报警规则，报警规则可以通过 [getCountRule](../index.md#getcountrule) 等帮助函数快速生成，也可以基于recordData完全自定义。

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `types` | `string` \| `string`[] | `undefined` |
| `rule` | [`WarningRule`](../interfaces/WarningRule.md) | `undefined` |
| `stage` | [`Stage`](../index.md#stage) | `'pre'` |

#### Returns

`void`

**`Example`**

```ts
// getLocation 和 getSystemInfoSync 100ms 内不应该调用超过2次
monitor.addWarningRule([
  'getLocation',
  'getSystemInfoSync'
], getCountRule({
  count: 2,
  duration: 100,
  onWarning(msg, recordData) {
    console.error(msg, recordData)
  }
}))
```

#### Defined in

[src/index.ts:127](https://github.com/mpx-ecology/mp-api-monitor/blob/master/src/index.ts#L127)

___

### getAllRecordData

▸ **getAllRecordData**(): `Map`<`string`, [`RecordDataQueue`](../interfaces/RecordDataQueue.md)\>

返回当前录制的全量recordData

#### Returns

`Map`<`string`, [`RecordDataQueue`](../interfaces/RecordDataQueue.md)\>

#### Defined in

[src/index.ts:191](https://github.com/mpx-ecology/mp-api-monitor/blob/master/src/index.ts#L191)

___

### getAllRecordDataTypes

▸ **getAllRecordDataTypes**(`exclude?`): `string`[]

返回当前录制的全量recordData的类型数组，可传入 {exclude} 过滤特定类型

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `exclude` | `string`[] | `[]` |

#### Returns

`string`[]

#### Defined in

[src/index.ts:198](https://github.com/mpx-ecology/mp-api-monitor/blob/master/src/index.ts#L198)

___

### getRecordData

▸ **getRecordData**(`type`): `undefined` \| [`RecordDataQueue`](../interfaces/RecordDataQueue.md)

返回类型为 {type} 的recordData

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

#### Returns

`undefined` \| [`RecordDataQueue`](../interfaces/RecordDataQueue.md)

#### Defined in

[src/index.ts:205](https://github.com/mpx-ecology/mp-api-monitor/blob/master/src/index.ts#L205)

___

### getStatistics

▸ **getStatistics**(`types?`, `«destructured»?`): [`GroupData`](../interfaces/GroupData.md)[]

根据传入的 {types} 数组对recordData进行分组统计，可以通过第二个参数自定义统计的过滤、分组和排序逻辑

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `types` | `string`[] | `[]` |
| `«destructured»` | [`StatisticConfig`](../interfaces/StatisticConfig.md) | `{}` |

#### Returns

[`GroupData`](../interfaces/GroupData.md)[]

**`Example`**

```ts
// 对setData进行分组统计，根据所属组件进行分组，根据发送数据大小进行排序
const info = monitor.getStatistics(['setData'], {
  groupBy: (data) => data.contextInfo?.is || 'unknown',
  sortBy: (data) => data.size
})
console.log(info)
```

#### Defined in

[src/index.ts:222](https://github.com/mpx-ecology/mp-api-monitor/blob/master/src/index.ts#L222)

___

### getSummary

▸ **getSummary**(): [`Summary`](../interfaces/Summary.md)

在内部调用 [getStatistics](APIMonitor.md#getstatistics) 分别对setData、request和其余API进行分组统计获取数据摘要

#### Returns

[`Summary`](../interfaces/Summary.md)

#### Defined in

[src/index.ts:257](https://github.com/mpx-ecology/mp-api-monitor/blob/master/src/index.ts#L257)

___

### clearData

▸ **clearData**(): `void`

清除全量recordData

#### Returns

`void`

#### Defined in

[src/index.ts:287](https://github.com/mpx-ecology/mp-api-monitor/blob/master/src/index.ts#L287)

___

### destroy

▸ **destroy**(): `void`

销毁monitor实例

#### Returns

`void`

#### Defined in

[src/index.ts:294](https://github.com/mpx-ecology/mp-api-monitor/blob/master/src/index.ts#L294)
