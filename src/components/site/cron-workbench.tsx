import React from "react";
import { useDeferredValue, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { CheckCircle2, Copy, Wand2 } from "lucide-react";

import { useSiteCopy } from "@/i18n/use-site-copy";
import {
  buildCronExpression,
  createBuilderState,
  createDefaultBuilderState,
  getCronFieldMeanings,
  getCronFieldModeOptions,
  getCronFormatOptions,
  getCronWeekdayOptions,
  getVisibleFieldKeys,
  type CronBuilderState,
  type CronFieldKey,
  type CronFieldMode,
} from "@/lib/cron-builder";
import { analyzeCron, getDefaultTimeZone, type CronFormat } from "@/lib/cron";
import type { Locale } from "@/site/config";

type CronWorkbenchProps = {
  locale: Locale;
};

type WorkbenchMode = "builder" | "parser";

export function CronWorkbench({ locale }: CronWorkbenchProps) {
  const copy = useSiteCopy().cronTool;
  const [mode, setMode] = useState<WorkbenchMode>("builder");
  const timeZone = getDefaultTimeZone();

  return (
    <section className="surface-card rounded-[1.6rem] border border-white/70 p-3 sm:p-4">
      <div className="space-y-2 border-b border-border/80 pb-3">
        <div className="flex flex-wrap gap-1.5">
          <ModeButton active={mode === "builder"} label={copy.builderModeLabel} onClick={() => setMode("builder")} />
          <ModeButton active={mode === "parser"} label={copy.parserModeLabel} onClick={() => setMode("parser")} />
        </div>
        <p className="text-xs text-muted-foreground">{copy.subtitle}</p>
      </div>

      <div className="pt-3">
        {mode === "builder" ? (
          <BuilderPanel copy={copy} locale={locale} timeZone={timeZone} />
        ) : (
          <ParserPanel copy={copy} locale={locale} timeZone={timeZone} />
        )}
      </div>
    </section>
  );
}

type CronCopy = ReturnType<typeof useSiteCopy>["cronTool"];

type BuilderPanelProps = {
  copy: CronCopy;
  locale: Locale;
  timeZone: string;
};

function BuilderPanel({ copy, locale, timeZone }: BuilderPanelProps) {
  const [state, setState] = useState(createDefaultBuilderState);
  const [activeField, setActiveField] = useState<CronFieldKey>("minute");
  const [copied, setCopied] = useState(false);
  const ui = getUiText(locale);
  const generatedExpression = buildCronExpression(state);
  const [manualExpression, setManualExpression] = useState(generatedExpression);
  const [isManualOverride, setIsManualOverride] = useState(false);
  const expression = isManualOverride ? manualExpression : generatedExpression;
  const analysis = analyzeCron(expression, timeZone, locale, state.format);
  const fieldMeanings = getCronFieldMeanings(state, locale);
  const formatOptions = getCronFormatOptions(locale);
  const visibleFields = getVisibleFieldKeys(state.format);
  const currentField = visibleFields.includes(activeField) ? activeField : visibleFields[0] ?? "minute";

  useEffect(() => {
    if (!isManualOverride) {
      setManualExpression(generatedExpression);
    }
  }, [generatedExpression, isManualOverride]);

  const applyFormat = (format: CronFormat) => {
    const nextState = createBuilderState(format);
    const nextVisibleFields = getVisibleFieldKeys(nextState.format);

    setState(nextState);
    setActiveField(nextVisibleFields[0] ?? "minute");
  };

  const updateFieldMode = (key: CronFieldKey, mode: CronFieldMode) => {
    setState((current) => ({
      ...current,
      fields: {
        ...current.fields,
        [key]: createFieldState(key, mode),
      },
    }));
  };

  const updateFieldValue = (key: CronFieldKey, fieldKey: "value" | "start" | "end" | "step", value: string) => {
    setState((current) => ({
      ...current,
      fields: {
        ...current.fields,
        [key]: {
          ...current.fields[key],
          [fieldKey]: value,
        },
      },
    }));
  };

  const toggleSpecificValue = (key: CronFieldKey, nextValue: string) => {
    setState((current) => {
      const selected = current.fields[key].value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
      const exists = selected.includes(nextValue);
      const nextSelected = exists ? selected.filter((item) => item !== nextValue) : [...selected, nextValue];
      const normalized = nextSelected.length > 0 ? nextSelected.join(",") : nextValue;

      return {
        ...current,
        fields: {
          ...current.fields,
          [key]: {
            ...current.fields[key],
            value: normalized,
          },
        },
      };
    });
  };

  return (
    <div className="space-y-3">
      <ChoiceField
        label={ui.formatLabel}
        value={state.format}
        options={formatOptions}
        onChange={(value) => applyFormat(value as CronFormat)}
      />

      <ResultCard label={ui.fieldTabsLabel}>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-1.5">
            {visibleFields.map((field) => (
              <button
                key={field}
                className={`cursor-pointer rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                  currentField === field
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-white/75 text-foreground hover:border-primary/35 hover:text-primary"
                }`}
                type="button"
                onClick={() => setActiveField(field)}
              >
                {getFieldLabel(field, locale)}
              </button>
            ))}
          </div>
          <FieldEditor
            field={currentField}
            fieldState={state.fields[currentField]}
            format={state.format}
            locale={locale}
            onModeChange={updateFieldMode}
            onValueChange={updateFieldValue}
            onSpecificValueToggle={toggleSpecificValue}
          />
        </div>
      </ResultCard>

      <ResultCard
        action={
          <button
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition hover:opacity-90"
            type="button"
            onClick={() => handleCopy(expression, setCopied)}
          >
            <Copy className="h-4 w-4" />
            {copied ? copy.copiedButton : copy.copyButton}
          </button>
        }
        label={copy.builderExpressionLabel}
      >
        <div className="space-y-3">
          <div className="rounded-[1rem] border border-primary/25 bg-primary/[0.08] p-3 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/80">
                {locale === "zh-CN" ? "当前生成的 Cron 表达式" : "Current generated cron expression"}
              </p>
              {isManualOverride ? (
                <button
                  className="cursor-pointer rounded-full border border-primary/20 bg-white/85 px-2.5 py-1 text-[11px] font-semibold text-primary transition hover:border-primary/40"
                  type="button"
                  onClick={() => {
                    setIsManualOverride(false);
                    setManualExpression(generatedExpression);
                  }}
                >
                  {ui.resetExpressionLabel}
                </button>
              ) : null}
            </div>
            <input
              className="mt-2 h-12 w-full rounded-[0.9rem] border border-primary/15 bg-white/90 px-3 font-mono text-base font-semibold text-primary shadow-sm transition focus:border-primary/40 focus:outline-none sm:text-lg"
              spellCheck={false}
              type="text"
              value={expression}
              onChange={(event) => {
                const nextValue = event.target.value;
                const normalizedManual = nextValue.trim().replace(/\s+/g, " ");
                const normalizedGenerated = generatedExpression.trim().replace(/\s+/g, " ");

                setManualExpression(nextValue);
                setIsManualOverride(normalizedManual !== normalizedGenerated);
              }}
            />
            <div className="mt-3 flex flex-wrap gap-1.5">
              {expression.split(" ").map((part, index) => (
                <span
                  key={`${part}-${index}`}
                  className="rounded-full border border-primary/15 bg-white/85 px-2.5 py-1 text-[11px] font-semibold text-primary shadow-sm"
                >
                  {part}
                </span>
              ))}
            </div>
            {isManualOverride ? <p className="mt-2 text-[11px] text-primary/80">{ui.manualOverrideHint}</p> : null}
          </div>
          {isManualOverride ? (
            <p className="text-[11px] text-muted-foreground">{ui.manualOverrideTableHint}</p>
          ) : (
            <ExpressionFieldTable locale={locale} meanings={fieldMeanings} />
          )}
        </div>
      </ResultCard>

      <RunPreview copy={copy} analysis={analysis} />
      {analysis.isValid ? null : <ErrorCard copy={copy} message={analysis.error} />}
    </div>
  );
}

type ParserPanelProps = {
  copy: CronCopy;
  locale: Locale;
  timeZone: string;
};

function ParserPanel({ copy, locale, timeZone }: ParserPanelProps) {
  const [format, setFormat] = useState<CronFormat>("linux");
  const [expression, setExpression] = useState("*/15 * * * *");
  const [copied, setCopied] = useState(false);
  const deferredExpression = useDeferredValue(expression);
  const analysis = analyzeCron(deferredExpression, timeZone, locale, format);
  const ui = getUiText(locale);

  return (
    <div className="space-y-3">
      <ChoiceField
        label={ui.formatLabel}
        value={format}
        options={getCronFormatOptions(locale)}
        onChange={(value) => setFormat(value as CronFormat)}
      />

      <ResultCard
        action={
          <button
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border bg-white/75 px-3 py-1.5 text-xs font-semibold text-foreground transition hover:border-primary/35 hover:text-primary"
            type="button"
            onClick={() => handleCopy(expression, setCopied)}
          >
            <Copy className="h-4 w-4" />
            {copied ? copy.copiedButton : copy.copyButton}
          </button>
        }
        label={copy.expressionLabel}
      >
        <textarea
          className="min-h-28 w-full rounded-[1.1rem] border border-border bg-[var(--input)] px-3 py-2.5 text-sm shadow-sm transition focus:border-primary/40 focus:outline-none"
          placeholder={copy.expressionPlaceholder}
          spellCheck={false}
          value={expression}
          onChange={(event) => setExpression(event.target.value)}
        />
      </ResultCard>

      <div className="grid gap-2 sm:grid-cols-2">
        <MetaCard label={ui.formatLabel} value={analysis.isValid ? analysis.syntaxLabel : getFormatLabel(format, locale)} />
        <MetaCard
          label={copy.validationLabel}
          value={analysis.isValid ? copy.validText : copy.invalidText}
          positive={analysis.isValid}
        />
      </div>

      <RunPreview copy={copy} analysis={analysis} />
      {analysis.isValid ? null : <ErrorCard copy={copy} message={analysis.error} />}
    </div>
  );
}

type FieldEditorProps = {
  field: CronFieldKey;
  fieldState: CronBuilderState["fields"][CronFieldKey];
  format: CronFormat;
  locale: Locale;
  onModeChange: (key: CronFieldKey, mode: CronFieldMode) => void;
  onValueChange: (key: CronFieldKey, fieldKey: "value" | "start" | "end" | "step", value: string) => void;
  onSpecificValueToggle: (key: CronFieldKey, value: string) => void;
};

function FieldEditor({
  field,
  fieldState,
  format,
  locale,
  onModeChange,
  onValueChange,
  onSpecificValueToggle,
}: FieldEditorProps) {
  const ui = getUiText(locale);
  const modeOptions = getCronFieldModeOptions(field, format, locale);
  const selectedValues = fieldState.value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <div className="space-y-2">
      {(field === "dayOfMonth" || field === "dayOfWeek") && (format === "quartz6" || format === "quartz7") ? (
        <p className="text-[11px] text-muted-foreground">{ui.unspecifiedHint}</p>
      ) : null}
      {modeOptions.map((option) => {
        const active = fieldState.mode === option.value;

        return (
          <button
            key={option.value}
            className={`w-full cursor-pointer rounded-[1rem] border px-3 py-2 text-left transition ${
              active ? "border-primary bg-primary/6" : "border-border/80 bg-white/70 hover:border-primary/30"
            }`}
            type="button"
            onClick={() => onModeChange(field, option.value as CronFieldMode)}
          >
            <div className="flex items-center gap-2">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  active ? "bg-primary" : "border border-border bg-transparent"
                }`}
              />
              <span className="text-xs font-semibold text-foreground">{option.label}</span>
            </div>
            {active && option.value === "specific" ? (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {getFieldValueChipOptions(field, locale).map((item) => {
                  const checked = selectedValues.includes(item.value);

                  return (
                    <span
                      key={item.value}
                      className={`inline-flex rounded-full border px-2 py-1 text-[11px] font-medium ${
                        checked
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-white text-foreground"
                      }`}
                      onClick={(event) => {
                        event.stopPropagation();
                        onSpecificValueToggle(field, item.value);
                      }}
                    >
                      {item.label}
                    </span>
                  );
                })}
              </div>
            ) : null}
            {active && option.value === "range" ? (
              <div className="mt-2 grid gap-2 md:grid-cols-2">
                <ValueInputField
                  label={ui.startLabel}
                  field={field}
                  locale={locale}
                  value={fieldState.start}
                  onChange={(value) => onValueChange(field, "start", value)}
                />
                <ValueInputField
                  label={ui.endLabel}
                  field={field}
                  locale={locale}
                  value={fieldState.end}
                  onChange={(value) => onValueChange(field, "end", value)}
                />
              </div>
            ) : null}
            {active && option.value === "step" ? (
              <div className="mt-2 grid gap-2 md:grid-cols-2">
                <ValueInputField
                  label={ui.startLabel}
                  field={field}
                  locale={locale}
                  value={fieldState.start}
                  onChange={(value) => onValueChange(field, "start", value)}
                />
                <ValueInputField
                  label={ui.stepLabel}
                  field={field}
                  locale={locale}
                  value={fieldState.step}
                  onChange={(value) => onValueChange(field, "step", value)}
                  stepOnly
                />
              </div>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

type ExpressionFieldTableProps = {
  locale: Locale;
  meanings: ReturnType<typeof getCronFieldMeanings>;
};

function ExpressionFieldTable({ locale, meanings }: ExpressionFieldTableProps) {
  return (
    <div className="overflow-x-auto rounded-[0.9rem] border border-border/80 bg-white/70">
      <table className="min-w-full text-left text-xs">
        <thead>
          <tr className="border-b border-border/70">
            <th className="px-3 py-2 font-semibold text-muted-foreground">
              {locale === "zh-CN" ? "字段" : "Field"}
            </th>
            <th className="px-3 py-2 font-semibold text-muted-foreground">
              {locale === "zh-CN" ? "值" : "Value"}
            </th>
            <th className="px-3 py-2 font-semibold text-muted-foreground">
              {locale === "zh-CN" ? "说明" : "Meaning"}
            </th>
          </tr>
        </thead>
        <tbody>
          {meanings.map((field) => (
            <tr key={field.key} className="border-b border-border/60 last:border-b-0">
              <td className="px-3 py-2 font-medium text-foreground">{field.label}</td>
              <td className="px-3 py-2 font-mono text-primary">{field.token || "-"}</td>
              <td className="px-3 py-2 text-muted-foreground">{field.meaning}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

type RunPreviewProps = {
  copy: CronCopy;
  analysis: ReturnType<typeof analyzeCron>;
};

function RunPreview({ copy, analysis }: RunPreviewProps) {
  return (
    <details className="rounded-[1rem] border border-border/70 bg-white/45 px-3 py-2 shadow-sm" open>
      <summary className="cursor-pointer list-none text-xs font-semibold text-muted-foreground">
        {copy.nextRunsLabel}
      </summary>
      <div className="mt-2">
        {analysis.isValid ? (
          <ol className="grid gap-1.5 text-xs text-foreground">
            {analysis.nextRuns.map((run, index) => (
              <li key={run} className="rounded-xl bg-white/70 px-2.5 py-1.5">
                <span className="mr-2 text-muted-foreground">{index + 1}.</span>
                {run}
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-xs text-muted-foreground">{copy.emptyState}</p>
        )}
      </div>
    </details>
  );
}

type ErrorCardProps = {
  copy: CronCopy;
  message: string;
};

function ErrorCard({ copy, message }: ErrorCardProps) {
  return (
    <ResultCard label={copy.errorLabel}>
      <p className="text-sm leading-5 text-destructive">
        {copy.invalidPrefix}
        {message}
      </p>
    </ResultCard>
  );
}

type ChoiceFieldProps = {
  label: string;
  value: string;
  options: Array<{ value: string; label: string; description?: string }>;
  onChange: (value: string) => void;
};

function ChoiceField({ label, value, options, onChange }: ChoiceFieldProps) {
  return (
    <div className="space-y-1.5">
      <span className="text-xs font-semibold text-muted-foreground">{label}</span>
      <div className="flex flex-wrap gap-1.5">
        {options.map((option) => (
          <button
            key={`${option.value}-${option.label}`}
            className={`cursor-pointer rounded-2xl border px-3 py-2 text-left transition ${
              value === option.value
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-white/75 text-foreground hover:border-primary/35 hover:text-primary"
            }`}
            type="button"
            onClick={() => onChange(option.value)}
          >
            <span className="block text-xs font-semibold">{option.label}</span>
            {option.description ? <span className="mt-1 block text-[11px] opacity-80">{option.description}</span> : null}
          </button>
        ))}
      </div>
    </div>
  );
}

type ValueInputFieldProps = {
  label: string;
  field: CronFieldKey;
  locale: Locale;
  value: string;
  onChange: (value: string) => void;
  stepOnly?: boolean;
};

function ValueInputField({ label, field, locale, value, onChange, stepOnly = false }: ValueInputFieldProps) {
  if (field === "dayOfWeek" && !stepOnly) {
    return <ChoiceField label={label} value={value} options={getCronWeekdayOptions(locale)} onChange={onChange} />;
  }

  const { min, max } = getFieldBounds(field, stepOnly);

  return (
    <label className="space-y-1.5">
      <span className="text-xs font-semibold text-muted-foreground">{label}</span>
      <input
        className="w-full rounded-xl border border-border bg-[var(--input)] px-3 py-2 text-sm shadow-sm transition focus:border-primary/40 focus:outline-none"
        inputMode="numeric"
        max={max}
        min={min}
        type={field === "year" ? "number" : "text"}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

type ResultCardProps = {
  label: string;
  children: ReactNode;
  action?: ReactNode;
};

function ResultCard({ label, children, action }: ResultCardProps) {
  return (
    <div className="rounded-[1.05rem] border border-border/80 bg-white/60 p-3 shadow-sm">
      <div className="mb-2 flex items-start justify-between gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
        {action}
      </div>
      <div className="text-sm leading-5 text-foreground">{children}</div>
    </div>
  );
}

type MetaCardProps = {
  label: string;
  value: string;
  positive?: boolean;
};

function MetaCard({ label, value, positive = false }: MetaCardProps) {
  return (
    <div className="rounded-[1rem] border border-border/80 bg-white/72 px-3 py-2.5 shadow-sm">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">{label}</p>
      <div className="mt-1.5 flex items-center gap-1.5">
        {positive ? <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> : null}
        <p className="break-all text-xs font-medium text-foreground">{value}</p>
      </div>
    </div>
  );
}

type ModeButtonProps = {
  active: boolean;
  label: string;
  onClick: () => void;
};

function ModeButton({ active, label, onClick }: ModeButtonProps) {
  return (
    <button
      className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
        active
          ? "bg-primary text-primary-foreground shadow-sm"
          : "border border-border bg-white/70 text-foreground hover:border-primary/35 hover:text-primary"
      }`}
      type="button"
      onClick={onClick}
    >
      <Wand2 className="h-4 w-4" />
      {label}
    </button>
  );
}

function getUiText(locale: Locale) {
  return {
    formatLabel: locale === "zh-CN" ? "表达式格式" : "Expression format",
    fieldTabsLabel: locale === "zh-CN" ? "字段配置" : "Field setup",
    startLabel: locale === "zh-CN" ? "开始" : "Start",
    endLabel: locale === "zh-CN" ? "结束" : "End",
    stepLabel: locale === "zh-CN" ? "步长" : "Step",
    unspecifiedHint:
      locale === "zh-CN"
        ? "只有“日”和“周”字段支持“不指定(?)”，月份字段不支持。"
        : `Only day-of-month and day-of-week support "not specified (?)". Month does not.`,
    resetExpressionLabel: locale === "zh-CN" ? "恢复字段生成" : "Reset to fields",
    manualOverrideHint:
      locale === "zh-CN"
        ? "你正在手动覆盖字段生成结果，下面的执行预览按当前手改表达式计算。"
        : "You are manually overriding the generated expression. The preview below uses your edited value.",
    manualOverrideTableHint:
      locale === "zh-CN"
        ? "手动编辑后，字段说明表会暂停同步；点击“恢复字段生成”可回到字段驱动模式。"
        : "Field meaning table is paused while manually overriding. Use reset to switch back to field-driven mode.",
  };
}

function getFormatLabel(format: CronFormat, locale: Locale) {
  if (format === "linux") {
    return locale === "zh-CN" ? "Linux 5 位" : "Linux 5-field";
  }

  if (format === "quartz6") {
    return locale === "zh-CN" ? "Quartz 6 位" : "Quartz 6-field";
  }

  return locale === "zh-CN" ? "Quartz 7 位" : "Quartz 7-field";
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

function getFieldBounds(field: CronFieldKey, stepOnly: boolean) {
  if (stepOnly) {
    return { min: 1, max: field === "year" ? 99 : 60 };
  }

  if (field === "second" || field === "minute") {
    return { min: 0, max: 59 };
  }

  if (field === "hour") {
    return { min: 0, max: 23 };
  }

  if (field === "dayOfMonth") {
    return { min: 1, max: 31 };
  }

  if (field === "month") {
    return { min: 1, max: 12 };
  }

  if (field === "year") {
    return { min: new Date().getFullYear(), max: new Date().getFullYear() + 99 };
  }

  return { min: 1, max: 7 };
}

function getFieldValueChipOptions(field: CronFieldKey, locale: Locale) {
  if (field === "dayOfWeek") {
    return getCronWeekdayOptions(locale);
  }

  if (field === "year") {
    return Array.from({ length: 12 }, (_, index) => {
      const value = String(new Date().getFullYear() + index);
      return { value, label: value };
    });
  }

  const bounds = getFieldBounds(field, false);

  return Array.from({ length: bounds.max - bounds.min + 1 }, (_, index) => {
    const value = String(bounds.min + index);
    return { value, label: value };
  });
}

function createFieldState(field: CronFieldKey, mode: CronFieldMode): CronBuilderState["fields"][CronFieldKey] {
  const defaultValue =
    field === "dayOfMonth" || field === "month" || field === "year" ? "1" : field === "dayOfWeek" ? "MON" : "0";

  if (mode === "wildcard") {
    return { mode, value: "*", start: defaultValue, end: defaultValue, step: "1" };
  }

  if (mode === "unspecified") {
    return { mode, value: "?", start: defaultValue, end: defaultValue, step: "1" };
  }

  if (mode === "specific") {
    return { mode, value: defaultValue, start: defaultValue, end: defaultValue, step: "1" };
  }

  if (mode === "range") {
    const endValue =
      field === "dayOfWeek" ? "FRI" : field === "dayOfMonth" || field === "month" || field === "year" ? "2" : "5";

    return { mode, value: defaultValue, start: defaultValue, end: endValue, step: "1" };
  }

  return { mode, value: defaultValue, start: defaultValue, end: defaultValue, step: "5" };
}

async function handleCopy(value: string, setCopied: (value: boolean) => void) {
  await navigator.clipboard.writeText(value);
  setCopied(true);
  window.setTimeout(() => setCopied(false), 1600);
}
