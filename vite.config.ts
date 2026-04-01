import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Change base to match your GitHub repo name for Pages deployment.
// e.g. if your repo URL is github.com/you/operation-big-butt  →  base: '/operation-big-butt/'
export default defineConfig({
  plugins: [react()],
  base: '/operation-big-butt/',
})
