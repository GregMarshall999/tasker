/// <reference types="vite/client" />
/// <reference types="vite-plugin-vue-layouts-next/client" />

interface ImportMetaEnv {
  /** Base URL for JSON Server via Vite dev proxy (e.g. `/api`). */
  readonly VITE_API_BASE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
