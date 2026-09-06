/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Origine de l'API en production. Vide en dev : le proxy Vite s'en charge. */
  readonly VITE_API_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
