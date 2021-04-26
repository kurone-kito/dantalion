<!-- markdownlint-disable MD024 -->

# Changelog

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
