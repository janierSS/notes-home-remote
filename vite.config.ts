import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), federation({
    name: 'notesHomeRemote',
    filename: 'remoteEntry.js',
    remotes: {},
    exposes: {
      './NotesHome': './src/components/NotesHome'
    },
    shared: ['react', 'react-dom', 'react-redux', '@reduxjs/toolkit']
  })],
  server: {
    open: true,
    port: 5000
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
})
