# MediCore Product Website

MediCore 官网单页应用，基于 React、Vite、Tailwind CSS 和 Framer Motion 构建。

公司主体：医联智芯智能科技（上海）有限公司。

## 本地开发

```bash
npm ci
npm run dev
```

默认本地地址为 `http://127.0.0.1:5173/`。

如果只是想在没有备案放行前本地查看官网，推荐使用：

```bash
npm ci
npm run dev -- --host 127.0.0.1
```

然后在浏览器打开：

```text
http://127.0.0.1:5173/
```

也可以查看更接近线上静态产物的 production preview：

```bash
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

然后打开：

```text
http://127.0.0.1:4173/
```

本地预览不需要 ICP 备案，也不会经过火山引擎公网合规拦截。

## 临时可访问地址

备案接入完成前，可以先把官网挂到已备案通过的 `smart-emr.cn` 路径下：

```text
https://smart-emr.cn/medicore/
```

这个临时路径对应的 Nginx 片段在：

```text
deploy/nginx/smart-emr-medicore-path.conf
```

构建临时路径版本时使用：

```bash
VITE_BASE_PATH=/medicore/ \
VITE_UMAMI_WEBSITE_ID=d4a80fea-ed31-4407-b06f-b7784018e032 \
VITE_UMAMI_SCRIPT_URL=https://smart-emr.cn/medicore-analytics/script.js \
VITE_UMAMI_HOST_URL=https://smart-emr.cn/medicore-analytics \
VITE_UMAMI_DOMAINS=medicore.org.cn,www.medicore.org.cn,smart-emr.cn \
npm run build
```

Windows PowerShell：

```powershell
$env:VITE_BASE_PATH="/medicore/"
$env:VITE_UMAMI_WEBSITE_ID="d4a80fea-ed31-4407-b06f-b7784018e032"
$env:VITE_UMAMI_SCRIPT_URL="https://smart-emr.cn/medicore-analytics/script.js"
$env:VITE_UMAMI_HOST_URL="https://smart-emr.cn/medicore-analytics"
$env:VITE_UMAMI_DOMAINS="medicore.org.cn,www.medicore.org.cn,smart-emr.cn"
npm run build
Remove-Item Env:VITE_BASE_PATH
Remove-Item Env:VITE_UMAMI_WEBSITE_ID
Remove-Item Env:VITE_UMAMI_SCRIPT_URL
Remove-Item Env:VITE_UMAMI_HOST_URL
Remove-Item Env:VITE_UMAMI_DOMAINS
```

等 `medicore.org.cn` 在火山完成接入备案后，可以删除 `smart-emr.cn` 上的 `/medicore/` 和 `/medicore-analytics/` 临时 location。

临时 Umami 后台入口：

```text
https://www.smart-emr.cn/login
```

`www.smart-emr.cn` 只作为临时 Umami 后台入口使用，主站仍然是 `https://smart-emr.cn/`。

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
VITE_UMAMI_HOST_URL=https://www.medicore.org.cn
VITE_UMAMI_DOMAINS=medicore.org.cn,www.medicore.org.cn
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
$env:VITE_UMAMI_HOST_URL="https://www.medicore.org.cn"
$env:VITE_UMAMI_DOMAINS="medicore.org.cn,www.medicore.org.cn"
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

## 火山备案状态

当前官网代码、Nginx、HTTPS、自建 Umami 和 ECS 内部访问均已配置完成；但 `medicore.org.cn` / `www.medicore.org.cn` 解析到火山中国大陆 ECS 后，还需要完成火山引擎接入备案，否则国内公网访问会被火山引擎显示「网站暂时无法访问」拦截页。

备案接入由业务负责人在火山控制台处理。备案放行前，可使用上面的本地开发或 production preview 方式查看页面。
