export type Locale = "zh-CN" | "en";
export type PageId = "home" | "tools" | "cron";

type ToolCard = {
  title: string;
  description: string;
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
  cronSeo: {
    compareEyebrow: string;
    compareTitle: string;
    compareDescription: string;
    compareItems: Array<{ title: string; description: string }>;
    symbolEyebrow: string;
    symbolTitle: string;
    symbolDescription: string;
    symbolItems: Array<{ symbol: string; title: string; example: string; description: string }>;
    scenarioEyebrow: string;
    scenarioTitle: string;
    scenarioDescription: string;
    scenarioItems: Array<{ title: string; expression: string; description: string }>;
    mistakeEyebrow: string;
    mistakeTitle: string;
    mistakeDescription: string;
    mistakeItems: Array<{ title: string; expression: string; description: string }>;
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
    nav: { home: "首页", tools: "更多工具", cron: "Cron 表达式" },
    hero: {
      eyebrow: "程序员在线工具箱",
      title: "让常用开发者工具保持独立、可搜索、打开就能直接使用。",
      description:
        "栈刻工具箱当前提供 Cron 表达式生成与解析，重点解决表达式编写、字段理解和执行时间预览。后续会逐步扩展更多高频开发者工具。",
      primaryCta: "打开 Cron 表达式生成器",
      secondaryCta: "浏览更多工具",
      stats: [
        { value: "Linux / Quartz", label: "格式支持" },
        { value: "未来 10 次", label: "执行预览" },
        { value: "中英双语", label: "界面与 SEO" },
      ],
    },
    featured: {
      eyebrow: "核心工具",
      title: "Cron 表达式生成器与解析器",
      description:
        "首页聚焦品牌入口和核心工具，完整能力通过独立工具页承载，结构更清晰，也更适合持续扩展。",
    },
    roadmap: {
      eyebrow: "更多工具",
      title: "围绕高频开发场景持续补齐常用在线工具。",
      description:
        "除 Cron 外，后续会继续提供 JSON、正则、JWT、编码与转换等常用能力，并保持统一入口、独立页面和一致的使用体验。",
      items: [
        { title: "Cron 表达式生成器与解析器", description: "支持 Linux 5 位、Quartz 6 位、Quartz 7 位和未来 10 次执行时间预览。" },
        { title: "JSON 格式化", description: "格式化、压缩、校验与差异对比。" },
        { title: "正则表达式测试", description: "匹配结果、高亮、替换预览与常用片段。" },
        { title: "JWT 解码器", description: "Header、Payload、过期时间和签名说明。" },
        { title: "Base64 编解码", description: "文本与文件场景统一处理。" },
        { title: "哈希生成器", description: "MD5、SHA 系列与文件摘要。" },
        { title: "URL 解析器", description: "参数、编码和组成部分一屏查看。" },
      ],
    },
    toolsPage: {
      eyebrow: "更多工具",
      title: "围绕开发流程持续补齐更多在线工具。",
      description:
        "这里整理站点当前工具与后续扩展方向，所有能力都会保持统一入口和独立页面结构。",
      primaryCta: "打开 Cron 表达式生成器与解析器",
      secondaryCta: "返回首页",
    },
    architecture: {
      eyebrow: "SEO 与结构",
      title: "从首版开始就按正式站点的多页结构组织。",
      description:
        "首页、工具页和语言路径都保持明确分工，便于部署、收录和后续扩展。",
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
          question: "这个工具支持 Linux 和 Quartz 两种格式吗？",
          answer: "支持。当前工作台同时支持 Linux 5 位、Quartz 6 位和 Quartz 7 位表达式，生成与解析模式都可以切换。",
        },
        {
          question: "未来执行时间按什么时区计算？",
          answer: "默认按当前浏览器本地时区计算，打开页面后可以直接看到未来 10 次执行时间，不需要额外选择时区。",
        },
        {
          question: "后续还会继续增加其它工具吗？",
          answer: "会。站点会继续补充 JSON、正则、JWT、编码转换等常见开发者工具，并保持统一的页面结构和交互方式。",
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
        "如果表达式要在不同时区的服务器上使用，建议在文档里额外标注目标时区。",
      ],
    },
    cronSeo: {
      compareEyebrow: "格式差异",
      compareTitle: "Linux Cron 和 Quartz Cron 的区别",
      compareDescription:
        "这是 Cron 页面里最常见的理解误区之一。Linux 常见的是 5 位表达式，Quartz 常见的是 6 位或 7 位表达式，字段数量和问号的使用规则并不相同。",
      compareItems: [
        {
          title: "Linux 5 位",
          description: "只包含 分、时、日、月、周，常见于 crontab 和多数 Linux 服务器任务。",
        },
        {
          title: "Quartz 6 位",
          description: "在 Linux 5 位基础上增加 秒 字段，适合需要更细时间粒度的调度场景。",
        },
        {
          title: "Quartz 7 位",
          description: "在 Quartz 6 位基础上增加 年 字段，适合需要显式限定年份的任务。",
        },
      ],
      symbolEyebrow: "高级语法",
      symbolTitle: "L / W / # / ? 分别是什么意思",
      symbolDescription:
        "这些符号是 Cron 搜索里最常见的长尾问题。它们主要出现在 Quartz 表达式中，理解清楚后，像“每月最后一天”或“每月第一个周一”这类规则会更容易写对。",
      symbolItems: [
        {
          symbol: "L",
          title: "最后一个值",
          example: "0 30 18 L * ?",
          description: "`L` 常用于“日”或“周”字段，表示最后一天或最后一个周几，例如每月最后一天 18:30。",
        },
        {
          symbol: "W",
          title: "最近工作日",
          example: "0 0 9 15W * ?",
          description: "`W` 只能跟在某一天后面，表示离这一天最近的工作日，例如每月 15 日最近的工作日上午 9 点。",
        },
        {
          symbol: "#",
          title: "第几个星期几",
          example: "0 0 9 ? * MON#1",
          description: "`#` 用在“周”字段，表示某月第几个星期几，例如 `MON#1` 表示每月第一个周一。",
        },
        {
          symbol: "?",
          title: "不指定",
          example: "0 0 9 ? * MON-FRI",
          description: "问号只用于“日”和“周”字段的互斥场景，表示当前字段不指定，另一个字段负责约束日期。",
        },
      ],
      scenarioEyebrow: "常见场景",
      scenarioTitle: "这些常见 Cron 场景应该怎么写",
      scenarioDescription:
        "比起只记语法，很多用户更常直接搜索具体调度场景。把这些常见表达式放在页面里，既方便复制，也更容易覆盖真实搜索词。",
      scenarioItems: [
        {
          title: "工作日每天 9 点执行",
          expression: "0 0 9 ? * MON-FRI",
          description: "这是最常见的工作日定时任务写法，适合日报、对账、定时同步这类业务。",
        },
        {
          title: "每月最后一个工作日 18 点执行",
          expression: "0 0 18 LW * ?",
          description: "适合月底结算、报表归档这类任务，`LW` 表示每月最后一个工作日。",
        },
        {
          title: "每月第一个周一 9 点执行",
          expression: "0 0 9 ? * MON#1",
          description: "适合月初例会、月度报表、账单推送等“某月第几个星期几”的场景。",
        },
        {
          title: "每月 15 日最近工作日 9 点执行",
          expression: "0 0 9 15W * ?",
          description: "当日期落在周末时会自动落到最近工作日，适合薪资、提醒、账单之类的固定日期任务。",
        },
      ],
      mistakeEyebrow: "常见错误",
      mistakeTitle: "这些 Cron 表达式为什么会报错",
      mistakeDescription:
        "很多表达式不是语法完全不会写，而是把字段数、问号和日期位置混用了。下面这些错误示例能帮助用户更快定位问题。",
      mistakeItems: [
        {
          title: "把 Linux 5 位写成 Quartz 6 位",
          expression: "*/15 * * * * ?",
          description: "如果你选的是 Linux 5 位，这个表达式会多出一个字段。",
        },
        {
          title: "把 ? 用在月份字段",
          expression: "0 0 12 ? ? MON",
          description: "问号只能用于 日 和 周 的互斥场景，月份字段不能写 ?。",
        },
        {
          title: "字段顺序写错",
          expression: "0 12 * * * ?",
          description: "Quartz 的顺序是 秒 分 时 日 月 周，不是 秒 时 分 日 月 周。",
        },
      ],
    },
    cronTool: {
      title: "Cron 表达式生成器与解析器",
      subtitle: "配置或输入后实时生成、解析并预览未来执行时间。",
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
    nav: { home: "Home", tools: "More Tools", cron: "Cron Expression" },
    hero: {
      eyebrow: "Developer Toolbox",
      title: "Keep developer tools standalone, searchable, and ready to use the moment the page opens.",
      description:
        "StackTick Tools currently focuses on a cron builder and parser for expression authoring, field clarity, and next-run previews. More high-frequency developer utilities will be added over time.",
      primaryCta: "Open Cron Expression Builder",
      secondaryCta: "Browse More Tools",
      stats: [
        { value: "Linux / Quartz", label: "syntax coverage" },
        { value: "Next 10", label: "run previews" },
        { value: "Bilingual", label: "UI and SEO" },
      ],
    },
    featured: {
      eyebrow: "Core Tool",
      title: "Cron Expression Builder and Parser",
      description:
        "The homepage stays focused on brand entry and the core tool, while full functionality continues to live on dedicated tool pages.",
    },
    roadmap: {
      eyebrow: "More Tools",
      title: "Keep expanding the toolbox around common developer workflows.",
      description:
        "Beyond cron, the site will keep adding JSON, regex, JWT, encoding, and other high-frequency utilities with a unified entry, standalone pages, and a consistent product feel.",
      items: [
        { title: "Cron Expression Builder and Parser", description: "Supports Linux 5-field, Quartz 6-field, Quartz 7-field, and next 10 run previews." },
        { title: "JSON Formatter", description: "Pretty print, minify, validate, and compare payloads." },
        { title: "Regex Tester", description: "Preview matches, replacements, and useful snippets." },
        { title: "JWT Decoder", description: "Inspect claims, expiry, header, and signature context." },
        { title: "Base64 Encoder", description: "Support both text and file workflows." },
        { title: "Hash Generator", description: "Create common digests for strings and files." },
        { title: "URL Parser", description: "Break down query params, encoding, and URL segments." },
      ],
    },
    toolsPage: {
      eyebrow: "More Tools",
      title: "More tools will keep expanding around everyday developer workflows.",
      description:
        "This section summarizes the live utility and the next set of developer tools, all organized with a unified entry and standalone pages.",
      primaryCta: "Open Cron Expression Builder and Parser",
      secondaryCta: "Back to Home",
    },
    architecture: {
      eyebrow: "SEO Structure",
      title: "The site uses a production-ready multi-page structure from the start.",
      description:
        "Homepage, tool pages, and language paths are clearly separated to support deployment, indexing, and future expansion.",
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
          question: "Does this support both Linux and Quartz cron formats?",
          answer: "Yes. The workbench supports Linux 5-field, Quartz 6-field, and Quartz 7-field expressions in both builder and parser modes.",
        },
        {
          question: "Which timezone is used for next-run previews?",
          answer: "Upcoming runs are calculated in the current browser local timezone so the page is ready to use without extra timezone setup.",
        },
        {
          question: "Will more tools be added later?",
          answer: "Yes. The site will continue to add common developer utilities such as JSON, regex, JWT, and encoding tools with the same standalone page structure.",
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
        "If the same expression runs across servers in different regions, document the intended timezone alongside it.",
      ],
    },
    cronSeo: {
      compareEyebrow: "Format differences",
      compareTitle: "Linux cron vs Quartz cron",
      compareDescription:
        "This is one of the most common Cron misunderstandings. Linux usually uses 5 fields, while Quartz commonly uses 6 or 7 fields, and the rules around field count and question marks are different.",
      compareItems: [
        {
          title: "Linux 5-field",
          description: "Contains minute, hour, day-of-month, month, and day-of-week. Common in crontab and Linux servers.",
        },
        {
          title: "Quartz 6-field",
          description: "Adds a seconds field on top of Linux-style scheduling for finer-grained execution.",
        },
        {
          title: "Quartz 7-field",
          description: "Adds a year field on top of Quartz 6-field when the schedule must be year-bound.",
        },
      ],
      symbolEyebrow: "Advanced syntax",
      symbolTitle: "What L, W, #, and ? mean in cron",
      symbolDescription:
        "These operators drive a lot of long-tail Cron searches. They mostly appear in Quartz expressions and help describe rules like the last day of a month or the first Monday of each month.",
      symbolItems: [
        {
          symbol: "L",
          title: "Last value",
          example: "0 30 18 L * ?",
          description: "`L` is commonly used in the day-of-month or day-of-week field to mean the last day or last matching weekday in a period.",
        },
        {
          symbol: "W",
          title: "Nearest weekday",
          example: "0 0 9 15W * ?",
          description: "`W` follows a day-of-month value and means the nearest weekday, such as the closest weekday to the 15th at 9:00.",
        },
        {
          symbol: "#",
          title: "Nth weekday",
          example: "0 0 9 ? * MON#1",
          description: "`#` belongs in the day-of-week field and means the nth weekday of the month, such as the first Monday.",
        },
        {
          symbol: "?",
          title: "Not specified",
          example: "0 0 9 ? * MON-FRI",
          description: "The question mark only applies to day-of-month and day-of-week when one field should stay unspecified and the other one drives the schedule.",
        },
      ],
      scenarioEyebrow: "Common scenarios",
      scenarioTitle: "How to write these common cron schedules",
      scenarioDescription:
        "Many users search for concrete scheduling patterns instead of syntax names. These examples make the page more useful to copy from and better aligned with real search intent.",
      scenarioItems: [
        {
          title: "Run at 9 AM on weekdays",
          expression: "0 0 9 ? * MON-FRI",
          description: "A common weekday schedule for reports, sync jobs, and business-hour automation.",
        },
        {
          title: "Run at 6 PM on the last weekday of the month",
          expression: "0 0 18 LW * ?",
          description: "Useful for month-end settlement and archival tasks. `LW` means the last weekday of the month.",
        },
        {
          title: "Run at 9 AM on the first Monday of the month",
          expression: "0 0 9 ? * MON#1",
          description: "A common pattern for monthly reports, billing, or scheduled meetings tied to the first Monday.",
        },
        {
          title: "Run at 9 AM on the weekday nearest the 15th",
          expression: "0 0 9 15W * ?",
          description: "If the 15th falls on a weekend, the run shifts to the nearest weekday, which is useful for payroll and billing reminders.",
        },
      ],
      mistakeEyebrow: "Common mistakes",
      mistakeTitle: "Why these Cron expressions fail",
      mistakeDescription:
        "Many errors come from mixing field count, question marks, and field positions. These examples help users diagnose issues faster.",
      mistakeItems: [
        {
          title: "Using a Quartz-style field count in Linux mode",
          expression: "*/15 * * * * ?",
          description: "If Linux 5-field is selected, this expression contains one field too many.",
        },
        {
          title: "Using ? in the month field",
          expression: "0 0 12 ? ? MON",
          description: "The question mark only applies to day-of-month and day-of-week, not the month field.",
        },
        {
          title: "Mixing up field order",
          expression: "0 12 * * * ?",
          description: "Quartz order is second, minute, hour, day, month, week, not second, hour, minute, day, month, week.",
        },
      ],
    },
    cronTool: {
      title: "Cron Expression Builder and Parser",
      subtitle: "Build, parse, and preview upcoming runs instantly.",
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
