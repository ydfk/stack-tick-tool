const siteEnv = (import.meta as ImportMeta & { env?: ImportMetaEnv }).env;
const runtimeProcess =
  typeof globalThis === "object"
    ? (globalThis as { process?: { env?: Record<string, string | undefined> } }).process
    : undefined;

export const appVersion = typeof __APP_VERSION__ !== "undefined" ? __APP_VERSION__ : "0.0.0";

export const icpRecordUrl = "https://beian.miit.gov.cn/";

export function getSiteIcpRecord() {
  return siteEnv?.VITE_SITE_ICP_NO?.trim() || runtimeProcess?.env?.VITE_SITE_ICP_NO?.trim() || "";
}
