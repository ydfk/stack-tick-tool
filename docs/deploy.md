# 多服务器自动部署

这个项目适合用 `GitHub Actions + rsync + Nginx` 自动部署到多台 Debian 服务器。

## 方案说明

- 每个域名对应一个独立的 GitHub Environment
- 每个 Environment 都有自己的 `SITE_URL`
- GitHub Actions 会针对每个 Environment 单独构建
- 构建完成后，把 `dist/` 同步到对应服务器目录
- 服务器只负责托管静态文件，不需要运行 Node 服务

这里的前提是：

- 国内域名和国外域名都是独立站点
- 它们不是镜像站，也不共用 SEO 地址
- 所以必须分别构建，再分别部署

这样做的原因是：

- 当前站点的 `canonical`、`hreflang`、`og:url`、`sitemap.xml`、`robots.txt` 都和域名绑定
- 多域名不是镜像站，所以必须按域名单独构建

## 仓库变量

在仓库 `Settings -> Secrets and variables -> Actions -> Variables` 里添加：

- `DEPLOY_ENVIRONMENTS_JSON`

示例：

```json
["production-cn", "production-global"]
```

这个变量只负责告诉工作流要部署哪些 GitHub Environment。

## 每个 Environment 需要配置的内容

在 `Settings -> Environments` 中，为每台服务器创建一个 Environment。

例如：

- `production-cn`
- `production-global`

### Environment Variables

每个 Environment 都添加：

- `SITE_URL`
- `SITE_ICP_NO`
- `DEPLOY_PATH`

示例：

```text
SITE_URL=https://cn.example.com
SITE_ICP_NO=沪ICP备2026000001号
DEPLOY_PATH=/var/www/stacktick-tools
```

另一个环境可以是：

```text
SITE_URL=https://global.example.com
SITE_ICP_NO=
DEPLOY_PATH=/var/www/stacktick-tools
```

说明：

- `SITE_ICP_NO` 只需要在中国大陆站点配置
- 留空时，页脚不会显示备案信息

### Environment Secrets

每个 Environment 都添加：

- `DEPLOY_HOST`
- `DEPLOY_PORT`
- `DEPLOY_USER`
- `DEPLOY_SSH_KEY`

说明：

- `DEPLOY_HOST`：服务器 IP 或域名
- `DEPLOY_PORT`：SSH 端口，默认一般是 `22`
- `DEPLOY_USER`：部署用户
- `DEPLOY_SSH_KEY`：对应部署用户的私钥

## Debian 服务器准备

安装 `nginx` 和 `rsync`：

```bash
sudo apt update
sudo apt install -y nginx rsync
```

创建站点目录：

```bash
sudo mkdir -p /var/www/stacktick-tools
sudo chown -R <deploy-user>:<deploy-user> /var/www/stacktick-tools
```

## Nginx 配置示例

可以直接参考仓库里的模板文件：

- [`docs/nginx/stacktick-tools.conf`](/F:/github-my/tool/docs/nginx/stacktick-tools.conf)

也可以把下面内容保存为：

`/etc/nginx/sites-available/stacktick-tools.conf`

```nginx
server {
    listen 80;
    server_name cn.example.com;

    root /var/www/stacktick-tools;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    location = /robots.txt {
        access_log off;
    }

    location = /sitemap.xml {
        access_log off;
    }
}
```

启用配置：

```bash
sudo ln -s /etc/nginx/sites-available/stacktick-tools.conf /etc/nginx/sites-enabled/stacktick-tools.conf
sudo nginx -t
sudo systemctl reload nginx
```

如果你有多台服务器，就分别按各自域名写对应的 `server_name`。
国内站和国外站建议各自配置自己的证书、日志和缓存策略，不要共用一份站点配置。

## 首次部署

工作流文件已经是：

- `.github/workflows/deploy.yml`

默认行为：

- push 到 `main` 时自动部署所有环境
- 也可以手动执行 `Deploy` workflow
- 手动执行时可选只部署某一个 Environment

## 新增服务器时怎么做

新增一台 Debian 服务器时，只需要：

1. 新建一个 GitHub Environment
2. 为该 Environment 填写：
   - `SITE_URL`
   - `DEPLOY_PATH`
   - `DEPLOY_HOST`
   - `DEPLOY_PORT`
   - `DEPLOY_USER`
   - `DEPLOY_SSH_KEY`
3. 把这个 Environment 名称加到 `DEPLOY_ENVIRONMENTS_JSON`

不需要修改构建逻辑。

## 部署流程

每次部署会执行：

1. `pnpm install --frozen-lockfile`
2. `pnpm test:run`
3. `pnpm build`
4. 用当前 Environment 的 `SITE_URL` 生成对应域名的静态文件
5. `rsync dist/` 到目标服务器

## 注意事项

- 因为每个域名都是独立站点，所以 `SITE_URL` 不能共用
- 中国大陆站点如果需要显示备案号，请为对应 Environment 配置 `SITE_ICP_NO`
- 如果没有配置 `SITE_URL`，构建产物里的 SEO 链接会退回占位地址
- 建议部署用户只拥有目标目录权限，不要直接用 `root`
