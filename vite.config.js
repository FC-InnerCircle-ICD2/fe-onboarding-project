import { defineConfig } from "vite"

export default defineConfig({
  build: {
    outDir: "src", // 번들링 결과를 src 디렉토리에 저장
    rollupOptions: {
      input: "src/init.js", // 엔트리 포인트를 main.js로 설정
      output: {
        entryFileNames: "main.js", // 출력 파일명을 main.js로 설정
        assetFileNames: "[name].[ext]" // CSS 등 다른 에셋 파일 생성을 방지
      }
    },
    emptyOutDir: false, // 기존 src 폴더 내용 삭제 방지
    copyPublicDir: false // public 폴더의 에셋 복사 방지
  }
})
