/// <reference types="vitest" />
import { readFileSync } from "node:fs";
import path, { resolve } from "path";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const packageJson = JSON.parse(
    readFileSync(resolve(__dirname, "package.json"), "utf8"),
  ) as { version?: string };
  const env = loadEnv(mode, process.cwd());
  return {
    define: {
      __APP_VERSION__: JSON.stringify(packageJson.version || "0.0.0"),
    },
    plugins: [react()],
    build: {
      manifest: true,
      rollupOptions: {
        input: {
          homeZh: resolve(__dirname, "index.html"),
          homeEn: resolve(__dirname, "en/index.html"),
          toolsZh: resolve(__dirname, "tools/index.html"),
          toolsEn: resolve(__dirname, "en/tools/index.html"),
          cronZh: resolve(__dirname, "tools/cron-expression/index.html"),
          cronEn: resolve(__dirname, "en/tools/cron-expression/index.html"),
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: Number(env.VITE_PORT),
    },
    test: {
      environment: "jsdom",
      globals: true,
      include: ["src/lib/**/*.test.ts", "src/site/**/*.test.ts", "src/site/**/*.test.tsx"],
      exclude: [
        "**/node_modules/**",
        "**/.git/**",
        "**/.worktrees/**",
        "**/.tmp-react-starter/**",
      ],
      passWithNoTests: true,
      setupFiles: ["src/test/setup.ts"],
    },
  };
});
