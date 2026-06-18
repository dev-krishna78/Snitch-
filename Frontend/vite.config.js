import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],

  // proxy setup to solve the cors error 
  server:{
    proxy:{
      "/api":{   // /api request forward on http://local:3000 by vite server 
        target: "http://localhost:3000",
        changeOrigin: true,
        Secure: false // used for securety 
      }
    }
  }
})
