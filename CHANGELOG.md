<!-- markdownlint-disable MD024 -->

# Changelog

## v0.14.0 (2021-06-08)

### BREAKING CHANGES

- i18n: Removed the `createTAsync()` function with two arguments. ([b6a0d43](https://github.com/kurone-kito/dantalion/commit/b6a0d43))
  - This function was deprecated in version 0.12.0, and a new
    single-argument same-name function was implemented as an alternative.

### Features

- cli, core, i18n, web: The app can now the output of the personality
  number, a.k.a. CC number. ([3220412](https://github.com/kurone-kito/dantalion/commit/3220412), [0a9fbc7](https://github.com/kurone-kito/dantalion/commit/0a9fbc7), [13b72aa](https://github.com/kurone-kito/dantalion/commit/13b72aa), [a3094e4](https://github.com/kurone-kito/dantalion/commit/a3094e4), [95413ad](https://github.com/kurone-kito/dantalion/commit/95413ad), [03171e3](https://github.com/kurone-kito/dantalion/commit/03171e3))

### Chores

- web: Improved the appearance of the external link component. ([a4965bb](https://github.com/kurone-kito/dantalion/commit/a4965bb))
- improved the Visual Studio Code configurations ([14cbc94](https://github.com/kurone-kito/dantalion/commit/14cbc94))

## v0.13.2 (2021-06-07)

### Refactored

- cli, web: Added and updated the dependencies ([38fdb41](https://github.com/kurone-kito/dantalion/commit/38fdb41))

### Documents

- core: Added the documentation ([88e544b](https://github.com/kurone-kito/dantalion/commit/88e544b), [16a6b97](https://github.com/kurone-kito/dantalion/commit/16a6b97), [4d2a1d2](https://github.com/kurone-kito/dantalion/commit/4d2a1d2))

### Chores

- ci: Removed the Node.js v15 tests ([47a0e09](https://github.com/kurone-kito/dantalion/commit/47a0e09))
- ci: Configured to use legacy methods for peer dependency installation in CI ([806ec3e](https://github.com/kurone-kito/dantalion/commit/806ec3e))
- web: Added the Storybook ([502f35d](https://github.com/kurone-kito/dantalion/commit/502f35d), [73b62dd](https://github.com/kurone-kito/dantalion/commit/73b62dd), [53d9015](https://github.com/kurone-kito/dantalion/commit/53d9015), [bac41f4](https://github.com/kurone-kito/dantalion/commit/bac41f4))
- web: added an anchor with external icon component ([2be8842](https://github.com/kurone-kito/dantalion/commit/2be8842))
- web: Improved internal components ([3b4b322](https://github.com/kurone-kito/dantalion/commit/3b4b322), [2bce28a](https://github.com/kurone-kito/dantalion/commit/2bce28a), [8cedaff](https://github.com/kurone-kito/dantalion/commit/8cedaff), [923dc55](https://github.com/kurone-kito/dantalion/commit/923dc55), [a128b21](https://github.com/kurone-kito/dantalion/commit/a128b21), [2f1eb16](https://github.com/kurone-kito/dantalion/commit/2f1eb16))
- web: Fixed the prohibited structure of HTML ([1020530](https://github.com/kurone-kito/dantalion/commit/1020530))
- Improved the TypeScript / ESLint configurations ([99e98f1](https://github.com/kurone-kito/dantalion/commit/99e98f1), [7217038](https://github.com/kurone-kito/dantalion/commit/7217038))

## v0.13.1 (2021-06-02)

### Bug fixes

- i18n: Improved resource wording, including correction of some wording replacement fail. ([70cc8ad](https://github.com/kurone-kito/dantalion/commit/70cc8ad))

### Tests

- i18n: Added the snapshot test. ([0f19e30](https://github.com/kurone-kito/dantalion/commit/0f19e30))

### Chores

- web: Added the sentry.io tracking ([0e36c28](https://github.com/kurone-kito/dantalion/commit/0e36c28))

## v0.13.0 (2021-05-30)

### BREAKING CHANGES

- i18n: The update has improved the structure of resources and transferred
  some of the traditional keys at this time. ([2bf1c28](https://github.com/kurone-kito/dantalion/commit/2bf1c28))

| From                              | To                                             |
| :-------------------------------- | :--------------------------------------------- |
| `PersonalityDetailType.inner`     | `PersonalityDetailType.descriptions.inner`     |
| `PersonalityDetailType.outer`     | `PersonalityDetailType.descriptions.outer`     |
| `PersonalityDetailType.workStyle` | `PersonalityDetailType.descriptions.workStyle` |

### Feature

- i18n: Added a type definition. ([75c850a](https://github.com/kurone-kito/dantalion/commit/75c850a))
  - `PersonalityDetailBaseType`

### Refactors

- Added, removed, and updated the dependencies ([a26d29e](https://github.com/kurone-kito/dantalion/commit/a26d29e))

### Chores

- web: Improved the appearance and internal logics substantially. ([af23807](https://github.com/kurone-kito/dantalion/commit/af23807))

## v0.12.3 (2021-05-29)

### Refactor

- Updated the dependencies ([7c7431d](https://github.com/kurone-kito/dantalion/commit/7c7431d))
- i18n: improved the resources wording ([10fce2a](https://github.com/kurone-kito/dantalion/commit/10fce2a))

### Chores

- web: fixed a problem that accidentally removed “coming soon” wording ([f35df1f](https://github.com/kurone-kito/dantalion/commit/f35df1f))
- web: small improved some appearances ([6f14e31](https://github.com/kurone-kito/dantalion/commit/6f14e31))

## v0.12.2 (2021-05-27)

### Refactor

- Replaced the homepage metadata of package.json ([f6f7fb2](https://github.com/kurone-kito/dantalion/commit/f6f7fb2))

### Chores

- web: Added the teaser site ([32a8e5c](https://github.com/kurone-kito/dantalion/commit/32a8e5c), [c9ee22a](https://github.com/kurone-kito/dantalion/commit/c9ee22a), [4841b76](https://github.com/kurone-kito/dantalion/commit/4841b76), [d563ad4](https://github.com/kurone-kito/dantalion/commit/d563ad4), [333fe0d](https://github.com/kurone-kito/dantalion/commit/333fe0d), [032527f](https://github.com/kurone-kito/dantalion/commit/032527f), [5f119e5](https://github.com/kurone-kito/dantalion/commit/5f119e5), [3bf5398](https://github.com/kurone-kito/dantalion/commit/3bf5398), [797313c](https://github.com/kurone-kito/dantalion/commit/797313c))
- Updated the CI script for deploying the web ([724030e](https://github.com/kurone-kito/dantalion/commit/724030e))

## v0.12.1 (2021-05-25)

### Refactor

- i18n: improved the resources wording ([beb2c8f](https://github.com/kurone-kito/dantalion/commit/beb2c8f))

## v0.12.0 (2021-05-25)

### BREAKING CHANGE

- i18n: Removed some APIs and types definitions
  specified as deprecated on v0.11.0 ([8da8f29](https://github.com/kurone-kito/dantalion/commit/8da8f29))
- Changed the createTAsync function arguments definitions. ([3623904](https://github.com/kurone-kito/dantalion/commit/3623904))
  - The function could now pass a value to this i18next.use function.

### Refactored

- cli: Migrated from deprecated API ([a8fe816](https://github.com/kurone-kito/dantalion/commit/a8fe816))

### Chores

- improved the gitignore for the new sub-project ([44fe892](https://github.com/kurone-kito/dantalion/commit/44fe892))

## v0.11.2 (2021-05-24)

### Refactor

- cli, i18n: Updated the dependencies ([118baa3](https://github.com/kurone-kito/dantalion/commit/118baa3))
  - core: It includes that updated the devDependencies.
- Linted ([b496919](https://github.com/kurone-kito/dantalion/commit/b496919))

### Chores

- Organized the package.json notation ([38683b0](https://github.com/kurone-kito/dantalion/commit/38683b0))
- improved some configurations
  - ESLint ([998ea0f](https://github.com/kurone-kito/dantalion/commit/998ea0f))
  - TypeScript ([42b49ab](https://github.com/kurone-kito/dantalion/commit/42b49ab))

## v0.11.1 (2021-05-23)

### Refactor

- cli, i18n: Updated the dependencies ([803e378](https://github.com/kurone-kito/dantalion/commit/803e378))
- i18n: Refactor on build the Markdown ([74d7f52](https://github.com/kurone-kito/dantalion/commit/74d7f52))

### Tests

- i18n: Added the feature tests that build the Markdown ([73731f2](https://github.com/kurone-kito/dantalion/commit/73731f2))

### Documents

- Minor updates ([d8c73f5](https://github.com/kurone-kito/dantalion/commit/d8c73f5))

## v0.11.0 (2021-05-22)

### BREAKING CHANGE

- i18n: Some API will be deprecated. They will no longer the next update.

| Category | Deprecated                      | Migrate to                   |
| :------- | :------------------------------ | :--------------------------- |
| Function | `getDescriptionAsync()`         | `Accessors.getDescription()` |
| Function | `getDetailMarkdownAsync()`      | `getDetailMarkdown()`        |
| Function | `getPersonalityMarkdownAsync()` | `getPersonalityMarkdown()`   |
| Property | `brain`                         | `Accessors.brain`            |
| Property | `communication`                 | `Accessors.communication`    |
| Property | `genius`                        | `Accessors.genius`           |
| Property | `lifeBase`                      | `Accessors.lifeBase`         |
| Property | `management`                    | `Accessors.management`       |
| Property | `motivation`                    | `Accessors.motivation`       |
| Property | `position`                      | `Accessors.position`         |
| Property | `response`                      | `Accessors.response`         |
| Property | `vector`                        | `Accessors.vector`           |
| Type     | `ResourcesAccessor<T, K, D>`    | `DetailAccessor<T, K, D>`    |

### Feature

- i18n: Added the some functions, types.
  - `Accessors` / `createAccessors()` / `createAccessorsAsync()` ([97058ff](https://github.com/kurone-kito/dantalion/commit/97058ff))
  - `getDetailMarkdown()` / `getPersonalityMarkdown` ([e57462a](https://github.com/kurone-kito/dantalion/commit/e57462a))
- i18n: Added the argument to `createTAsync()` function. ([62e3558](https://github.com/kurone-kito/dantalion/commit/62e3558))
- migrated to new accessors at the logic of build Markdown API. ([6b1a0db](https://github.com/kurone-kito/dantalion/commit/6b1a0db))

### Tests

- i18n: Added the `createTAsync()` function ([98084e2](https://github.com/kurone-kito/dantalion/commit/98084e2))

### Docs

- i18n: replaced the example result to the English version ([603d834](https://github.com/kurone-kito/dantalion/commit/603d834))

## v0.10.0 (2021-05-21)

### BREAKING CHANGE

- i18n: `ResourcesAccessor<T, K, D>` type definition will be deprecated.
  - This will may no longer the next update after.

### Feature

- i18n: Added and migrated the function that creates the generical assessor ([a882ea3](https://github.com/kurone-kito/dantalion/commit/a882ea3))
- i18n: split and exposed the i18n initializer ([2f43699](https://github.com/kurone-kito/dantalion/commit/2f43699))

### Refactor

- core, i18n: Removed the unnecessary exports ([5679d7e](https://github.com/kurone-kito/dantalion/commit/5679d7e))

### Docs

- i18n: Fixed some resource that notation was wrong ([6629d23](https://github.com/kurone-kito/dantalion/commit/6629d23))
- i18n: Improved the README ([61715d2](https://github.com/kurone-kito/dantalion/commit/61715d2), [307b068](https://github.com/kurone-kito/dantalion/commit/307b068), [c9f8f4d](https://github.com/kurone-kito/dantalion/commit/c9f8f4d))

## v0.9.0 (2021-05-19)

### BREAKING CHANGE

- i18n: Changed the fallback language from Japanese to English ([5329723](https://github.com/kurone-kito/dantalion/commit/5329723))
- i18n: Removed the `keyword` property ([ece6516](https://github.com/kurone-kito/dantalion/commit/ece6516))

### Docs

- i18n: Improved the wording ([caca48a](https://github.com/kurone-kito/dantalion/commit/caca48a))
- cli, core, i18n: Added the preface into README ([f580f33](https://github.com/kurone-kito/dantalion/commit/f580f33))

### Refactors

- i18n: Internal refactored ([f40017e](https://github.com/kurone-kito/dantalion/commit/f40017e))

### Chores

- i18n: added the dependencies: `lodash.merge` and updated some devDependencies ([b048b85](https://github.com/kurone-kito/dantalion/commit/b048b85))
  - It will actually use it in the next update.

## v0.8.0 (2021-05-18)

### Docs

- Added and improved the localized wording. ([9cbd682](https://github.com/kurone-kito/dantalion/commit/9cbd682), [5ea1c94](https://github.com/kurone-kito/dantalion/commit/5ea1c94))
- Improved the keywords ([1f81f6b](https://github.com/kurone-kito/dantalion/commit/1f81f6b))
- Added the badges to README ([e53ad2f](https://github.com/kurone-kito/dantalion/commit/e53ad2f))
- Fixed the wronged URLs in issues templates ([7ff1289](https://github.com/kurone-kito/dantalion/commit/7ff1289))

## v0.7.0 (2021-05-17)

### Feature

- i18n: Improved the resource wording. ([e146e86](https://github.com/kurone-kito/dantalion/commit/e146e86))
- i18n: Added the building the Markdown functions. ([8efc11a](https://github.com/kurone-kito/dantalion/commit/8efc11a))

## v0.6.0 (2021-05-16)

### Feature

- i18n: Available now the English resources partly. ([1fff20b](https://github.com/kurone-kito/dantalion/commit/1fff20b), [9bf1548](https://github.com/kurone-kito/dantalion/commit/9bf1548))
- i18n: Improved the resource wording. ([955df3a](https://github.com/kurone-kito/dantalion/commit/955df3a))

### Documents

- core: improved the wording for API documentation ([18cf83b](https://github.com/kurone-kito/dantalion/commit/18cf83b))

## v0.5.1 (2021-05-15)

### Refactored

- improved the keywords for npmjs. ([2f16235](https://github.com/kurone-kito/dantalion/commit/2f16235))

### Chores

- Added the tests on Node.js v16. ([38cc077](https://github.com/kurone-kito/dantalion/commit/38cc077))

## v0.5.0 (2021-05-14)

### BREAKING CHANGES

- cli: In default, it outputs the human-readable (Markdown) format. ([46ea07b](https://github.com/kurone-kito/dantalion/commit/46ea07b))
  - If you want the legacy outputs, you should specify a `--raw` option.

### Features

- cli: Added the outputs the human-readable (Markdown) format. ([92b755a](https://github.com/kurone-kito/dantalion/commit/92b755a), [403d827](https://github.com/kurone-kito/dantalion/commit/403d827), [8c7ab6f](https://github.com/kurone-kito/dantalion/commit/8c7ab6f), [c048f65](https://github.com/kurone-kito/dantalion/commit/c048f65))
- cli: Improved the help messages. ([4c8a233](https://github.com/kurone-kito/dantalion/commit/4c8a233))
- i18n: Added the `getDescriptionAsync()` API. ([0a17e22](https://github.com/kurone-kito/dantalion/commit/0a17e22), [66bb7cd](https://github.com/kurone-kito/dantalion/commit/66bb7cd))
- i18n: Added the `getLocale()` API. ([ff57cd1](https://github.com/kurone-kito/dantalion/commit/ff57cd1))
- i18n: Added the new resources accessor, `lifeBase` API. ([cb4d84a](https://github.com/kurone-kito/dantalion/commit/cb4d84a))
- i18n: Added the some type definitions. ([189edb6](https://github.com/kurone-kito/dantalion/commit/189edb6), [1cef8af](https://github.com/kurone-kito/dantalion/commit/1cef8af))

### Fixed

- i18n: Fixed the some type has wrong. ([afcc5ea](https://github.com/kurone-kito/dantalion/commit/afcc5ea), [47005ca](https://github.com/kurone-kito/dantalion/commit/47005ca))

### Refactored

- Added and updated the dependencies. ([cc84027](https://github.com/kurone-kito/dantalion/commit/cc84027), [4603e4c](https://github.com/kurone-kito/dantalion/commit/4603e4c))
- i18n: Externalized the detection of the Node.js version for toggles in the detection method of locales. ([b433f21](https://github.com/kurone-kito/dantalion/commit/b433f21))
- i18n: Removed the unused d.ts. ([b433f21](https://github.com/kurone-kito/dantalion/commit/b433f21))
- i18n: Moved the internal functions. ([f56e35f](https://github.com/kurone-kito/dantalion/commit/f56e35f), [ac34a8e](https://github.com/kurone-kito/dantalion/commit/ac34a8e), [5525dea](https://github.com/kurone-kito/dantalion/commit/5525dea))
- Linted. ([5a23f41](https://github.com/kurone-kito/dantalion/commit/5a23f41))

### Documents

- i18n: Improved the resources. ([54cb5b9](https://github.com/kurone-kito/dantalion/commit/54cb5b9), [817ba0e](https://github.com/kurone-kito/dantalion/commit/817ba0e), [602f656](https://github.com/kurone-kito/dantalion/commit/602f656))
- i18n: Collapsed the results. ([16c74b8](https://github.com/kurone-kito/dantalion/commit/16c74b8))
- Other improves. ([b6b55bb](https://github.com/kurone-kito/dantalion/commit/b6b55bb), [39d522a](https://github.com/kurone-kito/dantalion/commit/39d522a))

### Chores

- Added the CommitLint with Husky. ([5331375](https://github.com/kurone-kito/dantalion/commit/5331375), [d31686a](https://github.com/kurone-kito/dantalion/commit/d31686a))
- Improved the ESLint rules. ([f16d57e](https://github.com/kurone-kito/dantalion/commit/f16d57e))
- Improved the npm-scripts for debugging. ([e2626b6](https://github.com/kurone-kito/dantalion/commit/e2626b6))
- Added the JSON Schema files. ([0af2191](https://github.com/kurone-kito/dantalion/commit/0af2191))

## v0.4.1 (2021-04-26)

### Bugfix

- i18n: Fixed that type definition of the `motivation` instance has bullshit. ([b85beb3](https://github.com/kurone-kito/dantalion/commit/b85beb3))
- core: Avoided the problem that extra files mix in the distribution tarball. ([5650bf6](https://github.com/kurone-kito/dantalion/commit/5650bf6))

### Refactor

- core: unlinked the `ts-polyfill` ([6f5d24d](https://github.com/kurone-kito/dantalion/commit/6f5d24d), [1802512](https://github.com/kurone-kito/dantalion/commit/1802512))

### Tests

- i18n: Implemented the integration tests. ([2c3075a](https://github.com/kurone-kito/dantalion/commit/2c3075a), [182f3a7](https://github.com/kurone-kito/dantalion/commit/182f3a7))

### Documents

- i18n: fixed the type definitions ([7e8d4a1](https://github.com/kurone-kito/dantalion/commit/7e8d4a1))

## v0.4.0 (2021-04-24)

### Features

- Implemented the APIs in an i18n library package. ([3327399](https://github.com/kurone-kito/dantalion/commit/3327399), [2dc004c](https://github.com/kurone-kito/dantalion/commit/2dc004c))
  - It includes some refactorings. ([1e6577e](https://github.com/kurone-kito/dantalion/commit/1e6577e), [6f2ff62](https://github.com/kurone-kito/dantalion/commit/6f2ff62), [d0eb33a](https://github.com/kurone-kito/dantalion/commit/d0eb33a))

### Chores

- Updated the devDependencies ([3a2f0af](https://github.com/kurone-kito/dantalion/commit/3a2f0af))
- improved the ESLint settings ([e8d1f67](https://github.com/kurone-kito/dantalion/commit/e8d1f67))
- improved the .gitignore ([6e1957a](https://github.com/kurone-kito/dantalion/commit/6e1957a))

### Documentation

- Improved the documentations ([b02e983](https://github.com/kurone-kito/dantalion/commit/b02e983), [11fb79c](https://github.com/kurone-kito/dantalion/commit/11fb79c))

## v0.3.2 (2021-04-19)

### Bugfix

- avoided the problem that extra files mix in the distribution tarball ([c53fcf8](https://github.com/kurone-kito/dantalion/commit/c53fcf8))

### Documentation

- increased the require Node.js version ([2f7b50a](https://github.com/kurone-kito/dantalion/commit/2f7b50a))

### Chores

- updated the lerna configurations ([7381b78](https://github.com/kurone-kito/dantalion/commit/7381b78))

## v0.3.1 (2021-04-16)

This fix will fix the bug that the CLI version does not work.

### Bugfix

- Added a shebang. ([0cd6329](https://github.com/kurone-kito/dantalion/commit/0cd6329))

## v0.3.0 (2021-04-16)

### BREAKING CHANGE

- No longer supported in Node.js < 12 ([1a1748d](https://github.com/kurone-kito/dantalion/commit/1a1748d), [b509eab](https://github.com/kurone-kito/dantalion/commit/b509eab), [8a2f6f4](https://github.com/kurone-kito/dantalion/commit/8a2f6f4))

### Chores

- Updated the dependencies. ([544c0ab](https://github.com/kurone-kito/dantalion/commit/544c0ab))
  - Migrated to new specifications of dependencies. ([230213e](https://github.com/kurone-kito/dantalion/commit/230213e))
- Fixed a bug where the linter did not work correctly via npm-scripts on Windows. ([d78c9e5](https://github.com/kurone-kito/dantalion/commit/d78c9e5))
- Linted and minor refactored. ([29b0b3a](https://github.com/kurone-kito/dantalion/commit/29b0b3a), [6f7b0ba](https://github.com/kurone-kito/dantalion/commit/6f7b0ba))

## v0.2.1 (2020-12-26)

This update fixes a bug that caused GitHub Action builds to fail, with minor changes to the product code.

### Bugfix

- migrated the resource from YAML to JSON ([7aed9ba](https://github.com/kurone-kito/dantalion/commit/7aed9ba))
  - The i18n project migrated from webpack to TSC, and it could no longer use the YAML loader.
- added a prepared task explicitly to CI script ([fb8fb6d](https://github.com/kurone-kito/dantalion/commit/fb8fb6d))
  - Because it did not works automatically in Node.js v15 (npm v7).

## v0.2.0 (2020-12-20)

### Summary

- Migrated the building method from webpack to TSC. In TypeScript, bundles can cause inconsistencies in importing core packages, and bundles may not offer much benefit when publishing as a package.
- Updated the dependencies version to the latest version.
- Improved the documentation.
- I tried to move to the npm workspaces architecture of npm v7, but I didn't know how to package and publish it, so I gave up.

### Refactor

- migrated from webpack to tsc ([182370b](https://github.com/kurone-kito/dantalion/commit/182370b))

### Documents

- improved the documents about contributing ([93b820c](https://github.com/kurone-kito/dantalion/commit/93b820c))
- improved the documents about the overview ([4e3ed1e](https://github.com/kurone-kito/dantalion/commit/4e3ed1e))

### Chores

- improved a .gitignore ([698c1bd](https://github.com/kurone-kito/dantalion/commit/698c1bd))
- added the Node.js v15 to CI process ([fe49a14](https://github.com/kurone-kito/dantalion/commit/fe49a14))
- improve the CI script ([c8c7f34](https://github.com/kurone-kito/dantalion/commit/c8c7f34))
- improved the Node.js version ([58584ca](https://github.com/kurone-kito/dantalion/commit/58584ca))
- hoisted the dependencies ([419e84a](https://github.com/kurone-kito/dantalion/commit/419e84a))
- updated the dependencies ([2dd4602](https://github.com/kurone-kito/dantalion/commit/2dd4602))
- migrated the settings for ESLint ([d962c97](https://github.com/kurone-kito/dantalion/commit/d962c97))

## v0.1.5 (2020-09-27)

### Chores

- fixed the build fails ([9f3ae8a](https://github.com/kurone-kito/dantalion/commit/9f3ae8a))
- Updated the devDependencies. ([dfb013d](https://github.com/kurone-kito/dantalion/commit/dfb013d))

## v0.1.4 (2020-09-27)

### Features

- i18n: Implemented the resources. ([f90cba4](https://github.com/kurone-kito/dantalion/commit/f90cba4), [bd8f7ca](https://github.com/kurone-kito/dantalion/commit/bd8f7ca), [64481e7](https://github.com/kurone-kito/dantalion/commit/64481e7), [9f3ae8a](https://github.com/kurone-kito/dantalion/commit/9f3ae8a))

### Refactor

- Linted & Refactored. ([074e40d](https://github.com/kurone-kito/dantalion/commit/074e40d), [9455ae9](https://github.com/kurone-kito/dantalion/commit/9455ae9))

### Chores

- Updated and added the dependencies. ([#11](https://github.com/kurone-kito/dantalion/pull/11), [9cd3362](https://github.com/kurone-kito/dantalion/commit/9cd3362), [3f120a8](https://github.com/kurone-kito/dantalion/commit/3f120a8), [dfb013d](https://github.com/kurone-kito/dantalion/commit/dfb013d))
- Updated the settings.
  - Linter ([e7c8708](https://github.com/kurone-kito/dantalion/commit/e7c8708))
  - webpack ([7b8e499](https://github.com/kurone-kito/dantalion/commit/7b8e499))

### Documentation

- Improvement of trivial expression. ([5a6ad3b](https://github.com/kurone-kito/dantalion/commit/5a6ad3b))

## v0.1.3 (2020-06-11)

### Bugfix

- Fixed return bullshit value in getDetail function. ([b9d965c](https://github.com/kurone-kito/dantalion/commit/b9d965c))
  - Although it fixed mostly in the last update, I noticed that the value of the affinity property was not improved. 😵

## v0.1.2 (2020-06-11)

### Bugfix

- fixed return wrong value in getDetail function ([1781570](https://github.com/kurone-kito/dantalion/commit/1781570))
- an unnecessary file is included in the bundle ([971cba7](https://github.com/kurone-kito/dantalion/commit/971cba7))

### Tests

- added a integration test for getDetail function ([9714aac](https://github.com/kurone-kito/dantalion/commit/9714aac), [8273fad](https://github.com/kurone-kito/dantalion/commit/8273fad))

### Chores

- `npm run prepack` has crash ([04f5025](https://github.com/kurone-kito/dantalion/commit/04f5025))

## v0.1.1 (2020-06-09)

### Bugfix

- an unnecessary file is included in the bundle ([4af389a](https://github.com/kurone-kito/dantalion/commit/4af389a))
- updated the description ([b119923](https://github.com/kurone-kito/dantalion/commit/b119923))

### Documents

- improved the root documents ([c1a4822](https://github.com/kurone-kito/dantalion/commit/c1a4822))

### Chores

- imploved the CI scripts ([710c54f](https://github.com/kurone-kito/dantalion/commit/710c54f))

## v0.1.0 (2020-06-07)

- Initial version.
