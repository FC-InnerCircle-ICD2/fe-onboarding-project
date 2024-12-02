import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: ["./vitest.setup.js"], // 설정 파일 경로 추가
    globals: true,
  },
});
