[@mpxjs/mp-api-monitor](../index.md) / ErrorCfg

# Interface: ErrorCfg

## Hierarchy

- [`WarningCfg`](WarningCfg.md)

  ↳ **`ErrorCfg`**

## Table of contents

### Properties

- [onWarning](ErrorCfg.md#onwarning)
- [errno](ErrorCfg.md#errno)

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

### errno

• `Optional` **errno**: `number`

#### Defined in

[src/warningRules.ts:18](https://github.com/mpx-ecology/mp-api-monitor/blob/master/src/warningRules.ts#L18)
