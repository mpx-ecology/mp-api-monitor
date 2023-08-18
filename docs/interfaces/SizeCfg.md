[@mpxjs/mp-api-monitor](../index.md) / SizeCfg

# Interface: SizeCfg

## Hierarchy

- [`WarningCfg`](WarningCfg.md)

  ↳ **`SizeCfg`**

## Table of contents

### Properties

- [onWarning](SizeCfg.md#onwarning)
- [size](SizeCfg.md#size)
- [count](SizeCfg.md#count)
- [duration](SizeCfg.md#duration)

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

[src/warningRules.ts:5](https://github.com/mpx-ecology/mp-api-monitor/blob/master/src/warningRules.ts#L5)

___

### size

• **size**: `number`

#### Defined in

[src/warningRules.ts:22](https://github.com/mpx-ecology/mp-api-monitor/blob/master/src/warningRules.ts#L22)

___

### count

• `Optional` **count**: `number`

#### Defined in

[src/warningRules.ts:23](https://github.com/mpx-ecology/mp-api-monitor/blob/master/src/warningRules.ts#L23)

___

### duration

• `Optional` **duration**: `number`

#### Defined in

[src/warningRules.ts:24](https://github.com/mpx-ecology/mp-api-monitor/blob/master/src/warningRules.ts#L24)
