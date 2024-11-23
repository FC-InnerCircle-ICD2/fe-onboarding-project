const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js", // 엔트리 파일
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"), // 빌드 디렉토리
    clean: true, // 기존 파일 제거
  },
  mode: "development", // 개발 모드
  module: {
    rules: [
      {
        test: /\.css$/, // CSS 파일 처리
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html", // HTML 템플릿 파일
    }),
  ],
  devServer: {
    static: "./dist", // 개발 서버의 정적 파일 제공 디렉토리
    port: 3000, // 개발 서버 포트
    open: true, // 브라우저 자동 열기
  },
};
