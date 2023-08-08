[@mpxjs/mp-api-monitor](../index.md) / RecordDataQueue

# Interface: RecordDataQueue

## Hierarchy

- `Array`<[`RecordData`](RecordData.md)\>

  ↳ **`RecordDataQueue`**

## Table of contents

### Properties

- [[unscopables]](RecordDataQueue.md#[unscopables])
- [length](RecordDataQueue.md#length)
- [meta](RecordDataQueue.md#meta)

### Methods

- [[iterator]](RecordDataQueue.md#[iterator])
- [at](RecordDataQueue.md#at)
- [concat](RecordDataQueue.md#concat)
- [copyWithin](RecordDataQueue.md#copywithin)
- [entries](RecordDataQueue.md#entries)
- [every](RecordDataQueue.md#every)
- [fill](RecordDataQueue.md#fill)
- [filter](RecordDataQueue.md#filter)
- [find](RecordDataQueue.md#find)
- [findIndex](RecordDataQueue.md#findindex)
- [findLast](RecordDataQueue.md#findlast)
- [findLastIndex](RecordDataQueue.md#findlastindex)
- [flat](RecordDataQueue.md#flat)
- [flatMap](RecordDataQueue.md#flatmap)
- [forEach](RecordDataQueue.md#foreach)
- [includes](RecordDataQueue.md#includes)
- [indexOf](RecordDataQueue.md#indexof)
- [join](RecordDataQueue.md#join)
- [keys](RecordDataQueue.md#keys)
- [lastIndexOf](RecordDataQueue.md#lastindexof)
- [map](RecordDataQueue.md#map)
- [pop](RecordDataQueue.md#pop)
- [push](RecordDataQueue.md#push)
- [reduce](RecordDataQueue.md#reduce)
- [reduceRight](RecordDataQueue.md#reduceright)
- [reverse](RecordDataQueue.md#reverse)
- [shift](RecordDataQueue.md#shift)
- [slice](RecordDataQueue.md#slice)
- [some](RecordDataQueue.md#some)
- [sort](RecordDataQueue.md#sort)
- [splice](RecordDataQueue.md#splice)
- [toLocaleString](RecordDataQueue.md#tolocalestring)
- [toString](RecordDataQueue.md#tostring)
- [unshift](RecordDataQueue.md#unshift)
- [values](RecordDataQueue.md#values)

## Properties

### [unscopables]

• `Readonly` **[unscopables]**: `Object`

Is an object whose properties have the value 'true'
when they will be absent when used in a 'with' statement.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `[unscopables]?` | `boolean` | Is an object whose properties have the value 'true' when they will be absent when used in a 'with' statement. |
| `length?` | `boolean` | Gets or sets the length of the array. This is a number one higher than the highest index in the array. |
| `[iterator]?` | {} | - |
| `at?` | {} | - |
| `concat?` | {} | - |
| `copyWithin?` | {} | - |
| `entries?` | {} | - |
| `every?` | {} | - |
| `fill?` | {} | - |
| `filter?` | {} | - |
| `find?` | {} | - |
| `findIndex?` | {} | - |
| `findLast?` | {} | - |
| `findLastIndex?` | {} | - |
| `flat?` | {} | - |
| `flatMap?` | {} | - |
| `forEach?` | {} | - |
| `includes?` | {} | - |
| `indexOf?` | {} | - |
| `join?` | {} | - |
| `keys?` | {} | - |
| `lastIndexOf?` | {} | - |
| `map?` | {} | - |
| `pop?` | {} | - |
| `push?` | {} | - |
| `reduce?` | {} | - |
| `reduceRight?` | {} | - |
| `reverse?` | {} | - |
| `shift?` | {} | - |
| `slice?` | {} | - |
| `some?` | {} | - |
| `sort?` | {} | - |
| `splice?` | {} | - |
| `toLocaleString?` | {} | - |
| `toString?` | {} | - |
| `unshift?` | {} | - |
| `values?` | {} | - |

#### Inherited from

Array.[unscopables]

#### Defined in

node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:97

___

### length

• **length**: `number`

Gets or sets the length of the array. This is a number one higher than the highest index in the array.

#### Inherited from

Array.length

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1318

___

### meta

• **meta**: [`RecordMeta`](RecordMeta.md)

#### Defined in

[src/types.ts:68](https://github.com/mpx-ecology/mp-api-monitor/blob/95e0f31/src/types.ts#L68)

## Methods

### [iterator]

▸ **[iterator]**(): `IterableIterator`<[`RecordData`](RecordData.md)\>

Iterator

#### Returns

`IterableIterator`<[`RecordData`](RecordData.md)\>

#### Inherited from

Array.[iterator]

#### Defined in

node_modules/typescript/lib/lib.es2015.iterable.d.ts:58

___

### at

▸ **at**(`index`): `undefined` \| [`RecordData`](RecordData.md)

Returns the item located at the specified index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The zero-based index of the desired code unit. A negative index will count back from the last item. |

#### Returns

`undefined` \| [`RecordData`](RecordData.md)

#### Inherited from

Array.at

#### Defined in

node_modules/typescript/lib/lib.es2022.array.d.ts:24

___

### concat

▸ **concat**(`...items`): [`RecordData`](RecordData.md)[]

Combines two or more arrays.
This method returns a new array without modifying any existing arrays.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...items` | `ConcatArray`<[`RecordData`](RecordData.md)\>[] | Additional arrays and/or items to add to the end of the array. |

#### Returns

[`RecordData`](RecordData.md)[]

#### Inherited from

Array.concat

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1342

▸ **concat**(`...items`): [`RecordData`](RecordData.md)[]

Combines two or more arrays.
This method returns a new array without modifying any existing arrays.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...items` | ([`RecordData`](RecordData.md) \| `ConcatArray`<[`RecordData`](RecordData.md)\>)[] | Additional arrays and/or items to add to the end of the array. |

#### Returns

[`RecordData`](RecordData.md)[]

#### Inherited from

Array.concat

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1348

___

### copyWithin

▸ **copyWithin**(`target`, `start?`, `end?`): [`RecordDataQueue`](RecordDataQueue.md)

Returns the this object after copying a section of the array identified by start and end
to the same array starting at position target

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | `number` | If target is negative, it is treated as length+target where length is the length of the array. |
| `start?` | `number` | If start is negative, it is treated as length+start. If end is negative, it is treated as length+end. If start is omitted, `0` is used. |
| `end?` | `number` | If not specified, length of the this object is used as its default value. |

#### Returns

[`RecordDataQueue`](RecordDataQueue.md)

#### Inherited from

Array.copyWithin

#### Defined in

node_modules/typescript/lib/lib.es2015.core.d.ts:62

___

### entries

▸ **entries**(): `IterableIterator`<[`number`, [`RecordData`](RecordData.md)]\>

Returns an iterable of key, value pairs for every entry in the array

#### Returns

`IterableIterator`<[`number`, [`RecordData`](RecordData.md)]\>

#### Inherited from

Array.entries

#### Defined in

node_modules/typescript/lib/lib.es2015.iterable.d.ts:63

___

### every

▸ **every**<`S`\>(`predicate`, `thisArg?`): this is S[]

Determines whether all the members of an array satisfy the specified test.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends [`RecordData`](RecordData.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `predicate` | (`value`: [`RecordData`](RecordData.md), `index`: `number`, `array`: [`RecordData`](RecordData.md)[]) => value is S | A function that accepts up to three arguments. The every method calls the predicate function for each element in the array until the predicate returns a value which is coercible to the Boolean value false, or until the end of the array. |
| `thisArg?` | `any` | An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value. |

#### Returns

this is S[]

#### Inherited from

Array.every

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1425

▸ **every**(`predicate`, `thisArg?`): `boolean`

Determines whether all the members of an array satisfy the specified test.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `predicate` | (`value`: [`RecordData`](RecordData.md), `index`: `number`, `array`: [`RecordData`](RecordData.md)[]) => `unknown` | A function that accepts up to three arguments. The every method calls the predicate function for each element in the array until the predicate returns a value which is coercible to the Boolean value false, or until the end of the array. |
| `thisArg?` | `any` | An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value. |

#### Returns

`boolean`

#### Inherited from

Array.every

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1434

___

### fill

▸ **fill**(`value`, `start?`, `end?`): [`RecordDataQueue`](RecordDataQueue.md)

Changes all array elements from `start` to `end` index to a static `value` and returns the modified array

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`RecordData`](RecordData.md) | value to fill array section with |
| `start?` | `number` | index to start filling the array at. If start is negative, it is treated as length+start where length is the length of the array. |
| `end?` | `number` | index to stop filling the array at. If end is negative, it is treated as length+end. |

#### Returns

[`RecordDataQueue`](RecordDataQueue.md)

#### Inherited from

Array.fill

#### Defined in

node_modules/typescript/lib/lib.es2015.core.d.ts:51

___

### filter

▸ **filter**<`S`\>(`predicate`, `thisArg?`): `S`[]

Returns the elements of an array that meet the condition specified in a callback function.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends [`RecordData`](RecordData.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `predicate` | (`value`: [`RecordData`](RecordData.md), `index`: `number`, `array`: [`RecordData`](RecordData.md)[]) => value is S | A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the array. |
| `thisArg?` | `any` | An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value. |

#### Returns

`S`[]

#### Inherited from

Array.filter

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1461

▸ **filter**(`predicate`, `thisArg?`): [`RecordData`](RecordData.md)[]

Returns the elements of an array that meet the condition specified in a callback function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `predicate` | (`value`: [`RecordData`](RecordData.md), `index`: `number`, `array`: [`RecordData`](RecordData.md)[]) => `unknown` | A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the array. |
| `thisArg?` | `any` | An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value. |

#### Returns

[`RecordData`](RecordData.md)[]

#### Inherited from

Array.filter

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1467

___

### find

▸ **find**<`S`\>(`predicate`, `thisArg?`): `undefined` \| `S`

Returns the value of the first element in the array where predicate is true, and undefined
otherwise.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends [`RecordData`](RecordData.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `predicate` | (`value`: [`RecordData`](RecordData.md), `index`: `number`, `obj`: [`RecordData`](RecordData.md)[]) => value is S | find calls predicate once for each element of the array, in ascending order, until it finds one where predicate returns true. If such an element is found, find immediately returns that element value. Otherwise, find returns undefined. |
| `thisArg?` | `any` | If provided, it will be used as the this value for each invocation of predicate. If it is not provided, undefined is used instead. |

#### Returns

`undefined` \| `S`

#### Inherited from

Array.find

#### Defined in

node_modules/typescript/lib/lib.es2015.core.d.ts:29

▸ **find**(`predicate`, `thisArg?`): `undefined` \| [`RecordData`](RecordData.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`value`: [`RecordData`](RecordData.md), `index`: `number`, `obj`: [`RecordData`](RecordData.md)[]) => `unknown` |
| `thisArg?` | `any` |

#### Returns

`undefined` \| [`RecordData`](RecordData.md)

#### Inherited from

Array.find

#### Defined in

node_modules/typescript/lib/lib.es2015.core.d.ts:30

___

### findIndex

▸ **findIndex**(`predicate`, `thisArg?`): `number`

Returns the index of the first element in the array where predicate is true, and -1
otherwise.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `predicate` | (`value`: [`RecordData`](RecordData.md), `index`: `number`, `obj`: [`RecordData`](RecordData.md)[]) => `unknown` | find calls predicate once for each element of the array, in ascending order, until it finds one where predicate returns true. If such an element is found, findIndex immediately returns that element index. Otherwise, findIndex returns -1. |
| `thisArg?` | `any` | If provided, it will be used as the this value for each invocation of predicate. If it is not provided, undefined is used instead. |

#### Returns

`number`

#### Inherited from

Array.findIndex

#### Defined in

node_modules/typescript/lib/lib.es2015.core.d.ts:41

___

### findLast

▸ **findLast**<`S`\>(`predicate`, `thisArg?`): `undefined` \| `S`

Returns the value of the last element in the array where predicate is true, and undefined
otherwise.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends [`RecordData`](RecordData.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `predicate` | (`value`: [`RecordData`](RecordData.md), `index`: `number`, `array`: [`RecordData`](RecordData.md)[]) => value is S | findLast calls predicate once for each element of the array, in descending order, until it finds one where predicate returns true. If such an element is found, findLast immediately returns that element value. Otherwise, findLast returns undefined. |
| `thisArg?` | `any` | If provided, it will be used as the this value for each invocation of predicate. If it is not provided, undefined is used instead. |

#### Returns

`undefined` \| `S`

#### Inherited from

Array.findLast

#### Defined in

node_modules/typescript/lib/lib.es2023.array.d.ts:29

▸ **findLast**(`predicate`, `thisArg?`): `undefined` \| [`RecordData`](RecordData.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`value`: [`RecordData`](RecordData.md), `index`: `number`, `array`: [`RecordData`](RecordData.md)[]) => `unknown` |
| `thisArg?` | `any` |

#### Returns

`undefined` \| [`RecordData`](RecordData.md)

#### Inherited from

Array.findLast

#### Defined in

node_modules/typescript/lib/lib.es2023.array.d.ts:30

___

### findLastIndex

▸ **findLastIndex**(`predicate`, `thisArg?`): `number`

Returns the index of the last element in the array where predicate is true, and -1
otherwise.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `predicate` | (`value`: [`RecordData`](RecordData.md), `index`: `number`, `array`: [`RecordData`](RecordData.md)[]) => `unknown` | findLastIndex calls predicate once for each element of the array, in descending order, until it finds one where predicate returns true. If such an element is found, findLastIndex immediately returns that element index. Otherwise, findLastIndex returns -1. |
| `thisArg?` | `any` | If provided, it will be used as the this value for each invocation of predicate. If it is not provided, undefined is used instead. |

#### Returns

`number`

#### Inherited from

Array.findLastIndex

#### Defined in

node_modules/typescript/lib/lib.es2023.array.d.ts:41

___

### flat

▸ **flat**<`A`, `D`\>(`this`, `depth?`): `FlatArray`<`A`, `D`\>[]

Returns a new array with all sub-array elements concatenated into it recursively up to the
specified depth.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | `A` |
| `D` | extends `number` = ``1`` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | `A` | - |
| `depth?` | `D` | The maximum recursion depth |

#### Returns

`FlatArray`<`A`, `D`\>[]

#### Inherited from

Array.flat

#### Defined in

node_modules/typescript/lib/lib.es2019.array.d.ts:79

___

### flatMap

▸ **flatMap**<`U`, `This`\>(`callback`, `thisArg?`): `U`[]

Calls a defined callback function on each element of an array. Then, flattens the result into
a new array.
This is identical to a map followed by flat with depth 1.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `U` | `U` |
| `This` | `undefined` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | (`this`: `This`, `value`: [`RecordData`](RecordData.md), `index`: `number`, `array`: [`RecordData`](RecordData.md)[]) => `U` \| readonly `U`[] | A function that accepts up to three arguments. The flatMap method calls the callback function one time for each element in the array. |
| `thisArg?` | `This` | An object to which the this keyword can refer in the callback function. If thisArg is omitted, undefined is used as the this value. |

#### Returns

`U`[]

#### Inherited from

Array.flatMap

#### Defined in

node_modules/typescript/lib/lib.es2019.array.d.ts:68

___

### forEach

▸ **forEach**(`callbackfn`, `thisArg?`): `void`

Performs the specified action for each element in an array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callbackfn` | (`value`: [`RecordData`](RecordData.md), `index`: `number`, `array`: [`RecordData`](RecordData.md)[]) => `void` | A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array. |
| `thisArg?` | `any` | An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value. |

#### Returns

`void`

#### Inherited from

Array.forEach

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1449

___

### includes

▸ **includes**(`searchElement`, `fromIndex?`): `boolean`

Determines whether an array includes a certain element, returning true or false as appropriate.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `searchElement` | [`RecordData`](RecordData.md) | The element to search for. |
| `fromIndex?` | `number` | The position in this array at which to begin searching for searchElement. |

#### Returns

`boolean`

#### Inherited from

Array.includes

#### Defined in

node_modules/typescript/lib/lib.es2016.array.include.d.ts:25

___

### indexOf

▸ **indexOf**(`searchElement`, `fromIndex?`): `number`

Returns the index of the first occurrence of a value in an array, or -1 if it is not present.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `searchElement` | [`RecordData`](RecordData.md) | The value to locate in the array. |
| `fromIndex?` | `number` | The array index at which to begin the search. If fromIndex is omitted, the search starts at index 0. |

#### Returns

`number`

#### Inherited from

Array.indexOf

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1410

___

### join

▸ **join**(`separator?`): `string`

Adds all the elements of an array into a string, separated by the specified separator string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `separator?` | `string` | A string used to separate one element of the array from the next in the resulting string. If omitted, the array elements are separated with a comma. |

#### Returns

`string`

#### Inherited from

Array.join

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1353

___

### keys

▸ **keys**(): `IterableIterator`<`number`\>

Returns an iterable of keys in the array

#### Returns

`IterableIterator`<`number`\>

#### Inherited from

Array.keys

#### Defined in

node_modules/typescript/lib/lib.es2015.iterable.d.ts:68

___

### lastIndexOf

▸ **lastIndexOf**(`searchElement`, `fromIndex?`): `number`

Returns the index of the last occurrence of a specified value in an array, or -1 if it is not present.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `searchElement` | [`RecordData`](RecordData.md) | The value to locate in the array. |
| `fromIndex?` | `number` | The array index at which to begin searching backward. If fromIndex is omitted, the search starts at the last index in the array. |

#### Returns

`number`

#### Inherited from

Array.lastIndexOf

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1416

___

### map

▸ **map**<`U`\>(`callbackfn`, `thisArg?`): `U`[]

Calls a defined callback function on each element of an array, and returns an array that contains the results.

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callbackfn` | (`value`: [`RecordData`](RecordData.md), `index`: `number`, `array`: [`RecordData`](RecordData.md)[]) => `U` | A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array. |
| `thisArg?` | `any` | An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value. |

#### Returns

`U`[]

#### Inherited from

Array.map

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1455

___

### pop

▸ **pop**(): `undefined` \| [`RecordData`](RecordData.md)

Removes the last element from an array and returns it.
If the array is empty, undefined is returned and the array is not modified.

#### Returns

`undefined` \| [`RecordData`](RecordData.md)

#### Inherited from

Array.pop

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1331

___

### push

▸ **push**(`...items`): `number`

Appends new elements to the end of an array, and returns the new length of the array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...items` | [`RecordData`](RecordData.md)[] | New elements to add to the array. |

#### Returns

`number`

#### Inherited from

Array.push

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1336

___

### reduce

▸ **reduce**(`callbackfn`): [`RecordData`](RecordData.md)

Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callbackfn` | (`previousValue`: [`RecordData`](RecordData.md), `currentValue`: [`RecordData`](RecordData.md), `currentIndex`: `number`, `array`: [`RecordData`](RecordData.md)[]) => [`RecordData`](RecordData.md) | A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array. |

#### Returns

[`RecordData`](RecordData.md)

#### Inherited from

Array.reduce

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1473

▸ **reduce**(`callbackfn`, `initialValue`): [`RecordData`](RecordData.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callbackfn` | (`previousValue`: [`RecordData`](RecordData.md), `currentValue`: [`RecordData`](RecordData.md), `currentIndex`: `number`, `array`: [`RecordData`](RecordData.md)[]) => [`RecordData`](RecordData.md) |
| `initialValue` | [`RecordData`](RecordData.md) |

#### Returns

[`RecordData`](RecordData.md)

#### Inherited from

Array.reduce

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1474

▸ **reduce**<`U`\>(`callbackfn`, `initialValue`): `U`

Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callbackfn` | (`previousValue`: `U`, `currentValue`: [`RecordData`](RecordData.md), `currentIndex`: `number`, `array`: [`RecordData`](RecordData.md)[]) => `U` | A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array. |
| `initialValue` | `U` | If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value. |

#### Returns

`U`

#### Inherited from

Array.reduce

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1480

___

### reduceRight

▸ **reduceRight**(`callbackfn`): [`RecordData`](RecordData.md)

Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callbackfn` | (`previousValue`: [`RecordData`](RecordData.md), `currentValue`: [`RecordData`](RecordData.md), `currentIndex`: `number`, `array`: [`RecordData`](RecordData.md)[]) => [`RecordData`](RecordData.md) | A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array. |

#### Returns

[`RecordData`](RecordData.md)

#### Inherited from

Array.reduceRight

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1486

▸ **reduceRight**(`callbackfn`, `initialValue`): [`RecordData`](RecordData.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `callbackfn` | (`previousValue`: [`RecordData`](RecordData.md), `currentValue`: [`RecordData`](RecordData.md), `currentIndex`: `number`, `array`: [`RecordData`](RecordData.md)[]) => [`RecordData`](RecordData.md) |
| `initialValue` | [`RecordData`](RecordData.md) |

#### Returns

[`RecordData`](RecordData.md)

#### Inherited from

Array.reduceRight

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1487

▸ **reduceRight**<`U`\>(`callbackfn`, `initialValue`): `U`

Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callbackfn` | (`previousValue`: `U`, `currentValue`: [`RecordData`](RecordData.md), `currentIndex`: `number`, `array`: [`RecordData`](RecordData.md)[]) => `U` | A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array. |
| `initialValue` | `U` | If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value. |

#### Returns

`U`

#### Inherited from

Array.reduceRight

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1493

___

### reverse

▸ **reverse**(): [`RecordData`](RecordData.md)[]

Reverses the elements in an array in place.
This method mutates the array and returns a reference to the same array.

#### Returns

[`RecordData`](RecordData.md)[]

#### Inherited from

Array.reverse

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1358

___

### shift

▸ **shift**(): `undefined` \| [`RecordData`](RecordData.md)

Removes the first element from an array and returns it.
If the array is empty, undefined is returned and the array is not modified.

#### Returns

`undefined` \| [`RecordData`](RecordData.md)

#### Inherited from

Array.shift

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1363

___

### slice

▸ **slice**(`start?`, `end?`): [`RecordData`](RecordData.md)[]

Returns a copy of a section of an array.
For both start and end, a negative index can be used to indicate an offset from the end of the array.
For example, -2 refers to the second to last element of the array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `start?` | `number` | The beginning index of the specified portion of the array. If start is undefined, then the slice begins at index 0. |
| `end?` | `number` | The end index of the specified portion of the array. This is exclusive of the element at the index 'end'. If end is undefined, then the slice extends to the end of the array. |

#### Returns

[`RecordData`](RecordData.md)[]

#### Inherited from

Array.slice

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1373

___

### some

▸ **some**(`predicate`, `thisArg?`): `boolean`

Determines whether the specified callback function returns true for any element of an array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `predicate` | (`value`: [`RecordData`](RecordData.md), `index`: `number`, `array`: [`RecordData`](RecordData.md)[]) => `unknown` | A function that accepts up to three arguments. The some method calls the predicate function for each element in the array until the predicate returns a value which is coercible to the Boolean value true, or until the end of the array. |
| `thisArg?` | `any` | An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value. |

#### Returns

`boolean`

#### Inherited from

Array.some

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1443

___

### sort

▸ **sort**(`compareFn?`): [`RecordDataQueue`](RecordDataQueue.md)

Sorts an array in place.
This method mutates the array and returns a reference to the same array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `compareFn?` | (`a`: [`RecordData`](RecordData.md), `b`: [`RecordData`](RecordData.md)) => `number` | Function used to determine the order of the elements. It is expected to return a negative value if the first argument is less than the second argument, zero if they're equal, and a positive value otherwise. If omitted, the elements are sorted in ascending, ASCII character order. ```ts [11,2,22,1].sort((a, b) => a - b) ``` |

#### Returns

[`RecordDataQueue`](RecordDataQueue.md)

#### Inherited from

Array.sort

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1384

___

### splice

▸ **splice**(`start`, `deleteCount?`): [`RecordData`](RecordData.md)[]

Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `start` | `number` | The zero-based location in the array from which to start removing elements. |
| `deleteCount?` | `number` | The number of elements to remove. |

#### Returns

[`RecordData`](RecordData.md)[]

An array containing the elements that were deleted.

#### Inherited from

Array.splice

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1391

▸ **splice**(`start`, `deleteCount`, `...items`): [`RecordData`](RecordData.md)[]

Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `start` | `number` | The zero-based location in the array from which to start removing elements. |
| `deleteCount` | `number` | The number of elements to remove. |
| `...items` | [`RecordData`](RecordData.md)[] | Elements to insert into the array in place of the deleted elements. |

#### Returns

[`RecordData`](RecordData.md)[]

An array containing the elements that were deleted.

#### Inherited from

Array.splice

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1399

___

### toLocaleString

▸ **toLocaleString**(): `string`

Returns a string representation of an array. The elements are converted to string using their toLocaleString methods.

#### Returns

`string`

#### Inherited from

Array.toLocaleString

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1326

___

### toString

▸ **toString**(): `string`

Returns a string representation of an array.

#### Returns

`string`

#### Inherited from

Array.toString

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1322

___

### unshift

▸ **unshift**(`...items`): `number`

Inserts new elements at the start of an array, and returns the new length of the array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...items` | [`RecordData`](RecordData.md)[] | Elements to insert at the start of the array. |

#### Returns

`number`

#### Inherited from

Array.unshift

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1404

___

### values

▸ **values**(): `IterableIterator`<[`RecordData`](RecordData.md)\>

Returns an iterable of values in the array

#### Returns

`IterableIterator`<[`RecordData`](RecordData.md)\>

#### Inherited from

Array.values

#### Defined in

node_modules/typescript/lib/lib.es2015.iterable.d.ts:73
