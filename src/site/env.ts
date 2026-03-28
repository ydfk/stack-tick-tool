const siteEnv = (import.meta as ImportMeta & { env?: ImportMetaEnv }).env;
const runtimeProcess =
  typeof globalThis === "object"
    ? (globalThis as { process?: { env?: Record<string, string | undefined> } }).process
    : undefined;

export const appVersion = typeof __APP_VERSION__ !== "undefined" ? __APP_VERSION__ : "0.0.0";

export const icpRecordUrl = "https://beian.miit.gov.cn/";

export type UmamiConfig =
  | {
      mode: "tag";
      scriptTag: string;
    }
  | {
      mode: "fields";
      scriptUrl: string;
      websiteId: string;
      domains: string;
      hostUrl: string;
    };

function readEnvValue(value: string | undefined) {
  return value?.trim() || "";
}

export function getSiteIcpRecord() {
  return readEnvValue(siteEnv?.VITE_SITE_ICP_NO) || readEnvValue(runtimeProcess?.env?.VITE_SITE_ICP_NO);
}

export function getUmamiConfig() {
  const scriptTag =
    readEnvValue(siteEnv?.VITE_UMAMI_SCRIPT_TAG) || readEnvValue(runtimeProcess?.env?.VITE_UMAMI_SCRIPT_TAG);

  if (scriptTag) {
    return {
      mode: "tag",
      scriptTag,
    } satisfies UmamiConfig;
  }

  const scriptUrl =
    readEnvValue(siteEnv?.VITE_UMAMI_SCRIPT_URL) || readEnvValue(runtimeProcess?.env?.VITE_UMAMI_SCRIPT_URL);
  const websiteId =
    readEnvValue(siteEnv?.VITE_UMAMI_WEBSITE_ID) || readEnvValue(runtimeProcess?.env?.VITE_UMAMI_WEBSITE_ID);

  if (!scriptUrl || !websiteId) {
    return null;
  }

  const domains =
    readEnvValue(siteEnv?.VITE_UMAMI_DOMAINS) || readEnvValue(runtimeProcess?.env?.VITE_UMAMI_DOMAINS);
  const hostUrl =
    readEnvValue(siteEnv?.VITE_UMAMI_HOST_URL) || readEnvValue(runtimeProcess?.env?.VITE_UMAMI_HOST_URL);

  return {
    mode: "fields",
    scriptUrl,
    websiteId,
    domains,
    hostUrl,
  } satisfies UmamiConfig;
}
