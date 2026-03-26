import { describe, expect, it } from "vitest";

import { analyzeCron } from "@/lib/cron";

describe("analyzeCron", () => {
  it("supports quartz6 expressions", () => {
    const result = analyzeCron("0 */15 * * * ?", "UTC", "en", "quartz6");

    expect(result.isValid).toBe(true);

    if (result.isValid) {
      expect(result.syntaxLabel).toContain("Quartz 6");
      expect(result.nextRuns).toHaveLength(10);
    }
  });

  it("returns a readable error for invalid expressions", () => {
    const result = analyzeCron("bad cron", "UTC", "zh-CN");

    expect(result.isValid).toBe(false);

    if (!result.isValid) {
      expect(result.error.length).toBeGreaterThan(0);
    }
  });
});
