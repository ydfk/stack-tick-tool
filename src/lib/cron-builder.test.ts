import { describe, expect, it } from "vitest";

import { buildCronExpression, createBuilderState, getCronFieldMeanings } from "@/lib/cron-builder";
import { analyzeCron } from "@/lib/cron";

describe("buildCronExpression", () => {
  it("builds a linux default expression", () => {
    const state = createBuilderState("linux");

    expect(buildCronExpression(state)).toBe("0 0 * * *");
  });

  it("builds a quartz6 default expression", () => {
    const state = createBuilderState("quartz6");

    expect(buildCronExpression(state)).toBe("0 0 0 ? * *");
  });

  it("builds a quartz7 default expression", () => {
    const state = createBuilderState("quartz7");

    expect(buildCronExpression(state)).toBe("0 0 0 ? * * *");
  });

  it("returns readable field meanings", () => {
    const meanings = getCronFieldMeanings(createBuilderState("quartz6"), "zh-CN");

    expect(meanings.length).toBeGreaterThan(0);
    expect(meanings[0]?.meaning.length).toBeGreaterThan(0);
  });
});

describe("analyzeCron format detection", () => {
  it("rejects quartz expressions in linux mode", () => {
    const result = analyzeCron("0 0 9 ? * MON", "UTC", "zh-CN", "linux");

    expect(result.isValid).toBe(false);
  });

  it("rejects quartz7 expressions in quartz6 mode", () => {
    const result = analyzeCron("0 0 9 ? * MON *", "UTC", "zh-CN", "quartz6");

    expect(result.isValid).toBe(false);
  });
});
