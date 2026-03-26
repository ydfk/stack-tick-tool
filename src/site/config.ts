export type Locale = "zh-CN" | "en";
export type PageId = "home" | "tools" | "cron";

type ToolCard = {
  title: string;
  description: string;
  badge: string;
};

export type CopyBundle = {
  localeLabel: string;
  nav: {
    home: string;
    tools: string;
    cron: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    stats: Array<{ value: string; label: string }>;
  };
  featured: {
    eyebrow: string;
    title: string;
    description: string;
  };
  roadmap: {
    eyebrow: string;
    title: string;
    description: string;
    items: ToolCard[];
  };
  toolsPage: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  architecture: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{ title: string; description: string }>;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: Array<{ question: string; answer: string }>;
  };
  cronGuide: {
    eyebrow: string;
    title: string;
    description: string;
    fields: Array<{ name: string; range: string; detail: string }>;
    notes: string[];
  };
  cronTool: {
    title: string;
    subtitle: string;
    builderModeLabel: string;
    parserModeLabel: string;
    builderTypeLabel: string;
    builderExpressionLabel: string;
    fieldMeaningTitle: string;
    validationLabel: string;
    validText: string;
    invalidText: string;
    errorLabel: string;
    expressionLabel: string;
    expressionPlaceholder: string;
    timezoneLabel: string;
    timezoneHint: string;
    examplesLabel: string;
    examples: Array<{ label: string; value: string }>;
    runButton: string;
    copyButton: string;
    copiedButton: string;
    descriptionLabel: string;
    normalizedLabel: string;
    syntaxLabel: string;
    nextRunsLabel: string;
    warningsLabel: string;
    emptyState: string;
    invalidPrefix: string;
    timezonePrefix: string;
  };
  footer: {
    title: string;
    description: string;
    versionLabel: string;
    icpLabel: string;
    copyright: string;
  };
};

export const brandName = "StackTick Tools";
export const brandDisplay = "栈刻工具箱";
export const localeStorageKey = "stacktick-locale";
export const supportedLocales: Locale[] = ["zh-CN", "en"];

export const siteCopy: Record<Locale, CopyBundle> = {
  "zh-CN": {
    localeLabel: "简体中文",
    nav: { home: "首页", tools: "工具列表", cron: "Cron 工具" },
    hero: {
      eyebrow: "程序员在线工具箱",
      title: "从 Cron 开始，做一个更适合长期搜索增长的工具站。",
      description:
        "栈刻工具箱首发聚焦 Quartz 6/7 位 Cron 表达式，提供实时解析、自然语言说明、最近执行时间和时区切换。后续会按开发者工具常用分类持续扩展。",
      primaryCta: "直接打开 Cron 工具",
      secondaryCta: "查看即将上线工具",
      stats: [
        { value: "Quartz 6/7", label: "表达式支持" },
        { value: "多时区", label: "执行时间计算" },
        { value: "中英双语", label: "界面与 SEO" },
      ],
    },
    featured: {
      eyebrow: "首发工具",
      title: "在线 Cron 表达式解析器",
      description:
        "输入表达式后立即获得规范化结果、自然语言说明、未来 10 次执行时间，以及语法告警和错误提示。",
    },
    roadmap: {
      eyebrow: "工具路线图",
      title: "占位不是空白，而是后续可持续扩展的结构。",
      description:
        "目录参考开发者工具常见使用路径，先把关键词、分类页和视觉秩序搭起来，后续逐个填充能力。",
      items: [
        { title: "Cron 表达式解析器", description: "Quartz 6/7 位解析、时区切换和未来执行时间。", badge: "已上线" },
        { title: "JSON 格式化", description: "格式化、压缩、校验与差异对比。", badge: "即将上线" },
        { title: "正则表达式测试", description: "匹配结果、高亮、替换预览与常用片段。", badge: "即将上线" },
        { title: "JWT 解码器", description: "Header、Payload、过期时间和签名说明。", badge: "即将上线" },
        { title: "Base64 编解码", description: "文本与文件场景统一处理。", badge: "即将上线" },
        { title: "哈希生成器", description: "MD5、SHA 系列与文件摘要。", badge: "即将上线" },
        { title: "URL 解析器", description: "参数、编码和组成部分一屏查看。", badge: "即将上线" },
      ],
    },
    toolsPage: {
      eyebrow: "工具列表",
      title: "每个工具都应该有独立入口，而不是堆在同一页里。",
      description:
        "这里集中展示当前已上线工具和即将上线的开发者工具。后续新增功能时，会优先继续沿用独立页面结构，保证 SEO 和导航清晰。",
      primaryCta: "打开 Cron 工具",
      secondaryCta: "返回首页",
    },
    architecture: {
      eyebrow: "SEO 与结构",
      title: "这不是 demo 首页，而是可部署、可收录、可继续长大的站点骨架。",
      description:
        "首版直接按搜索友好的多页结构来做，避免后面从 SPA 硬改 SEO，减少返工。",
      items: [
        { title: "静态多页输出", description: "首页和工具页独立 URL，可直接预渲染为完整 HTML。" },
        { title: "语言分路径", description: "中文和英文各自拥有稳定地址，并带有 hreflang 标记。" },
        { title: "本地计算优先", description: "Cron 计算在浏览器完成，页面加载轻，部署成本低。" },
        { title: "关键词可扩张", description: "后续只需继续增加工具页和站点地图，不需要重做框架。" },
      ],
    },
    faq: {
      eyebrow: "常见问题",
      title: "先把用户最关心的几个点解释清楚。",
      items: [
        {
          question: "这个工具支持 Quartz 6/7 位吗？",
          answer: "支持。当前解析器兼容 Quartz 常见的 6 位和 7 位表达式，同时也能兼容一部分 5 位写法。",
        },
        {
          question: "未来执行时间会考虑时区吗？",
          answer: "会。你可以指定 IANA 时区，例如 Asia/Shanghai、Europe/London、America/New_York，结果会按对应时区计算。",
        },
        {
          question: "为什么首页还放了未上线工具？",
          answer: "这是为了提前建立清晰的信息架构和搜索入口，后续新增工具时不用重做站点结构。",
        },
      ],
    },
    cronGuide: {
      eyebrow: "Cron 速览",
      title: "Quartz 7 个字段怎么读",
      description:
        "Quartz 表达式通常是秒、分、时、日、月、周、年。年字段可选，问号常用于“日”和“周”二选一的场景。",
      fields: [
        { name: "秒", range: "0-59", detail: "通常是第 1 位，Quartz 里默认存在。" },
        { name: "分", range: "0-59", detail: "支持步进、范围与列表。" },
        { name: "时", range: "0-23", detail: "24 小时制。" },
        { name: "日", range: "1-31", detail: "支持 L、W、? 等常见语法。" },
        { name: "月", range: "1-12", detail: "也可以写 JAN-DEC。" },
        { name: "周", range: "0-7", detail: "支持 MON-SUN、L、#、?。" },
        { name: "年", range: "可选", detail: "当你需要限定年份时再填写。" },
      ],
      notes: [
        "Quartz 常见写法示例：`0 */15 * * * ?` 表示每 15 分钟执行一次。",
        "`?` 只能单独用于“日”和“周”字段，表示该字段不指定。",
        "当你需要跨团队共享表达式时，建议同时附上时区和自然语言说明。",
      ],
    },
    cronTool: {
      title: "实时 Cron 工作台",
      subtitle: "输入后实时解析，支持多时区预览。",
      builderModeLabel: "生成表达式",
      parserModeLabel: "解析表达式",
      builderTypeLabel: "调度场景",
      builderExpressionLabel: "生成结果",
      fieldMeaningTitle: "字段含义",
      validationLabel: "校验结果",
      validText: "表达式有效",
      invalidText: "表达式无效",
      errorLabel: "错误信息",
      expressionLabel: "Cron 表达式",
      expressionPlaceholder: "例如 0 */15 * * * ?",
      timezoneLabel: "时区",
      timezoneHint: "支持输入 IANA 时区，如 Asia/Shanghai。",
      examplesLabel: "快捷示例",
      examples: [
        { label: "每 15 分钟", value: "0 */15 * * * ?" },
        { label: "工作日 9 点", value: "0 0 9 ? * MON-FRI" },
        { label: "每月最后一天", value: "0 30 18 L * ?" },
        { label: "每周一凌晨 2 点", value: "0 0 2 ? * MON" },
      ],
      runButton: "立即计算",
      copyButton: "复制表达式",
      copiedButton: "已复制",
      descriptionLabel: "自然语言说明",
      normalizedLabel: "规范化结果",
      syntaxLabel: "识别模式",
      nextRunsLabel: "未来 10 次执行时间",
      warningsLabel: "解析提示",
      emptyState: "输入后自动解析。",
      invalidPrefix: "表达式无效：",
      timezonePrefix: "当前计算时区：",
    },
    footer: {
      title: "栈刻工具箱",
      description: "简洁、可搜索、为程序员日常操作而设计。",
      versionLabel: "版本",
      icpLabel: "备案号",
      copyright: "© 2026 栈刻工具箱",
    },
  },
  en: {
    localeLabel: "English",
    nav: { home: "Home", tools: "Tools", cron: "Cron Tool" },
    hero: {
      eyebrow: "Developer Toolbox",
      title: "Start with cron, grow into a search-friendly toolbox for developers.",
      description:
        "StackTick Tools launches with a Quartz 6/7 cron parser, human-readable descriptions, next-run previews, and timezone switching. More developer utilities will be added on top of this structure.",
      primaryCta: "Open Cron Tool",
      secondaryCta: "See Upcoming Tools",
      stats: [
        { value: "Quartz 6/7", label: "syntax coverage" },
        { value: "Timezone-aware", label: "run previews" },
        { value: "Bilingual", label: "UI and SEO" },
      ],
    },
    featured: {
      eyebrow: "Featured Utility",
      title: "Cron Expression Parser",
      description:
        "Type an expression and get normalized output, plain-English explanations, the next 10 run times, and parser warnings in one place.",
    },
    roadmap: {
      eyebrow: "Tool Roadmap",
      title: "Placeholder cards are part of the product structure, not filler.",
      description:
        "The roadmap follows the common information architecture of developer tools so the site can scale without redesigning the navigation later.",
      items: [
        { title: "Cron Expression Parser", description: "Quartz 6/7 parsing, timezone switching, and future run previews.", badge: "Live" },
        { title: "JSON Formatter", description: "Pretty print, minify, validate, and compare payloads.", badge: "Coming Soon" },
        { title: "Regex Tester", description: "Preview matches, replacements, and useful snippets.", badge: "Coming Soon" },
        { title: "JWT Decoder", description: "Inspect claims, expiry, header, and signature context.", badge: "Coming Soon" },
        { title: "Base64 Encoder", description: "Support both text and file workflows.", badge: "Coming Soon" },
        { title: "Hash Generator", description: "Create common digests for strings and files.", badge: "Coming Soon" },
        { title: "URL Parser", description: "Break down query params, encoding, and URL segments.", badge: "Coming Soon" },
      ],
    },
    toolsPage: {
      eyebrow: "Tools Directory",
      title: "Each tool should have its own page instead of sharing one crowded screen.",
      description:
        "This page lists the live utility and the upcoming developer tools. New features will continue to ship as standalone pages to keep navigation and SEO clean.",
      primaryCta: "Open Cron Tool",
      secondaryCta: "Back to Home",
    },
    architecture: {
      eyebrow: "SEO Structure",
      title: "This is a deployable product shell, not a generic starter homepage.",
      description:
        "The first version already ships as a multi-page static site so search visibility does not depend on retrofitting an SPA later.",
      items: [
        { title: "Static multi-page output", description: "The homepage and tool page have dedicated URLs and prerendered HTML." },
        { title: "Language-specific paths", description: "Chinese and English live on stable URLs with hreflang annotations." },
        { title: "Client-side execution", description: "Cron parsing happens in the browser for fast pages and easy deployment." },
        { title: "Keyword-ready expansion", description: "New tools can be added as first-class pages without rebuilding the site architecture." },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "Answer the practical questions before users have to ask.",
      items: [
        {
          question: "Does this support Quartz 6/7 field cron expressions?",
          answer: "Yes. The parser is designed for common Quartz-style 6-field and 7-field expressions, while still accepting many 5-field forms.",
        },
        {
          question: "Are the upcoming run times timezone-aware?",
          answer: "Yes. You can calculate runs against IANA timezones such as Asia/Shanghai, Europe/London, or America/New_York.",
        },
        {
          question: "Why show tools that are not live yet?",
          answer: "Because roadmap cards help define category structure, future landing pages, and search intent before each tool ships.",
        },
      ],
    },
    cronGuide: {
      eyebrow: "Cron Primer",
      title: "How to read the 7 Quartz fields",
      description:
        "Quartz expressions are usually second, minute, hour, day-of-month, month, day-of-week, and year. The year is optional, and `?` is commonly used when day-of-month or day-of-week should stay unspecified.",
      fields: [
        { name: "Second", range: "0-59", detail: "Usually the first Quartz field." },
        { name: "Minute", range: "0-59", detail: "Supports steps, ranges, and lists." },
        { name: "Hour", range: "0-23", detail: "Uses 24-hour time." },
        { name: "Day", range: "1-31", detail: "Supports `L`, `W`, and `?`." },
        { name: "Month", range: "1-12", detail: "Also accepts JAN-DEC." },
        { name: "Week", range: "0-7", detail: "Supports MON-SUN, `L`, `#`, and `?`." },
        { name: "Year", range: "optional", detail: "Only add it when the schedule must be year-bound." },
      ],
      notes: [
        "A common Quartz example is `0 */15 * * * ?`, which means every 15 minutes.",
        "`?` can only stand alone in the day-of-month or day-of-week fields.",
        "When you share cron expressions across teams, include both the timezone and a human-readable description.",
      ],
    },
    cronTool: {
      title: "Realtime Cron Workbench",
      subtitle: "Parse instantly with timezone-aware previews.",
      builderModeLabel: "Build Expression",
      parserModeLabel: "Parse Expression",
      builderTypeLabel: "Schedule preset",
      builderExpressionLabel: "Generated expression",
      fieldMeaningTitle: "Field meanings",
      validationLabel: "Validation",
      validText: "Expression is valid",
      invalidText: "Expression is invalid",
      errorLabel: "Error",
      expressionLabel: "Cron Expression",
      expressionPlaceholder: "For example 0 */15 * * * ?",
      timezoneLabel: "Timezone",
      timezoneHint: "Use IANA names such as Asia/Shanghai.",
      examplesLabel: "Quick examples",
      examples: [
        { label: "Every 15 minutes", value: "0 */15 * * * ?" },
        { label: "Weekdays at 9 AM", value: "0 0 9 ? * MON-FRI" },
        { label: "Last day of month", value: "0 30 18 L * ?" },
        { label: "Monday at 2 AM", value: "0 0 2 ? * MON" },
      ],
      runButton: "Calculate",
      copyButton: "Copy expression",
      copiedButton: "Copied",
      descriptionLabel: "Human-readable description",
      normalizedLabel: "Normalized expression",
      syntaxLabel: "Detected syntax",
      nextRunsLabel: "Next 10 run times",
      warningsLabel: "Parser warnings",
      emptyState: "Parse instantly after input.",
      invalidPrefix: "Invalid expression: ",
      timezonePrefix: "Calculated in timezone: ",
    },
    footer: {
      title: "StackTick Tools",
      description: "Minimal, indexable, and built around real developer workflows.",
      versionLabel: "Version",
      icpLabel: "ICP record",
      copyright: "© 2026 StackTick Tools",
    },
  },
};
