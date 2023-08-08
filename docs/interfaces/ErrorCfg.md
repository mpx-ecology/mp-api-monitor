[@mpxjs/mp-api-monitor](../index.md) / ErrorCfg

# Interface: ErrorCfg

## Hierarchy

- [`WarningCfg`](WarningCfg.md)

  ↳ **`ErrorCfg`**

## Table of contents

### Properties

- [errno](ErrorCfg.md#errno)
- [onWarning](ErrorCfg.md#onwarning)

## Properties

### errno

• `Optional` **errno**: `number`

#### Defined in

[src/warningRules.ts:18](https://github.com/mpx-ecology/mp-api-monitor/blob/95e0f31/src/warningRules.ts#L18)

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
