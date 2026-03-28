# StackTick Tools

> Bilingual developer toolbox focused on clean UX, SEO-ready pages, and fast static deployment.
>
> 面向程序员的双语在线工具箱，强调简洁体验、SEO 友好和静态化部署。

[中文](#中文) | [English](#english)

## 中文

### 项目简介

StackTick Tools 是一个面向程序员的在线工具站。当前首发工具是 Cron 表达式生成与解析，后续会继续扩展 JSON、正则、JWT、编码转换等常用工具。

这个项目不是单页 demo，而是按真实站点方式构建：

- 独立工具页，方便搜索引擎收录
- 中英双语界面与 SEO
- 静态预渲染输出，适合直接部署到 Nginx
- 多域名、多环境自动部署

### 当前能力

- 支持 `Linux 5 位`、`Quartz 6 位`、`Quartz 7 位` Cron
- 支持“生成表达式”和“解析表达式”两种模式
- 实时展示未来 10 次执行时间
- 支持浏览器语言自动切换和手动切换
- 页脚支持版本号和中国大陆站点备案号

### 技术栈

- React 19
- Vite 8
- TypeScript
- Tailwind CSS v4
- i18next
- cronosjs
- cronstrue
- Vitest

### 本地开发

```bash
pnpm install
pnpm dev
```

### 常用命令

```bash
pnpm dev
pnpm build
pnpm lint
pnpm test:run
pnpm format
```

### 项目结构

```text
.
├─ docs/                 # 部署与发版文档
├─ en/                   # 英文页面入口
├─ public/               # 公共静态资源
├─ scripts/              # 预渲染脚本
├─ src/
│  ├─ components/site/   # 站点页面与 Cron 工具组件
│  ├─ i18n/              # 国际化初始化与文案读取
│  ├─ lib/               # Cron 生成、解析与测试
│  ├─ site/              # 站点配置、运行时、环境变量
│  ├─ ssg/               # 预渲染入口
│  └─ test/              # 测试初始化
├─ tools/                # 中文工具页入口
└─ .github/workflows/    # GitHub Actions
```

### 部署与发版

- 部署说明：[`docs/deploy.md`](/F:/github-my/tool/docs/deploy.md)
- 发版说明：[`docs/release.md`](/F:/github-my/tool/docs/release.md)
- Nginx 模板：[`docs/nginx/stacktick-tools.conf`](/F:/github-my/tool/docs/nginx/stacktick-tools.conf)

### 开发说明

- 默认分支：`main`
- `push` 到 `main` 后会自动生成时间版本号、创建 Release、再触发部署
- 生产环境通过 GitHub Environments 注入不同域名的 `SITE_URL` 和 `SITE_ICP_NO`

## English

### Overview

StackTick Tools is a developer-oriented online toolbox. The first live utility is a Cron expression builder and parser, and more tools such as JSON formatting, regex testing, JWT decoding, and encoding utilities will be added next.

This repository is built as a real product site rather than a starter demo:

- Standalone tool pages for better search indexing
- Bilingual UI and SEO metadata
- Static prerendered output for simple Nginx deployment
- Multi-domain, multi-environment automated deployment

### Current Features

- Supports `Linux 5-field`, `Quartz 6-field`, and `Quartz 7-field` cron
- Separate builder and parser modes
- Realtime preview of the next 10 run times
- Automatic browser-language detection with manual language switching
- Footer support for version display and China ICP record when needed

### Tech Stack

- React 19
- Vite 8
- TypeScript
- Tailwind CSS v4
- i18next
- cronosjs
- cronstrue
- Vitest

### Local Development

```bash
pnpm install
pnpm dev
```

### Common Commands

```bash
pnpm dev
pnpm build
pnpm lint
pnpm test:run
pnpm format
```

### Project Structure

```text
.
├─ docs/                 # deployment and release docs
├─ en/                   # English page entries
├─ public/               # static assets
├─ scripts/              # prerender scripts
├─ src/
│  ├─ components/site/   # site sections and cron UI
│  ├─ i18n/              # i18n setup and copy access
│  ├─ lib/               # cron logic and tests
│  ├─ site/              # site config, routing, runtime env
│  ├─ ssg/               # prerender entry
│  └─ test/              # test setup
├─ tools/                # Chinese tool page entries
└─ .github/workflows/    # GitHub Actions workflows
```

### Deployment and Release

- Deployment guide: [`docs/deploy.md`](/F:/github-my/tool/docs/deploy.md)
- Release guide: [`docs/release.md`](/F:/github-my/tool/docs/release.md)
- Nginx template: [`docs/nginx/stacktick-tools.conf`](/F:/github-my/tool/docs/nginx/stacktick-tools.conf)

### Development Notes

- Default branch: `main`
- Pushing to `main` automatically generates a timestamp version, creates a Release, and then triggers deployment
- Production domains inject environment-specific `SITE_URL` and `SITE_ICP_NO` through GitHub Environments
