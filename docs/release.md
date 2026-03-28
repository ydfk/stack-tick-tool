# 自动发版

项目现在使用时间版本号自动发版，不再走 Release PR。

## 触发方式

- 日常开发 push 到 `main`
- `Release` 工作流会自动：
  - 用当前时间生成版本号
  - 更新 [`package.json`](/F:/github-my/tool/package.json) 版本号
  - 自动提交 `chore(release): v...`
  - 自动创建 `v...` tag
  - 自动生成 GitHub Release

## 版本格式

- 版本号格式是 `YYYY.M.D-tHHMMSS`
- 例如：`2026.3.28-t223015`
- 这个格式兼容 `package.json` 所需的 semver

## 当前文件

- [`release.yml`](/F:/github-my/tool/.github/workflows/release.yml)
