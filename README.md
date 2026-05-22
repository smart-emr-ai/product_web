# MediCore Product Website

MediCore 官网单页应用，基于 React、Vite、Tailwind CSS 和 Framer Motion 构建。

公司主体：医联智芯智能科技（上海）有限公司。

## 本地开发

```bash
npm ci
npm run dev
```

默认本地地址为 `http://127.0.0.1:5173/`。

## 构建

```bash
npm run build
```

构建产物输出到 `dist/`。默认 `base` 为 `/`，适合部署到 `medicore.org.cn` 或 `www.medicore.org.cn` 根路径。

如果需要继续部署到 GitHub Pages 的项目路径，可以在构建时设置：

```bash
VITE_BASE_PATH=/product_web/ npm run build
```

## 数据分析

项目内置 Umami 轻量埋点支持。设置以下环境变量后会自动加载 tracker：

```bash
VITE_UMAMI_WEBSITE_ID=your-website-id
VITE_UMAMI_SCRIPT_URL=https://www.medicore.org.cn/script.js
```

已记录的事件包括：

- CTA 点击
- 官网 section 浏览
- 科室 tab 切换
- 联系表单提交结果

## 联系表单

联系表单使用 PRD 中的 Formspree endpoint：

```text
https://formspree.io/f/xyzkbwpg
```

如需更换收件通道，只需要修改 `src/App.tsx` 中的 `CONTACT_ENDPOINT`。

Formspree 是第三方表单代收服务：浏览器把表单内容 POST 到 Formspree，Formspree 再转发到收件邮箱或后台。当前只是临时官网咨询通道；如果后续要避免任何第三方表单服务，应改成自有后端接口。

## 自建 Umami

自建 Umami 部署在火山 ECS 上。当前线上使用同域代理，避免新增 DNS 和证书：

```text
后台入口：https://www.medicore.org.cn/analytics
Tracker：https://www.medicore.org.cn/script.js
采集接口：https://www.medicore.org.cn/api/send
```

部署模板：

- `deploy/umami/docker-compose.yml`
- `deploy/umami/.env.example`
- `deploy/nginx/medicore.org.cn.conf`

生产环境不要提交真实 `.env`。服务器上需要单独生成：

- `UMAMI_POSTGRES_PASSWORD`
- `UMAMI_APP_SECRET`

官网构建时使用 Umami website id：

```bash
$env:VITE_UMAMI_WEBSITE_ID="实际 website id"
$env:VITE_UMAMI_SCRIPT_URL="https://www.medicore.org.cn/script.js"
npm run build
```

## Nginx

`deploy/nginx/medicore.org.cn.conf` 提供了根域、www、HTTPS、SPA fallback、ACME challenge 和缓存头配置示例。

当前火山 ECS 部署约定：

- 构建产物目录：`/opt/smart-emr/apps/product-web/dist`
- Nginx 容器挂载：`/usr/share/nginx/product-web`
- Let’s Encrypt 证书：`/etc/nginx/ssl/letsencrypt/live/medicore.org.cn/`
- 访问策略：`http://medicore.org.cn`、`https://medicore.org.cn` 均 301 到 `https://www.medicore.org.cn`

建议缓存策略：

- `index.html`：`no-cache`
- `/assets/`：`public, max-age=31536000, immutable`
- 图片、视频、字体：`public, max-age=2592000`
