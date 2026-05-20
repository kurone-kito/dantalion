import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: false,
    include: ['src/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.spec.ts'],
      // After #152 landed, the in-process unit specs (detail.spec,
      // personality.spec, index.unit.spec, render/*.spec) lift v8
      // coverage off the floor:
      //   stmt 83% / branch 60% / func 100% / lines 83% (2026-05-20)
      // The remaining uncovered code is the entry-point guard block
      // and the version-fallback path, both of which only fire when
      // the module is invoked as the program (covered by the execa
      // smoke spec, but v8 doesn't follow into subprocesses). Set
      // thresholds 3–10 pp below the measured baseline.
      thresholds: {
        statements: 80,
        branches: 50,
        functions: 95,
        lines: 80,
      },
    },
  },
});
