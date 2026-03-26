/// <reference types="vite/client" />
/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />

declare const __APP_VERSION__: string;

interface ImportMetaEnv {
  VITE_PORT: number;
  VITE_USE_MOCK: string;
  VITE_PROXY_HOST: string;
  VITE_SITE_URL?: string;
  VITE_SITE_ICP_NO?: string;
}
