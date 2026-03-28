import { CronosExpression } from "cronosjs";
import cronstrue from "cronstrue";
import "cronstrue/locales/zh_CN";

import type { Locale } from "@/site/config";

export type CronFormat = "linux" | "quartz6" | "quartz7";

type AnalysisSuccess = {
  isValid: true;
  description: string;
  normalized: string;
  syntaxLabel: string;
  timezone: string;
  warnings: string[];
  nextRuns: string[];
};

type AnalysisFailure = {
  isValid: false;
  error: string;
};

export type CronAnalysis = AnalysisSuccess | AnalysisFailure;

export function getDefaultTimeZone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
}

export function analyzeCron(
  rawExpression: string,
  rawTimeZone: string,
  locale: Locale,
  preferredFormat?: CronFormat,
): CronAnalysis {
  const normalized = rawExpression.trim().replace(/\s+/g, " ");
  const timeZone = rawTimeZone.trim() || getDefaultTimeZone();

  if (!normalized) {
    return {
      isValid: false,
      error: locale === "zh-CN" ? "请输入 Cron 表达式。" : "Enter a cron expression.",
    };
  }

  try {
    const fields = normalized.split(" ").length;

    if (preferredFormat === "linux" && fields !== 5) {
      return {
        isValid: false,
        error: locale === "zh-CN" ? "Linux Cron 需要 5 位表达式。" : "Linux cron requires a 5-field expression.",
      };
    }

    if (preferredFormat === "quartz6" && fields !== 6) {
      return {
        isValid: false,
        error: locale === "zh-CN" ? "Quartz 6 位需要 6 位表达式。" : "Quartz 6-field requires a 6-field expression.",
      };
    }

    if (preferredFormat === "quartz7" && fields !== 7) {
      return {
        isValid: false,
        error: locale === "zh-CN" ? "Quartz 7 位需要 7 位表达式。" : "Quartz 7-field requires a 7-field expression.",
      };
    }

    const expression = CronosExpression.parse(normalized, {
      timezone: timeZone,
    });

    const formatter = new Intl.DateTimeFormat(locale === "zh-CN" ? "zh-CN" : "en-US", {
      dateStyle: "full",
      timeStyle: "long",
      timeZone,
    });

    return {
      isValid: true,
      description: cronstrue.toString(normalized, {
        locale: locale === "zh-CN" ? "zh_CN" : "en",
        dayOfWeekStartIndexZero: false,
        throwExceptionOnParseError: true,
        use24HourTimeFormat: true,
        verbose: true,
      }),
      normalized,
      syntaxLabel: detectSyntaxLabel(normalized, locale, preferredFormat),
      timezone: timeZone,
      warnings: expression.warnings.map(String),
      nextRuns: expression.nextNDates(new Date(), 10).map((date) => formatter.format(date)),
    };
  } catch (error) {
    return {
      isValid: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

function detectSyntaxLabel(expression: string, locale: Locale, preferredFormat?: CronFormat) {
  const fields = expression.split(" ").length;
  const format = preferredFormat ?? (fields === 5 ? "linux" : fields === 6 ? "quartz6" : "quartz7");

  if (format === "linux") {
    return locale === "zh-CN" ? "Linux 5 位" : "Linux 5-field";
  }

  if (format === "quartz7" || fields === 7) {
    return locale === "zh-CN" ? "Quartz 7 位" : "Quartz 7-field";
  }

  if (format === "quartz6" || fields === 6) {
    return locale === "zh-CN" ? "Quartz 6 位" : "Quartz 6-field";
  }

  if (fields === 5) {
    return locale === "zh-CN" ? "经典 5 位" : "Classic 5-field";
  }

  return locale === "zh-CN" ? `${fields} 段表达式` : `${fields}-field expression`;
}
