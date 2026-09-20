import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: false,
    include: ['src/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.spec.ts'],
      // Baseline measured 2026-05-20 after #152 landed:
      // stmt 83% / branch 60% / func 100% / lines 83%.
      // The remaining uncovered code is the entry-point guard block
      // and version-fallback path, which only fire in a subprocess.
      // Thresholds are set 3–10 pp below the measured baseline.
      thresholds: {
        statements: 80,
        branches: 50,
        functions: 95,
        lines: 80,
      },
    },
  },
});
