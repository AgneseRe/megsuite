import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import replace from '@rollup/plugin-replace';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), 
    replace({
      __VITE_ENV__: JSON.stringify(process.env.NODE_ENV || 'development'),
    })
  ],
})
