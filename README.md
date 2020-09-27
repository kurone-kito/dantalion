# 🦁 Dantalion: Birthday fortune app

“Dantalion” is the name of seventy-first demon in the demonological grimoire, _[the Lesser Key of Solomon](https://en.wikipedia.org/wiki/The_Lesser_Key_of_Solomon)_. Not only does he teach all kinds of academic knowledge, but he can also read and manipulate other’s hearts.

If you can predict the other person’s character, you can increase the possibility of controlling the will of the other person. This app provides a function that calculates the personality details from the specified birthday. Its calculation includes the method of _[Four Pillars of Destiny (Ba-Zi)](https://en.wikipedia.org/wiki/Four_Pillars_of_Destiny)_.

It can specify a birthday within the range from February 1, 1873, to December 31, 2050.

## Note

- OS independent: This library only depends on `ts-polyfill` and `core-js` internally.
- This package does not consider time zones. If you are not satisfied with
  the calculated personality, moving the date back and forth may solve.

## Usage

Require: Node.js >= v10.22.1

### For those who want to use this app with CLI

```sh
npm install -g @kurone-kito/dantalion-cli
dantalion personality 1993-10-09
dantalion detail 555
```

### For those who want to embed this library in your node.js app

```sh
npm install --save @kurone-kito/dantalion-core
```

```ts
import { getDetail, getPersonality } from '@kurone-kito/dantalion-core';
// const { getDetail, getPersonality } = require('@kurone-kito/dantalion-core');

console.log(getPersonality('1993-10-09'));
console.log(getDetail('555'));
```

_[See the wiki for more details.](https://github.com/kurone-kito/dantalion/wiki)_

## License

MIT
