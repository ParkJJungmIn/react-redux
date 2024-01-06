import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'global': {}, // 빈 객체 또는 적절한 값으로 `global`을 정의
  },
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',  // 프록시할 대상 서버 주소
        changeOrigin: true,  // cross-origin 요청을 위해 origin 헤더 변경
        rewrite: (path) => path.replace(/^\/api/, '')  // 요청 경로 재작성 (옵션)
      }
    }
  }
})
