<!-- markdownlint-disable MD024 -->

# Changelog

## v0.12.3 (2021-05-29)

### Refactor

- Updated the dependencies (7c7431d)
- i18n: improved the resources wording (10fce2a)

### Chores

- web: fixed a problem that accidentally removed “coming soon” wording (f35df1f)
- web: small improved some appearances (6f14e31)

## v0.12.2 (2021-05-27)

### Refactor

- Replaced the homepage metadata of package.json (f6f7fb2)

### Chores

- web: Added the teaser site (32a8e5c, c9ee22a, 4841b76, d563ad4, 333fe0d, 032527f, 5f119e5, 3bf5398, 797313c)
- Updated the CI script for deploying the web (724030e)

## v0.12.1 (2021-05-25)

### Refactor

- i18n: improved the resources wording (beb2c8f)

## v0.12.0 (2021-05-25)

### BREAKING CHANGE

- i18n: Removed some APIs and types definitions
  specified as deprecated on v0.11.0 (8da8f29)
- Changed the createTAsync function arguments definitions. (3623904)
  - The function could now pass a value to this i18next.use function.

### Refactored

- cli: Migrated from deprecated API (a8fe816)

### Chores

- improved the gitignore for the new sub-project (44fe892)

## v0.11.2 (2021-05-24)

### Refactor

- cli, i18n: Updated the dependencies (118baa3)
  - core: It includes that updated the devDependencies.
- Linted (b496919)

### Chores

- Organized the package.json notation (38683b0)
- improved some configurations
  - ESLint (998ea0f)
  - TypeScript (42b49ab)

## v0.11.1 (2021-05-23)

### Refactor

- cli, i18n: Updated the dependencies (803e378)
- i18n: Refactor on build the Markdown (74d7f52)

### Tests

- i18n: Added the feature tests that build the Markdown (73731f2)

### Documents

- Minor updates (d8c73f5)

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
  - `Accessors` / `createAccessors()` / `createAccessorsAsync()` (97058ff)
  - `getDetailMarkdown()` / `getPersonalityMarkdown` (e57462a)
- i18n: Added the argument to `createTAsync()` function. (62e3558)
- migrated to new accessors at the logic of build Markdown API. (6b1a0db)

### Tests

- i18n: Added the `createTAsync()` function (98084e2)

### Docs

- i18n: replaced the example result to the English version (603d834)

## v0.10.0 (2021-05-21)

### BREAKING CHANGE

- i18n: `ResourcesAccessor<T, K, D>` type definition will be deprecated.
  - This will may no longer the next update after.

### Feature

- i18n: Added and migrated the function that creates the generical assessor (a882ea3)
- i18n: split and exposed the i18n initializer (2f43699)

### Refactor

- core, i18n: Removed the unnecessary exports (5679d7e)

### Docs

- i18n: Fixed some resource that notation was wrong (6629d23)
- i18n: Improved the README (61715d2, 307b068, c9f8f4d)

## v0.9.0 (2021-05-19)

### BREAKING CHANGE

- i18n: Changed the fallback language from Japanese to English (5329723)
- i18n: Removed the `keyword` property (ece6516)

### Docs

- i18n: Improved the wording (caca48a)
- cli, core, i18n: Added the preface into README (f580f33)

### Refactors

- i18n: Internal refactored (f40017e)

### Chores

- i18n: added the dependencies: `lodash.merge` and updated some devDependencies (b048b85)
  - It will actually use it in the next update.

## v0.8.0 (2021-05-18)

### Docs

- Added and improved the localized wording. (9cbd682, 5ea1c94)
- Improved the keywords (1f81f6b)
- Added the badges to README (e53ad2f)
- Fixed the wronged URLs in issues templates (7ff1289)

## v0.7.0 (2021-05-17)

### Feature

- i18n: Improved the resource wording. (e146e86)
- i18n: Added the building the Markdown functions. (8efc11a)

## v0.6.0 (2021-05-16)

### Feature

- i18n: Available now the English resources partly. (1fff20b, 9bf1548)
- i18n: Improved the resource wording. (955df3a)

### Documents

- core: improved the wording for API documentation (18cf83b)

## v0.5.1 (2021-05-15)

### Refactored

- improved the keywords for npmjs. (2f16235)

### Chores

- Added the tests on Node.js v16. (38cc077)

## v0.5.0 (2021-05-14)

### BREAKING CHANGES

- cli: In default, it outputs the human-readable (Markdown) format. (46ea07b)
  - If you want the legacy outputs, you should specify a `--raw` option.

### Features

- cli: Added the outputs the human-readable (Markdown) format. (92b755a, 403d827, 8c7ab6f, c048f65)
- cli: Improved the help messages. (4c8a233)
- i18n: Added the `getDescriptionAsync()` API. (0a17e22, 66bb7cd)
- i18n: Added the `getLocale()` API. (ff57cd1)
- i18n: Added the new resources accessor, `lifeBase` API. (cb4d84a)
- i18n: Added the some type definitions. (189edb6, 1cef8af)

### Fixed

- i18n: Fixed the some type has wrong. (afcc5ea, 47005ca)

### Refactored

- Added and updated the dependencies. (cc84027, 4603e4c)
- i18n: Externalized the detection of the Node.js version for toggles in the detection method of locales. (b433f21)
- i18n: Removed the unused d.ts. (b433f21)
- i18n: Moved the internal functions. (f56e35f, ac34a8e, 5525dea)
- Linted. (5a23f41)

### Documents

- i18n: Improved the resources. (54cb5b9, 817ba0e, 602f656)
- i18n: Collapsed the results. (16c74b8)
- Other improves. (b6b55bb, 39d522a)

### Chores

- Added the CommitLint with Husky. (5331375, d31686a)
- Improved the ESLint rules. (f16d57e)
- Improved the npm-scripts for debugging. (e2626b6)
- Added the JSON Schema files. (0af2191)

## v0.4.1 (2021-04-26)

### Bugfix

- i18n: Fixed that type definition of the `motivation` instance has bullshit. (b85beb3)
- core: Avoided the problem that extra files mix in the distribution tarball. (5650bf6)

### Refactor

- core: unlinked the `ts-polyfill` (6f5d24d, 1802512)

### Tests

- i18n: Implemented the integration tests. (2c3075a, 182f3a7)

### Documents

- i18n: fixed the type definitions (7e8d4a1)

## v0.4.0 (2021-04-24)

### Features

- Implemented the APIs in an i18n library package. (3327399, 2dc004c)
  - It includes some refactorings. (1e6577e, 6f2ff62, d0eb33a)

### Chores

- Updated the devDependencies (3a2f0af)
- improved the ESLint settings (e8d1f67)
- improved the .gitignore (6e1957a)

### Documentation

- Improved the documentations (b02e983, 11fb79c)

## v0.3.2 (2021-04-19)

### Bugfix

- avoided the problem that extra files mix in the distribution tarball (c53fcf8)

### Documentation

- increased the require Node.js version (2f7b50a)

### Chores

- updated the lerna configurations (7381b78)

## v0.3.1 (2021-04-16)

This fix will fix the bug that the CLI version does not work.

### Bugfix

- Added a shebang. (0cd6329813bafa846cad4e8ebceafaf01cc88555)

## v0.3.0 (2021-04-16)

### BREAKING CHANGE

- No longer supported in Node.js < 12 (1a1748d, b509eab, 8a2f6f4)

### Chores

- Updated the dependencies. (544c0ab)
  - Migrated to new specifications of dependencies. (230213e)
- Fixed a bug where the linter did not work correctly via npm-scripts on Windows. (d78c9e5)
- Linted and minor refactored. (29b0b3a, 6f7b0ba)

## v0.2.1 (2020-12-26)

This update fixes a bug that caused GitHub Action builds to fail, with minor changes to the product code.

### Bugfix

- migrated the resource from YAML to JSON (7aed9ba)
  - The i18n project migrated from webpack to TSC, and it could no longer use the YAML loader.
- added a prepared task explicitly to CI script (fb8fb6d)
  - Because it did not works automatically in Node.js v15 (npm v7).

## v0.2.0 (2020-12-20)

### Summary

- Migrated the building method from webpack to TSC. In TypeScript, bundles can cause inconsistencies in importing core packages, and bundles may not offer much benefit when publishing as a package.
- Updated the dependencies version to the latest version.
- Improved the documentation.
- I tried to move to the npm workspaces architecture of npm v7, but I didn't know how to package and publish it, so I gave up.

### Refactor

- migrated from webpack to tsc (182370b)

### Documents

- improved the documents about contributing (93b820c)
- improved the documents about the overview (4e3ed1e)

### Chores

- improved a .gitignore (698c1bd)
- added the Node.js v15 to CI process (fe49a14)
- improve the CI script (c8c7f34)
- improved the Node.js version (58584ca)
- hoisted the dependencies (419e84a)
- updated the dependencies (2dd4602)
- migrated the settings for ESLint (d962c97)

## v0.1.5 (2020-09-27)

### Chores

- fixed the build fails (9f3ae8aeb91ae12abd2718d59bb80f437134812c)
- Updated the devDependencies. (dfb013d55ac93d7f1d77d291449a124629a9425c)

## v0.1.4 (2020-09-27)

### Features

- i18n: Implemented the resources. (f90cba47d8327f660f748effd7c08c0e555151d1, bd8f7ca2b7021c1a1deb604b10c8decc19f3b7db, 64481e7c774d95885cbbfbe6387bbdbc43aba5da, 9f3ae8aeb91ae12abd2718d59bb80f437134812c)

### Refactor

- Linted & Refactored. (074e40d6b880992c6108767553e1cd4cb00e246f, 9455ae980b4d0e05443daddebca91d84386cc2ab)

### Chores

- Updated and added the dependencies. (#11, 9cd336277057a64eaf5bd1f7570ad15d0acce9b0, 3f120a8712778e301e216563cb32087b32f4dda2, dfb013d55ac93d7f1d77d291449a124629a9425c)
- Updated the settings.
  - Linter (e7c870892944be6740ea4fcca0f71a3b7dde673f)
  - webpack (7b8e499a29e03914395aa0752055aa38df1f4b3e)

### Documentation

- Improvement of trivial expression. (5a6ad3b932f5be2678d1960e7f871e3de14bc8af)

## v0.1.3 (2020-06-11)

### Bugfix

- Fixed return bullshit value in getDetail function. (b9d965c)
  - Although it fixed mostly in the last update, I noticed that the value of the affinity property was not improved. 😵

## v0.1.2 (2020-06-11)

### Bugfix

- fixed return wrong value in getDetail function (1781570)
- an unnecessary file is included in the bundle (971cba7)

### Tests

- added a integration test for getDetail function (9714aac, 8273fad)

### Chores

- `npm run prepack` has crash (04f5025)

## v0.1.1 (2020-06-09)

### Bugfix

- an unnecessary file is included in the bundle (4af389a2041b4a57789446bc6a49847814a85966)
- updated the description (b11992356ff86fbfc03c9f2eed01b50f7316ef69)

### Documents

- improved the root documents (c1a48227ef648cccc58568b6a0aa74e32e087bd1)

### Chores

- imploved the CI scripts (710c54fa4a86ddf5e4c276c377546a69f28042b6)

## v0.1.0 (2020-06-07)

- Initial version.
