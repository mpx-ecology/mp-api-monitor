[@mpxjs/mp-api-monitor](../index.md) / ParallelismCfg

# Interface: ParallelismCfg

## Hierarchy

- [`WarningCfg`](WarningCfg.md)

  ↳ **`ParallelismCfg`**

## Table of contents

### Properties

- [onWarning](ParallelismCfg.md#onwarning)
- [parallelism](ParallelismCfg.md#parallelism)

## Properties

### onWarning

• **onWarning**: (`msg`: `string`, `recordData`: [`RecordDataQueue`](RecordDataQueue.md)) => `void`

#### Type declaration

▸ (`msg`, `recordData`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `string` |
| `recordData` | [`RecordDataQueue`](RecordDataQueue.md) |

##### Returns

`void`

#### Inherited from

[WarningCfg](WarningCfg.md).[onWarning](WarningCfg.md#onwarning)

#### Defined in

[src/warningRules.ts:5](https://github.com/mpx-ecology/mp-api-monitor/blob/008278c/src/warningRules.ts#L5)

___

### parallelism

• **parallelism**: `number`

#### Defined in

[src/warningRules.ts:14](https://github.com/mpx-ecology/mp-api-monitor/blob/008278c/src/warningRules.ts#L14)
