[@mpxjs/mp-api-monitor](../README.md) / CountCfg

# Interface: CountCfg

## Hierarchy

- [`WarningCfg`](WarningCfg.md)

  ↳ **`CountCfg`**

## Table of contents

### Properties

- [count](CountCfg.md#count)
- [duration](CountCfg.md#duration)
- [onWarning](CountCfg.md#onwarning)

## Properties

### count

• **count**: `number`

#### Defined in

[src/warningRules.ts:9](https://github.com/mpx-ecology/mp-api-monitor/blob/cec6529/src/warningRules.ts#L9)

___

### duration

• `Optional` **duration**: `number`

#### Defined in

[src/warningRules.ts:10](https://github.com/mpx-ecology/mp-api-monitor/blob/cec6529/src/warningRules.ts#L10)

___

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

[src/warningRules.ts:5](https://github.com/mpx-ecology/mp-api-monitor/blob/cec6529/src/warningRules.ts#L5)
