<!-- markdownlint-disable MD013 -->

# 🦁 Dantalion: Birthday fortune library

[![npm version](https://badge.fury.io/js/%40kurone-kito%2Fdantalion-cli.svg)](https://badge.fury.io/js/%40kurone-kito%2Fdantalion-cli)
[![CI](https://github.com/kurone-kito/dantalion/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/kurone-kito/dantalion/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

“Dantalion” is the seventy-first demon in the demonological grimoire,
_[the Lesser Key of Solomon](https://en.wikipedia.org/wiki/The_Lesser_Key_of_Solomon)_.
He teaches all kinds of academic knowledge, but he can also read and
manipulate others’ hearts.

If you can predict the other person’s character, you can increase the
possibility of controlling the other person’s will. This library
calculates the personality details from a specified birthday using
the method of
_[Four Pillars of Destiny (Ba-Zi)](https://en.wikipedia.org/wiki/Four_Pillars_of_Destiny)_.

The library can compute personalities for any birthday between
**February 1, 1873** and **December 31, 2050**.

## Notes

- The core library has **zero runtime dependencies** and is
  OS-independent.
- The library does not consider time zones. If you are not
  satisfied with the calculated personality, moving the date back
  and forth by one day may help.

## Requirements

- **Node.js** `^20.18 || ^22 || >=24` (CommonJS support dropped in
  v1.0.0; the published packages are ESM-only)
- **pnpm** 10+ for contributor work (consumers can install via npm,
  yarn, or any package manager)

## Usage

### As a CLI

```sh
pnpm add -g @kurone-kito/dantalion-cli
# or: npm i -g @kurone-kito/dantalion-cli

dantalion personality 1993-10-09
dantalion detail 555

# Raw JSON output
dantalion personality 1993-10-09 --raw
```

### As a library (ESM)

```sh
pnpm add @kurone-kito/dantalion-core
```

```ts
import { getDetail, getPersonality } from '@kurone-kito/dantalion-core';

console.log(getPersonality('1993-10-09'));
// {
//   cycle: 10,
//   inner: '555',
//   lifeBase: 'application',
//   outer: '789',
//   potentials: ['Io', 'Ii'],
//   workStyle: '125'
// }

console.log(getDetail('555'));
```

## Migration from v0.19.x

- ESM-only output; consumers must use `import` rather than
  `require`.
- Node.js floor raised from `>=12.1` to
  `^20.18 || ^22 || >=24`.
- The `Personality.potentials` field is plural (a 2-tuple). The
  v0.19.x README example showed `potential` (singular), which was
  a documentation bug — the runtime field has always been
  `potentials`.

See [`CHANGELOG.md`](./CHANGELOG.md) for the complete migration
notes.

## Web demo

The browser-facing playground lives in its own repository:
[`kurone-kito/dantalion-web-demo`](https://github.com/kurone-kito/dantalion-web-demo).

## Contributing

This repository runs an Issue-Driven Development loop imported from
[`kurone-kito/idd-skill`](https://github.com/kurone-kito/idd-skill).
See [`AGENTS.md`](./AGENTS.md), [`CLAUDE.md`](./CLAUDE.md), or
[`.github/copilot-instructions.md`](./.github/copilot-instructions.md)
for AI-assisted contribution guidance.

_[See the wiki for more details.](https://github.com/kurone-kito/dantalion/wiki)_

## License

[MIT](./LICENSE)
