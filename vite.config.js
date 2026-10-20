import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Sandbox-only preview allowance: extend the dev-server host allowlist with the
// rotating sandbox host domain when the platform preview flag is present.
// With BASE44_PREVIEW_MODE unset (or any other value) the original
// default behavior is preserved.
const previewHosts =
  process.env.BASE44_PREVIEW_MODE === '1' && process.env.BASE44_SANDBOX_HOST_DOMAIN
    ? ['.' + process.env.BASE44_SANDBOX_HOST_DOMAIN]
    : []

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    strictPort: true,
    allowedHosts: previewHosts.length ? previewHosts : undefined,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
})
