# 🦁 Dantalion: Core library

This package provides a function that infers the personality details
from the specified birthday. By using this package, you can quickly
implement birthday divination in your Node.js apps. Its calculation
is using the method of _Four Pillars of Destiny (Ba-Zi)_.

## Note

- This package can specify a birthday within the range from February 1,
  1873, to December 31, 2050.
- This package does not consider time zones. If you are not satisfied with
  the inferred personality, moving the date back and forth may solve.

## Usage

### Add to dependency

```sh
npm install -S @kurone-kito/dantalion-core
```

### Get the personality

```js
const { getPersonality } = require('@kurone-kito/dantalion-core');

console.log(getPersonality('1993-10-09'));
```

#### Result

In actually, The function gets the raw object, not the JSON.

```json
{
  "cycle": 10,
  "inner": "555",
  "lifeBase": "application",
  "outer": "789",
  "potential": ["Io", "Ii"],
  "workStyle": "125"
}
```

## API

### `getDetail`

```ts
type getDetail = (genius: Genius) => Detail | undefined;
```

### Parameters

- `genius`:

### `getPersonality`

Get the personality information corresponding to the specified birthday.

```ts
type getPersonality = (
  birth: string | number | Date
) => Personality | undefined;
```

### Parameters

- `birth`: Specify a birthday within the range from February 1, 1873,
  to December 31, 2050.
  Ignore the time information.

### Returns

The object that the personality information. If the date is over the range,
it will be `undefined`.

## Types (for TypeScript)

### `Genius`

The types of personality.

```ts
type Genius =
  | '000'
  | '001'
  | '012'
  | '024'
  | '025'
  | '100'
  | '108'
  | '125'
  | '555'
  | '789'
  | '888'
  | '919';
```

|  Key  | Value                                                                                   |
| :---: | :-------------------------------------------------------------------------------------- |
| `000` | This type of person would like to be freedom. And also, They have a good imagination.   |
| `001` | This type of person would like to do something different from others with their ideas.  |
| `012` | This type of person will like new somethings. They also value discussions, especially.  |
| `024` | This type of person is good at turning anxiety into action. They have a strong memory.  |
| `025` | This type of person has a strong camaraderie. And also, they have a lot of friends.     |
| `108` | This type of person is shy and honest. And they have a strong sense of responsibility.  |
| `125` | This type of person can accept temporary abstinence to fulfill their long-term goals.   |
| `555` | This type of person is quick to learn and can do anything. Also, they are dignified.    |
| `789` | This type of person value experience and achievement. Also, they prefer to be quiet.    |
| `888` | This type of person value the spirit of challenge and are interested in various things. |
| `919` | This type of person has the quick situational judgment and also is good at bargaining.  |

### `LifeBase`

The types that the base of ego.

```ts
type LifeBase =
  | 'application'
  | 'association'
  | 'development'
  | 'expression'
  | 'finance'
  | 'investment'
  | 'organization'
  | 'quest'
  | 'selfMind'
  | 'selfReliance';
```

| Key            | Value                                                                    |
| :------------- | :----------------------------------------------------------------------- |
| `application`  | This type of person would like to self-experience seriously.             |
| `association`  | This type of person would like to do it immediately when they think.     |
| `development`  | This type of person would like to be perfectionism.                      |
| `expression`   | This type of person would like to be honest with yourself.               |
| `finance`      | This type of person would like to put in everything within eyes reach.   |
| `investment`   | This type of person would like to be a down-to-earth collector.          |
| `organization` | This type of person would like to work as a member of a group.           |
| `quest`        | This type of person would like to learn from the wisdom of our pioneers. |
| `selfMind`     | This type of person would like to be a leader of the team.               |
| `selfReliance` | This type of person would like to be a lone wolf.                        |

### `Personality`

The details for Personality.

```ts
export interface Personality {
  cycle: number;
  inner: Genius;
  lifeBase: LifeBase;
  outer: Genius;
  potentials: [Potential, Potential];
  workStyle: Genius;
}
```

| Property     | Type                     | Description                  |
| :----------- | :----------------------- | :--------------------------- |
| `cycle`      | `number`                 | The sub-personality (cycle). |
| `inner`      | `Genius`                 | The inner personality.       |
| `lifeBase`   | `LifeBase`               | The life base.               |
| `outer`      | `Genius`                 | The outer personality.       |
| `potentials` | `[Potential, Potential]` | The potential.               |
| `workStyle`  | `Genius`                 | The personality at working.  |

### `Potential`

The types for potential.

```ts
type Potential =
  | 'Ci'
  | 'Co'
  | 'Ei'
  | 'Eo'
  | 'Fi'
  | 'Fo'
  | 'Ii'
  | 'Io'
  | 'Ni'
  | 'No';
```

_I'm not familiar with it yet._

## License

MIT
