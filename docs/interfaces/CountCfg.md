[@mpxjs/mp-api-monitor](../index.md) / CountCfg

# Interface: CountCfg

## Hierarchy

- [`WarningCfg`](WarningCfg.md)

  ↳ **`CountCfg`**

## Table of contents

### Properties

- [onWarning](CountCfg.md#onwarning)
- [count](CountCfg.md#count)
- [duration](CountCfg.md#duration)

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

### count

• **count**: `number`

#### Defined in

[src/warningRules.ts:9](https://github.com/mpx-ecology/mp-api-monitor/blob/master/src/warningRules.ts#L9)

___

### duration

• `Optional` **duration**: `number`

#### Defined in

[src/warningRules.ts:10](https://github.com/mpx-ecology/mp-api-monitor/blob/master/src/warningRules.ts#L10)
