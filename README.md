# MediCore Product Website

MediCore 官网单页应用，基于 React、Vite、Tailwind CSS 和 Framer Motion 构建。

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
VITE_UMAMI_SCRIPT_URL=https://your-umami.example.com/script.js
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
