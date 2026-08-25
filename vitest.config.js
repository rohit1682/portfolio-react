import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config.js";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      setupFiles: ["./src/test/setup.js"],
      globals: true,
      css: { modules: { classNameStrategy: "non-scoped" } },
      coverage: {
        provider: "v8",
        include: ["src/**/*.{js,jsx}"],
        exclude: [
          "src/test/**",
          "src/main.jsx",
        ],
        thresholds: {
          statements: 95,
          branches: 95,
          functions: 95,
          lines: 95,
        },
      },
    },
  })
);
