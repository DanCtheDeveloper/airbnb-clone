import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// vite.config.js
module.exports = {
  server: {
    proxy: {
      // When your frontend makes requests to /api,
      // Vite will proxy the request to the backend server.
      '/api': 'http://localhost:4000', // Replace with your backend URL
    },
  },
};
