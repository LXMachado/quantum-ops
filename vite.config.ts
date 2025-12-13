import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React ecosystem
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          
          // UI libraries
          'ui-vendor': [
            'lucide-react',
            '@dnd-kit/core',
            '@dnd-kit/sortable',
            '@dnd-kit/utilities'
          ],
          
          // Data visualization and calendar
          'data-vendor': [
            'recharts',
            'react-big-calendar',
            'date-fns'
          ],
          
          // State management
          'state-vendor': [
            '@reduxjs/toolkit',
            'react-redux'
          ]
        }
      }
    },
    // Increase chunk size warning limit to 1000kB for now
    chunkSizeWarningLimit: 1000
  }
})
