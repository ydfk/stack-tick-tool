import { afterEach, describe, expect, it, vi } from "vitest";

import { getBrowserLocale } from "@/site/runtime";

const originalNavigator = globalThis.navigator;

describe("getBrowserLocale", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("优先使用浏览器语言列表中的首个中文语言", () => {
    vi.stubGlobal("navigator", {
      ...originalNavigator,
      language: "en-US",
      languages: ["zh-CN", "en-US"],
    });

    expect(getBrowserLocale()).toBe("zh-CN");
  });

  it("当首个可识别语言是英文时返回英文", () => {
    vi.stubGlobal("navigator", {
      ...originalNavigator,
      language: "ja-JP",
      languages: ["ja-JP", "en-US"],
    });

    expect(getBrowserLocale()).toBe("en");
  });
});
