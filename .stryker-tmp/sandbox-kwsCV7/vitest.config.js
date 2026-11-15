// @ts-nocheck
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/unit/**/*.test.js'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.js'],
      reporter: ['text', 'json-summary', 'html'],
      thresholds: { lines: 90, branches: 85 },
    },
  },
});
