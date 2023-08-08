[@mpxjs/mp-api-monitor](../index.md) / SizeCfg

# Interface: SizeCfg

## Hierarchy

- [`WarningCfg`](WarningCfg.md)

  ↳ **`SizeCfg`**

## Table of contents

### Properties

- [count](SizeCfg.md#count)
- [duration](SizeCfg.md#duration)
- [onWarning](SizeCfg.md#onwarning)
- [size](SizeCfg.md#size)

## Properties

### count

• `Optional` **count**: `number`

#### Defined in

[src/warningRules.ts:23](https://github.com/mpx-ecology/mp-api-monitor/blob/95e0f31/src/warningRules.ts#L23)

___

### duration

• `Optional` **duration**: `number`

#### Defined in

[src/warningRules.ts:24](https://github.com/mpx-ecology/mp-api-monitor/blob/95e0f31/src/warningRules.ts#L24)

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

[src/warningRules.ts:5](https://github.com/mpx-ecology/mp-api-monitor/blob/95e0f31/src/warningRules.ts#L5)

___

### size

• **size**: `number`

#### Defined in

[src/warningRules.ts:22](https://github.com/mpx-ecology/mp-api-monitor/blob/95e0f31/src/warningRules.ts#L22)
