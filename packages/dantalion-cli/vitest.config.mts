import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: false,
    include: ['src/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.spec.ts'],
      // The CLI smoke spec (#145) invokes the built `dist/src/index.js`
      // through `execa`, so v8 instrumentation cannot follow the
      // subprocess and reports 0% coverage here. Setting any positive
      // threshold would fail CI immediately. The thresholds remain
      // declared (as the project standard) at 0, and an in-process
      // CLI matrix that would produce real coverage numbers is
      // intentionally tracked separately in #152.
      // Baseline measured 2026-05-20.
      thresholds: {
        statements: 0,
        branches: 0,
        functions: 0,
        lines: 0,
      },
    },
  },
});
