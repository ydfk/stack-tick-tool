# 自动发版

项目现在使用 `release-please` 管理版本号和 GitHub Release。

## 触发方式

- 日常开发按 Conventional Commits 提交到 `main`
- `release-please` 会自动创建或更新 Release PR
- Release PR 合并后，会自动：
  - 更新 [`package.json`](/F:/github-my/tool/package.json) 版本号
  - 更新 `.release-please-manifest.json`
  - 生成 GitHub Release 和 tag

## 版本规则

- `feat:` 对应 `minor`
- `fix:` 对应 `patch`
- `feat!:` 或带 breaking change 的提交会触发 `major`

## 当前文件

- [`release.yml`](/F:/github-my/tool/.github/workflows/release.yml)
- [`.release-please-config.json`](/F:/github-my/tool/.release-please-config.json)
- [`.release-please-manifest.json`](/F:/github-my/tool/.release-please-manifest.json)
