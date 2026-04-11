import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/react-todo/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      base: '/react-todo/',
      scope: '/react-todo/',
      manifest: {
        name: 'Action Item List',
        short_name: 'Todo List',
        description: 'Personal todo list — manage tasks by priority and deadline',
        theme_color: '#5b6ba4',
        background_color: '#e8ecf5',
        display: 'standalone',
        orientation: 'portrait-primary',
        start_url: '/react-todo/',
        scope: '/react-todo/',
        icons: [
          {
            src: 'icons/icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any',
          },
          {
            src: 'media/todo-logo-img.jpg',
            sizes: '192x192',
            type: 'image/jpeg',
            purpose: 'any',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,woff2}'],
        navigateFallback: '/react-todo/index.html',
        runtimeCaching: [
          {
            // Cache Airtable API with network-first (always try fresh data)
            urlPattern: /^https:\/\/api\.airtable\.com\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'airtable-api',
              networkTimeoutSeconds: 10,
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60, // 1 hour fallback if offline
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Cache Google Fonts permanently
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
})
