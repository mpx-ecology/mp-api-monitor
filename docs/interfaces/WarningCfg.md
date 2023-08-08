[@mpxjs/mp-api-monitor](../README.md) / WarningCfg

# Interface: WarningCfg

## Hierarchy

- **`WarningCfg`**

  ↳ [`CountCfg`](CountCfg.md)

  ↳ [`ParallelismCfg`](ParallelismCfg.md)

  ↳ [`ErrorCfg`](ErrorCfg.md)

  ↳ [`SizeCfg`](SizeCfg.md)

## Table of contents

### Properties

- [onWarning](WarningCfg.md#onwarning)

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

#### Defined in

[src/warningRules.ts:5](https://github.com/mpx-ecology/mp-api-monitor/blob/cec6529/src/warningRules.ts#L5)
