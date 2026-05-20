import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: false,
    include: ['src/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.spec.ts', 'src/tests/**'],
      // Baseline measured 2026-05-20 after #145–#149 landed:
      // stmt 100%, branch 95.4%, func 100%, lines 100%.
      // Thresholds set 2–5 pp below baseline to allow modest refactor
      // churn while catching real regressions.
      thresholds: {
        statements: 98,
        branches: 91,
        functions: 98,
        lines: 98,
      },
    },
  },
});
