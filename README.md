# 🦁 Dantalion: Birthday fortune app

[![npm version](https://badge.fury.io/js/%40kurone-kito%2Fdantalion-cli.svg)](https://badge.fury.io/js/%40kurone-kito%2Fdantalion-cli)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

“Dantalion” is the seventy-first demon in the demonological grimoire, _[the Lesser Key of Solomon](https://en.wikipedia.org/wiki/The_Lesser_Key_of_Solomon)_. He teaches all kinds of academic knowledge, but he can also read and manipulate others’ hearts.

If you can predict the other person’s character, you can increase the possibility of controlling the other person’s will. This app provides a function that calculates the personality details from the specified birthday. Its calculation includes the method of _[Four Pillars of Destiny (Ba-Zi)](https://en.wikipedia.org/wiki/Four_Pillars_of_Destiny)_.

The app can specify a birthday within the range from February 1, 1873, to December 31, 2050.

## Note

- OS independent and the core library part is dependent free.
- This package does not consider time zones. If you are not satisfied with
  the calculated personality, moving the date back and forth may solve.

## Usage

Require: Node.js >= v12 **(Strongly recommend: >= 14.17)**

Dantalion will **no more support by Node.js version v12.x** soon.

For the time being, the app maybe works fine in v12.x (will with a few warnings on install).
However, several factors helped us to let go of the v12.x, including the following:

1. We want to migrate our distribution from CommonJS to ES Modules in the future.
2. The web playground crashes in specific environments such as Apple Silicon.
   - We considered separating the web app version from monorepo and
     moving it to a separate repository but decided it would be less
     expensive to separate the v12.x support for the reasons in _1_.

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
