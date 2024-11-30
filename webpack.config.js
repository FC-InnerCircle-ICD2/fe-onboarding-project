const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  mode: "development", // 개발 모드
  entry: "./src/index.ts", // 진입점 파일
  output: {
    filename: "bundle.js", // 번들 파일 이름
    path: path.resolve(__dirname, "dist"), // 번들 출력 경로
    publicPath: "/", // 정적 파일 경로
  },
  devtool: "source-map", // 디버깅용 소스맵 생성
  devServer: {
    static: path.join(__dirname, "dist"), // 정적 파일 제공 경로
    port: 3000, // 개발 서버 포트
    open: true, // 서버 시작 시 브라우저 자동 열기
    hot: true, // HMR 활성화
    liveReload: true, // HTML 변경 시 브라우저 새로고침 활성화
    watchFiles: ["src/**/*.html"], // HTML 파일 변경 감지
    client: {
      overlay: true, // 컴파일 오류 시 브라우저에 오버레이 표시
    },
  },
  resolve: {
    extensions: [".ts", ".js"], // 처리할 파일 확장자
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // .ts 파일을 처리
        use: "ts-loader",
        exclude: /node_modules/, // node_modules는 제외
      },
      {
        test: /\.css$/, // .css 파일을 처리
        use: [MiniCssExtractPlugin.loader, "css-loader"], // MiniCssExtractPlugin 사용
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), // dist 디렉토리 정리
    new HtmlWebpackPlugin({
      template: "./src/index.html", // HTML 템플릿 파일
    }),
    new MiniCssExtractPlugin({
      filename: "style.css", // CSS 파일 이름
    }),
  ],
};
