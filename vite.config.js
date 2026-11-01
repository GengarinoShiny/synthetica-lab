import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/synthetica-lab/', // ⚠️ Replace 'synthetica-lab' with your EXACT repository name
})
