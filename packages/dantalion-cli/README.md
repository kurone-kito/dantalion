<!-- markdownlint-disable MD024 -->

# 🦁 Dantalion: CLI version

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

Require: Node.js >= v12

### Install

```sh
npm install -g @kurone-kito/dantalion-cli
```

### Get the personality

```sh
dantalion personality 1993-10-09
```

#### Result

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

### Get detailed information on personality

```sh
dantalion details 555
```

#### Result

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

## License

MIT
