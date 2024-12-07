import App from './App.js';

/** Entry point */
const rootElement = document.querySelector('#app');
if (rootElement) {
  new App(rootElement);
} else {
  console.error('Root element 404 or HTMLDivElement를 찾지 못했습니다.');
}
