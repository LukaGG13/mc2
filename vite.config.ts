import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      workbox: {
        cleanupOutdatedCaches: true,
        navigateFallback: '/index.html',
        navigateFallbackAllowlist: [
          new RegExp('^(?!/__).*')
        ],
        runtimeCaching: [
          {
            urlPattern: /^\/__\//,
            handler: 'NetworkOnly',
          },
        ]
      }
    })

  ],
})
