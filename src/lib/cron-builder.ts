import type { Locale } from "@/site/config";
import type { CronFormat } from "@/lib/cron";

export type CronWeekday = "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";
export type CronFieldKey = "second" | "minute" | "hour" | "dayOfMonth" | "month" | "dayOfWeek" | "year";
export type CronFieldMode = "wildcard" | "unspecified" | "range" | "step" | "specific";

export type CronFieldState = {
  mode: CronFieldMode;
  value: string;
  start: string;
  end: string;
  step: string;
};

export type CronBuilderState = {
  format: CronFormat;
  fields: Record<CronFieldKey, CronFieldState>;
};

export type CronFieldMeaning = {
  key: CronFieldKey;
  label: string;
  token: string;
  meaning: string;
};

const weekdayLabels: Record<CronWeekday, Record<Locale, string>> = {
  MON: { "zh-CN": "周一", en: "Monday" },
  TUE: { "zh-CN": "周二", en: "Tuesday" },
  WED: { "zh-CN": "周三", en: "Wednesday" },
  THU: { "zh-CN": "周四", en: "Thursday" },
  FRI: { "zh-CN": "周五", en: "Friday" },
  SAT: { "zh-CN": "周六", en: "Saturday" },
  SUN: { "zh-CN": "周日", en: "Sunday" },
};

const visibleFieldsByFormat: Record<CronFormat, CronFieldKey[]> = {
  linux: ["minute", "hour", "dayOfMonth", "month", "dayOfWeek"],
  quartz6: ["second", "minute", "hour", "dayOfMonth", "month", "dayOfWeek"],
  quartz7: ["second", "minute", "hour", "dayOfMonth", "month", "dayOfWeek", "year"],
};

export function createDefaultBuilderState(): CronBuilderState {
  return createBuilderState("linux");
}

export function createBuilderState(format: CronFormat): CronBuilderState {
  return {
    format,
    fields: {
      second: createSpecificField("0"),
      minute: createSpecificField("0"),
      hour: createSpecificField("0"),
      dayOfMonth: format.startsWith("quartz") ? createUnspecifiedField() : createWildcardField(),
      month: createWildcardField(),
      dayOfWeek: createWildcardField(),
      year: format === "quartz7" ? createWildcardField() : createSpecificField(""),
    },
  };
}

export function getVisibleFieldKeys(format: CronFormat) {
  return visibleFieldsByFormat[format];
}

export function getCronFormatOptions(locale: Locale) {
  return [
    {
      value: "linux",
      label: locale === "zh-CN" ? "Linux 5 位" : "Linux 5-field",
      description: locale === "zh-CN" ? "经典 crontab，分 时 日 月 周。" : "Classic crontab with minute hour day month weekday.",
    },
    {
      value: "quartz6",
      label: locale === "zh-CN" ? "Quartz 6 位" : "Quartz 6-field",
      description: locale === "zh-CN" ? "秒 分 时 日 月 周。" : "Second minute hour day month weekday.",
    },
    {
      value: "quartz7",
      label: locale === "zh-CN" ? "Quartz 7 位" : "Quartz 7-field",
      description: locale === "zh-CN" ? "在 6 位基础上增加年份。" : "Adds a year field on top of Quartz 6-field.",
    },
  ] satisfies Array<{ value: CronFormat; label: string; description: string }>;
}

export function getCronWeekdayOptions(locale: Locale) {
  return (Object.keys(weekdayLabels) as CronWeekday[]).map((value) => ({
    value,
    label: weekdayLabels[value][locale],
  }));
}

export function getCronFieldModeOptions(field: CronFieldKey, format: CronFormat, locale: Locale) {
  const label = getFieldLabel(field, locale);
  const options: Array<{ value: CronFieldMode; label: string }> = [
    {
      value: "wildcard",
      label: locale === "zh-CN" ? `每${label}` : `Every ${label.toLowerCase()}`,
    },
    {
      value: "specific",
      label: locale === "zh-CN" ? `指定${label}` : `Specific ${label.toLowerCase()}`,
    },
    {
      value: "range",
      label: locale === "zh-CN" ? `${label}周期区间` : `${label} range`,
    },
    {
      value: "step",
      label: locale === "zh-CN" ? `从 X${label}开始，每隔 X${label}执行一次` : `Start at X ${label.toLowerCase()}, every X ${label.toLowerCase()}`,
    },
  ];

  if ((format === "quartz6" || format === "quartz7") && (field === "dayOfMonth" || field === "dayOfWeek")) {
    options.splice(1, 0, {
      value: "unspecified",
      label: locale === "zh-CN" ? `${label}不指定` : `${label} not specified`,
    });
  }

  return options;
}

export function buildCronExpression(state: CronBuilderState) {
  return getVisibleFieldKeys(state.format)
    .map((key) => renderFieldValue(key, state.fields[key]))
    .filter((value) => value !== "")
    .join(" ");
}

export function getCronFieldMeanings(state: CronBuilderState, locale: Locale): CronFieldMeaning[] {
  const expression = buildCronExpression(state);
  const tokens = expression.split(" ");

  return getVisibleFieldKeys(state.format).map((key, index) => ({
    key,
    label: getFieldLabel(key, locale),
    token: tokens[index] ?? "",
    meaning: describeField(key, state.fields[key], locale),
  }));
}

function createWildcardField(): CronFieldState {
  return { mode: "wildcard", value: "*", start: "0", end: "1", step: "1" };
}

function createUnspecifiedField(): CronFieldState {
  return { mode: "unspecified", value: "?", start: "0", end: "1", step: "1" };
}

function createSpecificField(value: string): CronFieldState {
  return { mode: "specific", value, start: value, end: value, step: "1" };
}

function renderFieldValue(field: CronFieldKey, state: CronFieldState) {
  if (field === "year" && !state.value && state.mode === "specific") {
    return "";
  }

  if (state.mode === "wildcard") {
    return "*";
  }

  if (state.mode === "unspecified") {
    return "?";
  }

  if (state.mode === "specific") {
    return state.value;
  }

  if (state.mode === "range") {
    return `${state.start}-${state.end}`;
  }

  return `${state.start}/${state.step}`;
}

function getFieldLabel(field: CronFieldKey, locale: Locale) {
  const labels: Record<CronFieldKey, Record<Locale, string>> = {
    second: { "zh-CN": "秒", en: "Second" },
    minute: { "zh-CN": "分", en: "Minute" },
    hour: { "zh-CN": "时", en: "Hour" },
    dayOfMonth: { "zh-CN": "日", en: "Day of month" },
    month: { "zh-CN": "月", en: "Month" },
    dayOfWeek: { "zh-CN": "周", en: "Day of week" },
    year: { "zh-CN": "年", en: "Year" },
  };

  return labels[field][locale];
}

function describeField(field: CronFieldKey, state: CronFieldState, locale: Locale) {
  const label = getFieldLabel(field, locale);

  if (state.mode === "wildcard") {
    return locale === "zh-CN"
      ? `${label}使用通配符，表示任意值都匹配。`
      : `${label} uses a wildcard, so every value matches.`;
  }

  if (state.mode === "unspecified") {
    return locale === "zh-CN"
      ? `${label}不指定，通常交给另一个互斥字段控制。`
      : `${label} is not specified and is controlled by the paired field.`;
  }

  if (state.mode === "specific") {
    const value = field === "dayOfWeek" ? weekdayLabels[state.value as CronWeekday]?.[locale] ?? state.value : state.value;
    return locale === "zh-CN"
      ? `${label}固定为 ${value || "空"}。`
      : `${label} is fixed at ${value || "empty"}.`;
  }

  if (state.mode === "range") {
    return locale === "zh-CN"
      ? `${label}使用区间 ${state.start}-${state.end}。`
      : `${label} uses the range ${state.start}-${state.end}.`;
  }

  return locale === "zh-CN"
    ? `${label}从 ${state.start} 开始，每隔 ${state.step} 个单位循环一次。`
    : `${label} starts at ${state.start} and repeats every ${state.step} units.`;
}
