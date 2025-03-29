/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_TMDB_API_KEY: string;
    readonly VITE_TMDB_ACCESS_TOKEN?: string; // si alguna vez usás el token v4
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  