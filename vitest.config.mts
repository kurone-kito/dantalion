import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      include: ['packages/*/src/**/*.ts'],
      exclude: ['**/*.spec.ts', 'packages/dantalion-core/src/tests/**'],
      thresholds: {
        // Baseline measured 2026-05-20 after #145–#149 landed.
        '**/dantalion-core/src/**': {
          statements: 98,
          branches: 91,
          functions: 98,
          lines: 98,
        },
        // Baseline measured 2026-05-20 after #149 landed.
        '**/dantalion-i18n/src/**': {
          statements: 98,
          branches: 91,
          functions: 98,
          lines: 98,
        },
        // Baseline measured 2026-05-20 after #152 landed.
        // The entry-point guard and unknown-version fallback remain partially
        // uncovered. Normal version reads run in-process, but the fallback
        // sentinel is reached only when both package paths fail.
        '**/dantalion-cli/src/**': {
          statements: 80,
          branches: 50,
          functions: 95,
          lines: 80,
        },
      },
    },
    projects: ['packages/*'],
  },
});
