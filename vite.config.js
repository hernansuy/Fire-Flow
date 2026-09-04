import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [{
    name: 'inject-paddleocr-module',
    transformIndexHtml(html) {
      return html.replace('<script src="app.js?v=2"></script>', '<script type="module" src="./paddle-ocr.js"></script><script src="./app.js?v=2"></script>');
    }
  }]
});
