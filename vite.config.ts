import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifestFilename: 'manifest.webmanifest',
      injectRegister: 'auto',
      workbox: {
        maximumFileSizeToCacheInBytes: 100 * 1024 * 1024, // 5MB
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
        ],
      },
      includeAssets: ['zlatko2_web_model/*', '/icon/*', 'manifest.webmanifest'],
    })

  ],
})
