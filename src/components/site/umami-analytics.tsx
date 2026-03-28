import { useEffect } from "react";

import { getUmamiConfig } from "@/site/env";

const umamiScriptSelector = 'script[data-stacktick-umami="true"]';

export function UmamiAnalytics() {
  const config = getUmamiConfig();

  useEffect(() => {
    if (!config || typeof document === "undefined") {
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>(umamiScriptSelector);

    if (existingScript) {
      return;
    }

    let script: HTMLScriptElement | null;

    if (config.mode === "tag") {
      script = createScriptFromTag(config.scriptTag);
    } else {
      script = createScriptFromConfig(config);
    }

    if (!script) {
      return;
    }

    script.dataset.stacktickUmami = "true";

    document.head.appendChild(script);
  }, [config]);

  return null;
}

function createScriptFromTag(scriptTag: string) {
  const parsedDocument = new DOMParser().parseFromString(scriptTag, "text/html");
  const sourceScript = parsedDocument.querySelector("script");

  if (!sourceScript?.src) {
    return null;
  }

  const script = document.createElement("script");

  for (const attribute of sourceScript.attributes) {
    script.setAttribute(attribute.name, attribute.value);
  }

  return script;
}

function createScriptFromConfig(config: {
  scriptUrl: string;
  websiteId: string;
  domains: string;
  hostUrl: string;
}) {
  const script = document.createElement("script");
  script.defer = true;
  script.src = config.scriptUrl;
  script.dataset.websiteId = config.websiteId;

  if (config.domains) {
    script.dataset.domains = config.domains;
  }

  if (config.hostUrl) {
    script.dataset.hostUrl = config.hostUrl;
  }

  return script;
}
