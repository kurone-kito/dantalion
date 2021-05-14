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

- Require: Node.js >= v12
- OS independent (It's a terminal app)

### Install

```sh
npm install -g @kurone-kito/dantalion-cli
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
# Dantalion: 誕生日が Sat Oct 09 1993 の人の性格と、取扱方法

## 性格の大分類

人の性格は大きく 3 つ、アート脳タイプ・理系脳タイプ・文系脳タイプに分類できます。

### 理系脳タイプ

    * 己の富のためを根底のエゴとし、効率性を追求するタイプです。
    * スペック至上主義の傾向があり、ブランドものを軽視する傾向が強いです。ただし、ブランドも一種のスペックと考え、重視する人も稀にいます。
    * 理系脳タイプは、長話をあまり聞けません。「つまりこういうことだよね？」と、脳内で要点だけかいつまんで理解しようとします。

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
  "potential": ["Io", "Ii"],
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
# Dantalion: 性格タイプ 555 の詳細、および取扱方法

## 性格の大分類

人の性格は大きく 3 つ、アート脳タイプ・理系脳タイプ・文系脳タイプに分類できます。

### 理系脳タイプ

    * 己の富のためを根底のエゴとし、効率性を追求するタイプです。
    * スペック至上主義の傾向があり、ブランドものを軽視する傾向が強いです。ただし、ブランドも一種のスペックと考え、重視する人も稀にいます。
    * 理系脳タイプは、長話をあまり聞けません。「つまりこういうことだよね？」と、脳内で要点だけかいつまんで理解しようとします。

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
# Dantalion: 有効な性格タイプ一覧

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
