/// <reference types="vite/client" />
/// <reference types="unplugin-vue-router/client" />
// <reference types="vite-plugin-vue-layouts/client" />

interface ImportMetaEnv {
  readonly VITE_FRONTEND: string
  readonly VITE_BACKEND: string
  readonly VITE_BACKEND_PORT: number

  readonly VITE_REGEX_BACKEND: string
  readonly VITE_REGEX_ENDPOINT: string

  readonly VITE_PROD_IS: number
  readonly VITE_PROD_FRONTEND: string
  readonly VITE_ENDPOINT: string
  readonly VITE_BACKEND_ENDPOINT: string

  readonly VITE_VERSION: string
  readonly VITE_BUILD_COMMIT: string

  readonly VITE_SENTRY_AUTH_TOKEN: string
  readonly VITE_SENTRY_DSN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
