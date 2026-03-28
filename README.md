# StackTick Tools

> 面向程序员的双语在线工具箱，当前首发 Cron 表达式生成与解析。

---

## 中文说明

### 项目定位
- 这是一个以独立工具页和 SEO 为核心的程序员在线工具箱。
- 当前首发工具为 Cron 表达式生成与解析，后续会继续扩展更多开发者工具。

### 技术栈
- React 19 + Vite 8 + TypeScript
- Tailwind v4 + i18next
- cronosjs + cronstrue
- Vitest + Testing Library

### 快速开始
```bash
pnpm install
pnpm dev
```

### 常用命令
```bash
pnpm dev           # 本地开发
pnpm build         # 生产构建 (tsc -b + vite build)
pnpm lint          # 代码检查
pnpm format        # 代码格式化
pnpm format:check  # 检查格式
pnpm test          # 单测(监听)
pnpm test:run      # 单测(一次性)
```

#### 运行单个测试
```bash
pnpm test -- src/path/to/file.test.tsx
pnpm test -- -t "test name"
```

### 目录结构
```text
src/
  components/site/ # 站点页面与 Cron 工具
  i18n/            # 中英文文案与语言初始化
  lib/             # Cron 解析与生成逻辑
  site/            # 路由、站点配置、运行时
  ssg/             # 预渲染入口
  test/            # 测试初始化
```

### 代码规范（简要）
- 使用 `@/` 作为 `src` 路径别名。
- 组件优先函数式组件。
- Tailwind 为主，尽量避免新增全局 CSS。
- 组件命名 PascalCase，文件名 kebab-case。

### 注意事项
- 部署说明见 [`docs/deploy.md`](/F:/github-my/tool/docs/deploy.md)。
- 自动发版说明见 [`docs/release.md`](/F:/github-my/tool/docs/release.md)。

---

## English

### Purpose
- This is a bilingual developer toolbox built around standalone utility pages and SEO-friendly delivery.
- The first live utility is a cron expression builder and parser, with more tools planned next.

### Tech Stack
- React 19 + Vite 8 + TypeScript
- Tailwind v4 + i18next
- cronosjs + cronstrue
- Vitest + Testing Library

### Quick Start
```bash
pnpm install
pnpm dev
```

### Common Commands
```bash
pnpm dev           # Start dev server
pnpm build         # Production build (tsc -b + vite build)
pnpm lint          # Lint
pnpm format        # Format
pnpm format:check  # Format check
pnpm test          # Tests (watch)
pnpm test:run      # Tests (run once)
```

#### Run a Single Test
```bash
pnpm test -- src/path/to/file.test.tsx
pnpm test -- -t "test name"
```

### Structure
```text
src/
  components/site/ # site sections and cron tool UI
  i18n/            # translation resources and setup
  lib/             # cron parsing and builder logic
  site/            # routing, runtime, site config
  ssg/             # prerender entry
  test/            # test setup
```

### Style Notes (Short)
- Use `@/` alias for `src`.
- Prefer function components.
- Tailwind first; avoid extra global CSS.
- PascalCase for components, kebab-case for filenames.

### Notes
- Deployment guide: [`docs/deploy.md`](/F:/github-my/tool/docs/deploy.md)
- Release guide: [`docs/release.md`](/F:/github-my/tool/docs/release.md)
