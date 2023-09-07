@mpxjs/mp-api-monitor

# @mpxjs/mp-api-monitor

## Table of contents

### Classes

- [APIMonitor](classes/APIMonitor.md)

### Functions

- [setDataGenerator](index.md#setdatagenerator)
- [setStackConfig](index.md#setstackconfig)
- [setCustomSyncList](index.md#setcustomsynclist)
- [byteLength](index.md#bytelength)
- [getCountRule](index.md#getcountrule)
- [getParallelismRule](index.md#getparallelismrule)
- [getRouteParallelismRule](index.md#getrouteparallelismrule)
- [getErrorRule](index.md#geterrorrule)
- [getSizeRule](index.md#getsizerule)
- [getResultSizeRule](index.md#getresultsizerule)

### Interfaces

- [PageInfo](interfaces/PageInfo.md)
- [ContextInfo](interfaces/ContextInfo.md)
- [InitialConfig](interfaces/InitialConfig.md)
- [Summary](interfaces/Summary.md)
- [WarningRule](interfaces/WarningRule.md)
- [RecordData](interfaces/RecordData.md)
- [RecordDataQueue](interfaces/RecordDataQueue.md)
- [RecordMeta](interfaces/RecordMeta.md)
- [GroupData](interfaces/GroupData.md)
- [DataGen](interfaces/DataGen.md)
- [Filter](interfaces/Filter.md)
- [GroupBy](interfaces/GroupBy.md)
- [SortBy](interfaces/SortBy.md)
- [StatisticConfig](interfaces/StatisticConfig.md)
- [RecordAPIConfig](interfaces/RecordAPIConfig.md)
- [StackConfig](interfaces/StackConfig.md)
- [WarningCfg](interfaces/WarningCfg.md)
- [CountCfg](interfaces/CountCfg.md)
- [ParallelismCfg](interfaces/ParallelismCfg.md)
- [ErrorCfg](interfaces/ErrorCfg.md)
- [SizeCfg](interfaces/SizeCfg.md)

### Type Aliases

- [IAnyObject](index.md#ianyobject)
- [Stage](index.md#stage)

## Functions

### setDataGenerator

▸ **setDataGenerator**(`type`, `dataGen`, `stage?`): `void`

自定义recordData生成逻辑，可以为一个type设置多个dataGen，返回的数据会合并到recordData中

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `type` | `string` | `undefined` |
| `dataGen` | [`DataGen`](interfaces/DataGen.md) | `undefined` |
| `stage` | [`Stage`](index.md#stage) | `'pre'` |

#### Returns

`void`

**`Example`**

```ts
setDataGenerator('setData', (args, recordData) => {
  // args为原始入参数组，对于setData来说args[0]为发送的数据，args[1]为setData回调
  const data = args[0]
  // recordData为当前recordData
  if (recordData.size && recordData.size > 10000) {
    // 返回的数据会合并到recordData当中，当发送数据size大于10K时，在recordData中存储原始数据便于排查
    return {
      data
    }
  }
})
```

#### Defined in

[src/monitor.ts:60](https://github.com/mpx-ecology/mp-api-monitor/blob/master/src/monitor.ts#L60)

___

### setStackConfig

▸ **setStackConfig**(`config`): `void`

设置是否在API recordData中生成stack信息，开启时会有一定额外开销，建议配合include/exclude局部开启，传递false则关闭。

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `boolean` \| [`StackConfig`](interfaces/StackConfig.md) |

#### Returns

`void`

#### Defined in

[src/proxyAPI.ts:80](https://github.com/mpx-ecology/mp-api-monitor/blob/master/src/proxyAPI.ts#L80)

___

### setCustomSyncList

▸ **setCustomSyncList**(`list`): `void`

自定义设置同步API list，list中的API将被作为同步方法进行录代理录制，一般情况下不用设置。

#### Parameters

| Name | Type |
| :------ | :------ |
| `list` | `string`[] |

#### Returns

`void`

#### Defined in

[src/proxyAPI.ts:93](https://github.com/mpx-ecology/mp-api-monitor/blob/master/src/proxyAPI.ts#L93)

___

### byteLength

▸ **byteLength**(`str`): `number`

传入字符串获取字节长度

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`number`

#### Defined in

[src/utils/index.ts:6](https://github.com/mpx-ecology/mp-api-monitor/blob/master/src/utils/index.ts#L6)

___

### getCountRule

▸ **getCountRule**(`countCfg`): [`WarningRule`](interfaces/WarningRule.md)

获取API调用次数报警规则

#### Parameters

| Name | Type |
| :------ | :------ |
| `countCfg` | [`CountCfg`](interfaces/CountCfg.md) |

#### Returns

[`WarningRule`](interfaces/WarningRule.md)

**`Example`**

```ts
// 获取报警规则，API在100ms内不应该调用超过2次
const countRule = getCountRule({
  count: 2,
  duration: 100,
  onWarning(msg, recordDataQueue) {
    console.error(msg, recordDataQueue)
  }
})
// 对 getLocation 和 getSystemInfoSync 应用该报警规则
monitor.addWarningRule([
  'getLocation',
  'getSystemInfoSync'
], countRule)
```

#### Defined in

[src/warningRules.ts:45](https://github.com/mpx-ecology/mp-api-monitor/blob/master/src/warningRules.ts#L45)

___

### getParallelismRule

▸ **getParallelismRule**(`parallelismCfg`): [`WarningRule`](interfaces/WarningRule.md)

获取异步API调用并发数报警规则

#### Parameters

| Name | Type |
| :------ | :------ |
| `parallelismCfg` | [`ParallelismCfg`](interfaces/ParallelismCfg.md) |

#### Returns

[`WarningRule`](interfaces/WarningRule.md)

**`Example`**

```ts
// 调用并发数不应该超过10
const parallelismRule = getParallelismRule({
  parallelism: 10,
  onWarning(msg, recordData) {
    console.error(msg, recordData)
  }
})
// 对 request 应用该规则
monitor.addWarningRule('request', parallelismRule)
```

#### Defined in

[src/warningRules.ts:74](https://github.com/mpx-ecology/mp-api-monitor/blob/master/src/warningRules.ts#L74)

___

### getRouteParallelismRule

▸ **getRouteParallelismRule**(`parallelismCfg`): [`WarningRule`](interfaces/WarningRule.md)

获取路由API调用并发数报警规则

#### Parameters

| Name | Type |
| :------ | :------ |
| `parallelismCfg` | [`ParallelismCfg`](interfaces/ParallelismCfg.md) |

#### Returns

[`WarningRule`](interfaces/WarningRule.md)

**`Example`**

```ts
// 路由API调用并发数不应该超过1，对所有路由API共同生效
monitor.addWarningRule([
  'switchTab',
  'reLaunch',
  'redirectTo',
  'navigateTo',
  'navigateBack'
], getRouteParallelismRule({
  parallelism: 1,
  onWarning(msg, recordData) {
    console.error(msg, recordData)
  }
}))
```

#### Defined in

[src/warningRules.ts:110](https://github.com/mpx-ecology/mp-api-monitor/blob/master/src/warningRules.ts#L110)

___

### getErrorRule

▸ **getErrorRule**(`errorCfg`): [`WarningRule`](interfaces/WarningRule.md)

获取API调用报错报警规则，不传递errno则对于所有错误都报警

#### Parameters

| Name | Type |
| :------ | :------ |
| `errorCfg` | [`ErrorCfg`](interfaces/ErrorCfg.md) |

#### Returns

[`WarningRule`](interfaces/WarningRule.md)

**`Example`**

```ts
// request返回错误码600000时报警
monitor.addWarningRule('request', getErrorRule({
  errno: 600000,
  onWarning(msg, recordData) {
    console.error(msg, recordData)
  }
}))
```

#### Defined in

[src/warningRules.ts:138](https://github.com/mpx-ecology/mp-api-monitor/blob/master/src/warningRules.ts#L138)

___

### getSizeRule

▸ **getSizeRule**(`sizeCfg`): [`WarningRule`](interfaces/WarningRule.md)

获取API发送数据size报警规则，可以通过count限定一定次数内累积size不超过阈值，也可以通过duration限定一定时间内累积size不超过阈值

#### Parameters

| Name | Type |
| :------ | :------ |
| `sizeCfg` | [`SizeCfg`](interfaces/SizeCfg.md) |

#### Returns

[`WarningRule`](interfaces/WarningRule.md)

**`Example`**

```ts
// setData单次发送数据大小不应该超过10K
monitor.addWarningRule('setData', getSizeRule({
  size: 10000,
  count: 1,
  onWarning(msg, recordData) {
    console.error(msg, recordData)
  }
}))
```

#### Defined in

[src/warningRules.ts:163](https://github.com/mpx-ecology/mp-api-monitor/blob/master/src/warningRules.ts#L163)

___

### getResultSizeRule

▸ **getResultSizeRule**(`sizeCfg`): [`WarningRule`](interfaces/WarningRule.md)

获取API接收数据size报警规则，可以通过count限定一定次数内累积size不超过阈值，也可以通过duration限定一定时间内累积size不超过阈值

#### Parameters

| Name | Type |
| :------ | :------ |
| `sizeCfg` | [`SizeCfg`](interfaces/SizeCfg.md) |

#### Returns

[`WarningRule`](interfaces/WarningRule.md)

**`Example`**

```ts
// request在1s内累积接收数据大小不应该超过100K
monitor.addWarningRule('request', getResultSizeRule({
  size: 100000,
  duration: 1000,
  onWarning(msg, recordData) {
    console.error(msg, recordData)
  }
}))
```

#### Defined in

[src/warningRules.ts:194](https://github.com/mpx-ecology/mp-api-monitor/blob/master/src/warningRules.ts#L194)

## Type Aliases

### IAnyObject

Ƭ **IAnyObject**: `Record`<`string`, `any`\>

#### Defined in

[src/types.ts:3](https://github.com/mpx-ecology/mp-api-monitor/blob/master/src/types.ts#L3)

___

### Stage

Ƭ **Stage**: ``"pre"`` \| ``"post"``

#### Defined in

[src/types.ts:44](https://github.com/mpx-ecology/mp-api-monitor/blob/master/src/types.ts#L44)
