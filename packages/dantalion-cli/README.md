<!-- markdownlint-disable MD024 -->

# 🦁 Dantalion: CLI version

[![npm version](https://badge.fury.io/js/%40kurone-kito%2Fdantalion-cli.svg)](https://badge.fury.io/js/%40kurone-kito%2Fdantalion-cli)

“Dantalion” is the seventy-first demon in the demonological grimoire,
_[the Lesser Key of Solomon](https://en.wikipedia.org/wiki/The_Lesser_Key_of_Solomon)_.
He teaches all kinds of academic knowledge, but he can also read and
manipulate others’ hearts.

If you can predict the other person’s character, you can increase the
possibility of controlling the other person’s will. This package provides
a function that infers the personality details from the specified birthday.
By using this package, you can quickly implement birthday divination in
your Node.js apps. Its calculation is using the method of
_Four Pillars of Destiny (Ba-Zi)_.

## Breaking changes since v0.19.x

- ESM-only output. Consumers must use `import` rather than
  `require`; no CommonJS bridge is provided.
- `engines.node` raised to `^20.18 || ^22 || >=24` (was `>=12`).
- `package.json#exports` replaces `main` / `types` for module
  resolution.

See the [root CHANGELOG](../../CHANGELOG.md) for the complete
migration notes.

## Note

- This package can specify a birthday within the range from February 1,
  1873, to December 31, 2050.
- This package does not consider time zones. If you are not satisfied with
  the inferred personality, moving the date back and forth may solve.

## Usage

- Require: Node.js ^20.18 || ^22 || >=24
- OS independent (It's a terminal app)

### Install

```sh
pnpm add -g @kurone-kito/dantalion-cli
```

### Get the personality

#### If you want the **human-readable** result (Markdown)

NOTE: It omits some minor information.

```sh
dantalion personality 1993-10-09
```

<!-- markdownlint-disable MD033 -->
<details><summary>Result</summary>

```md
# Dantalion: The personality of the person whose birthday is Sat Oct 09 1993 and how to handle them.

## Major categories of personality

There are three main types of humans personality: “Focused on authority”, “Focused on economically”, and “Focused on humanely”.

### Focused on economically

    * This personality type is the pursues efficiency, with the underlying ego being for the sake of one's own wealth.
    * They tend to be specs-oriented and tend to disrespect brands. However, some rare people consider brands to be a kind of specs and place importance on them.
    * They cannot listen to long conversations very well. So they try to understand only the main points and tend to think or say, “in a nutshell...”.

:
:
```

</details>
<!-- markdownlint-enable MD033 -->

#### If you want the **JSON formatted** result

```sh
dantalion personality --raw 1993-10-09
```

<!-- markdownlint-disable MD033 -->
<details><summary>Result</summary>

```json
{
  "cycle": 10,
  "inner": "555",
  "lifeBase": "application",
  "outer": "789",
  "potentials": ["Io", "Ii"],
  "workStyle": "125"
}
```

</details>
<!-- markdownlint-enable MD033 -->

### Get detailed information on personality

#### If you want the **human-readable** result (Markdown)

NOTE: It omits some minor information.

```sh
dantalion details 555
```

<!-- markdownlint-disable MD033 -->
<details><summary>Result</summary>

```md
# Dantalion: Details of people whose personality type is classified as 555, and how to handle them.

## Major categories of personality

There are three main types of humans personality: “Focused on authority”, “Focused on economically”, and “Focused on humanely”.

### Focused on economically

    * This personality type is the pursues efficiency, with the underlying ego being for the sake of one's own wealth.
    * They tend to be specs-oriented and tend to disrespect brands. However, some rare people consider brands to be a kind of specs and place importance on them.
    * They cannot listen to long conversations very well. So they try to understand only the main points and tend to think or say, “in a nutshell...”.

    :
    :
```

</details>
<!-- markdownlint-enable MD033 -->

#### If you want the **JSON formatted** result

```sh
dantalion details --raw 555
```

<!-- markdownlint-disable MD033 -->
<details><summary>Result</summary>

```json
{
  "affinity": {
    "biz": {
      "100": 0,
      "108": 3,
      "125": 2,
      "555": 3,
      "789": 1,
      "888": 2,
      "919": 1,
      "000": 0,
      "001": 2,
      "012": 2,
      "024": 0,
      "025": 0
    },
    "love": {
      "100": 0,
      "108": 0,
      "125": 3,
      "555": 2,
      "789": 2,
      "888": 2,
      "919": 0,
      "000": 2,
      "001": 2,
      "012": 3,
      "024": 0,
      "025": 2
    }
  },
  "brain": "left",
  "communication": "fix",
  "management": "hope",
  "motivation": "skillUp",
  "position": "quick",
  "response": "action",
  "vector": "economically"
}
```

</details>
<!-- markdownlint-enable MD033 -->

### Get the types list of personality

```sh
dantalion details
```

<!-- markdownlint-disable MD033 -->
<details><summary>Result</summary>

```md
# Dantalion: List of available personality type codes

    * 000
    * 001
    * 012
    * 024
    * 025
    * 100
    * 108
    * 125
    * 555
    * 789
    * 888
    * 919
```

</details>
<!-- markdownlint-enable MD033 -->

## See also

- [See the wiki for more details.](https://github.com/kurone-kito/dantalion/wiki)
- Wikipedia: [Four Pillars of Destiny (Ba-Zi)](https://en.wikipedia.org/wiki/Four_Pillars_of_Destiny)

## License

MIT
