# 🦁 Dantalion: i18n resources library

This package provides a function that infers the personality details
from the specified birthday. By using this package, you can quickly
implement birthday divination in your Node.js apps. Its calculation
is using the method of _Four Pillars of Destiny (Ba-Zi)_.

This package is a library that obtains human-readable (Markdown format)
details for the output of the `@kurone-kito/dantalion-core` package.

This library uses the Intl API to determine the language and outputs
it in the appropriate language. It's only in Japanese and partly English
yet, but we'll gradually support multiple languages.

## Usage

Require: Node.js >= v12

### Add to dependency

```sh
npm install -S @kurone-kito/dantalion-core @kurone-kito/dantalion-i18n
```

### Get the details of the personality

```js
const { getPersonality } = require('@kurone-kito/dantalion-core');
const { genius } = require('@kurone-kito/dantalion-i18n');

const personality = getPersonality('1993-10-09');
console.log(personality.inner); // === '555'

const result = genius.getValue(personality.inner);

console.log(JSON.stringify(result));
```

#### Result

In strictly, The function gets the raw object, not the JSON.
Since it's a long sentence, it omitted some parts.

```json
{
  "name": "悠然タイプ",
  "keyword": ["帝旺", "虎"],
  "summary": "バランス型能力と面倒見が良い、勇者的ポジション",
  "detail": [
    "重役社員のような、万能感と親分肌のような空気感を持つ人が多いです。",
    :
    :
  ],
  "weak": [
    "悠然タイプの人は、自分が悪くても謝罪するのを嫌がります。責任や謝罪心を持っていても、それを表明するのが極端に苦手です。"
  ],
  "strategy": [
    "悠然タイプの人は自力でなんでもできてしまうがため、自分でなんでも抱えてしまいます。何かを任せる際は『やらせすぎない』よう注意すると良いでしょう。"
  ]
}
```

## API

### `brain`

The instance provides a set of functions that retrieve human-readable resources related to the thought method.

- Type: `ResourcesAccessor<DetailsType, Brain>`
- The [`Brain`](../dantalion-core#brain) type is a string literal union type provided by the `@kurone-kito/dantalion-core` library.

### `communication`

The instance provides a set of functions that retrieve human-readable resources related to dialogue policy.

- Type: `ResourcesAccessor<DetailsType, Communication>`
- The [`Communication`](../dantalion-core#communication) type is a string literal union type provided by the `@kurone-kito/dantalion-core` library.

### `getLocale(): string | undefined`

It provides the appropriate locale information acquisition function according to the current environment.

For Node.js version 12.1.0 and later or web browsers, it depends on the [Intl API](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl)'s decision. If not, it determines by the environment variables.

- Arguments: _(None)_
- Returns: The locale string e.g. `en-US.utf8` or undefined value.

### `genius`

The instance provides a set of functions that retrieve human-readable resources related to natural personality.

- Type: `ResourcesAccessor<PersonalityType, Genius>`
- The [`Genius`](../dantalion-core#genius) type is a string literal union type provided by the `@kurone-kito/dantalion-core` library.

### `lifeBase`

The instance provides a set of functions that retrieve human-readable resources related to the base of ego type.

- Type: `ResourcesAccessor<string, LifeBase, string>`
- The [`LifeBase`](../dantalion-core#lifebase) type is a string literal union type provided by the `@kurone-kito/dantalion-core` library.

### `management`

The instance provides a set of functions that retrieve human-readable resources related to risk and return thinking in specific people.

- Type: `ResourcesAccessor<DetailsType, Management>`
- The [`Management`](../dantalion-core#management) type is a string literal union type provided by the `@kurone-kito/dantalion-core` library.

### `motivation`

The instance provides a set of functions that retrieve human-readable resources related to an environment that is easy to get motivated.

- Type: `ResourcesAccessor<string, Motivation, string>`
- The [`Motivation`](../dantalion-core#motivation) type is a string literal union type provided by the `@kurone-kito/dantalion-core` library.

### `position`

The instance provides a set of functions that retrieve human-readable resources related to a talented role.

- Type: `ResourcesAccessor<DetailsType, Position>`
- The [`Position`](../dantalion-core#position) type is a string literal union type provided by the `@kurone-kito/dantalion-core` library.

### `response`

The instance provides a set of functions that retrieve human-readable resources related to on-site or behind.

- Type: `ResourcesAccessor<DetailsType, Response>`
- The [`Response`](../dantalion-core#response) type is a string literal union type provided by the `@kurone-kito/dantalion-core` library.

### `vector`

The instance provides a set of functions that retrieve human-readable resources related to the major classification of personality.

- Type: `ResourcesAccessor<VectorType, Vector>`
- The [`Vector`](../dantalion-core#vector) type is a string literal union type provided by the `@kurone-kito/dantalion-core` library.

## Types (for TypeScript)

The strings contained in the object are in Markdown format. In the
case of an array of strings, the elements separate for each paragraph.

### `DesctiptionsType`

The type definition that the resources of description.

```ts
interface DesctiptionsType {
  readonly detail: string;
  readonly details: string;
  readonly genius1: string;
  readonly genius2: string;
  readonly invalid: string;
  readonly keyword: string;
  readonly personality: string;
  readonly strategy: string;
  readonly weak: string;
}
```

| Property      | Type     | Description                                        |
| :------------ | :------- | :------------------------------------------------- |
| `detail`      | `string` | The title of the detail.                           |
| `details`     | `string` | The title of the details list.                     |
| `genius1`     | `string` | The detail of the genius.                          |
| `genius2`     | `string` | The detail of the genius.                          |
| `invalid`     | `string` | The error message when specified invalid birthday. |
| `keyword`     | `string` | The keywords.                                      |
| `personality` | `string` | The title of personality.                          |
| `strategy`    | `string` | The strategy.                                      |
| `weak`        | `string` | The weak points.                                   |

### `DetailsBaseType`

The type definition that the pair of name and detail.

```ts
interface DetailsBaseType {
  readonly detail: string;
  readonly name: string;
}
```

| Property | Type     | Description                     |
| :------- | :------- | :------------------------------ |
| `detail` | `string` | The detail.                     |
| `name`   | `string` | The resource name as a heading. |

### `DetailsType`

The type definition that the name, detail and more descriptions.

```ts
interface DetailsType {
  readonly detail: string;
  readonly name: string;
  readonly more: readonly string[];
}
```

| Property | Type                | Description                     |
| :------- | :------------------ | :------------------------------ |
| `detail` | `string`            | The detail.                     |
| `more`   | `readonly string[]` | The more detailed descriptions. |
| `name`   | `string`            | The resource name as a heading. |

### `PersonalityDetailType`

The type definition that the details of personality.

```ts
export interface PersonalityDetailType {
  readonly detail: string;
  readonly inner: string;
  readonly name: string;
  readonly outer: string;
  readonly workStyle: string;
}
```

| Property    | Type     | Description                             |
| :---------- | :------- | :-------------------------------------- |
| `detail`    | `string` | The detail.                             |
| `inner`     | `string` | The resource of inner personality.      |
| `name`      | `string` | The resource name as a heading.         |
| `outer`     | `string` | The resource of outer personality.      |
| `workStyle` | `string` | The resource of personality at working. |

### `PersonalityType`

A type definition of a structure that stores a
description of a particular person's personality.

```ts
interface PersonalityType {
  readonly detail: readonly string[];
  readonly keyword: readonly string[];
  readonly name: string;
  readonly strategy: readonly string[];
  readonly summary: string;
  readonly weak: readonly string[];
}
```

| Property   | Type                | Description                                                            |
| :--------- | :------------------ | :--------------------------------------------------------------------- |
| `detail`   | `readonly string[]` | The detail.                                                            |
| `keyword`  | `readonly string[]` | The keywords.                                                          |
| `name`     | `string`            | The resource name.                                                     |
| `strategy` | `readonly string[]` | The strategies for communicating with people of this personality type. |
| `summary`  | `string`            | The short summary as a heading.                                        |
| `weak`     | `readonly string[]` | The weak points.                                                       |

### `ResourcesAccessor<T, K>`

The type definition with a function to
access a resource of the specific category.

```ts
interface ResourcesAccessor<
  T extends object | string,
  K extends string,
  D extends DetailsBaseType | string = DetailsBaseType
> {
  getAsync(key: K): Promise<T | undefined>;
  getCategoryDetailAsync(): Promise<D | undefined>;
}
```

| Type | Constraint                  | Description                                                |
| :--- | :-------------------------- | :--------------------------------------------------------- |
| `T`  | `object \| string`          | The type of resource as a return value.                    |
| `K`  | `string`                    | The type for the key.                                      |
| `D`  | `DetailsBaseType \| string` | The type of resource as a return value of category detail. |

| Method                                              | Description                                                                               |
| :-------------------------------------------------- | :---------------------------------------------------------------------------------------- |
| `getAsync(key: K): Promise<T \| undefined>`         | The function acquires the resource corresponding to the key asynchronously.               |
| `getCategoryDetailAsync(): Promise<D \| undefined>` | The function acquires the resource corresponding to the specific category asynchronously. |

### `VectorType`

A type definition of a structure that
stores a description of a personality type.

```ts
interface VectorType {
  readonly detail: string;
  readonly name: string;
  readonly strategy: readonly string[];
}
```

| Property   | Type                | Description                                                            |
| :--------- | :------------------ | :--------------------------------------------------------------------- |
| `detail`   | `string`            | The detail.                                                            |
| `name`     | `string`            | The resource name as a heading.                                        |
| `strategy` | `readonly string[]` | The strategies for communicating with people of this personality type. |
