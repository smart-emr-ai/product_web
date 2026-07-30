# MediAI 产品页部署文档

最后更新：2026-07-30

## 1. 部署目标

| 项目 | 配置 |
| --- | --- |
| 公司主体 | 医联智芯智能科技（上海）有限公司 |
| 页面短品牌 | 医联智芯 |
| 产品名 | MediAI |
| 正式域名 | `medicore.group` |
| 云平台 | 火山引擎 |
| TOS 地域 | 北京 `cn-beijing` |
| TOS 桶 | `medicore-group-landing` |
| 构建类型 | Vite 静态站点 |
| 默认首页 | `index.html` |
| 404 页面 | `index.html` |

正式产品页只允许由 `medicore.group` 对外提供。不要把其他域名、测试域名或生产产品域名指向该落地页。

## 2. 安全边界

### 允许操作

- 修改本仓库的落地页源代码、SEO 文件和部署文档。
- 构建 `dist/` 并上传到 `medicore-group-landing`。
- 在备案完成后，仅为 `medicore.group` 配置 TOS 自定义域名、DNS 和 HTTPS。
- 上传新文件或覆盖同名文件；旧的哈希资源应暂时保留，便于回滚。

### 禁止操作

- 禁止修改 `smart-emr.cn` 的任何 DNS、证书、服务器、网关或生产环境配置。该域名承载生产产品。
- 禁止根据名称猜测并删除 `smart-emr.cn` 的子域名记录。
- 禁止改动 `medicore.org.cn` 的邮件记录，包括 MX、TXT、SPF、DKIM、DMARC 等。
- 禁止将 `medicore.org.cn`、`smart-emr.cn` 或其他域名重新指向本落地页。
- 禁止批量删除 TOS 对象或清空桶。
- 禁止把云平台凭证、邮件凭证或其他密钥提交到 Git。

`medicore.org.cn` 原有根域名和 `www` 的网页 A 记录已在阿里云暂停，邮件相关记录未改动。任何恢复操作都必须经过单独确认。

## 3. 当前状态

截至 2026-07-30：

- TOS 桶 `medicore-group-landing` 已创建，地域为北京。
- 桶仍保持私有；尚未把未备案域名强行公开绑定。
- 静态网站默认首页和 404 页面均已设为 `index.html`。
- 新版 CSS 和 JavaScript 哈希资源已上传成功，上传结果为成功 2、失败 0。
- 新版根目录 `index.html` 与 `favicon.svg` 已于 2026-07-30 16:49 上传完成。
- `index.html` 的 TOS ETag 为 `2bd6a32e31b49e2eb5964a71768917fa`，与本地构建 MD5 一致。
- `favicon.svg` 的 TOS ETag 为 `e8fc3cb6bf9fdb8ae7dd70896e1e5e0e`，与本地构建 MD5 一致。
- TOS 发布文件已完整就绪；因桶保持私有且正式域名尚未绑定，这不代表公网正式站点已经上线。
- `medicore.group` 当前不配置 A、AAAA 或 CNAME 解析，避免备案前产生错误入口。
- 免费 DigiCert 证书已签发，证书 ID 为 `cert-de34b7fba01a4ae594c326622d7dd953`，包含 `medicore.group` 和 `www.medicore.group`；证书尚未绑定到 TOS。
- 正式绑定范围仍限定为裸域名 `medicore.group`。不要因为证书包含 `www` 就自动绑定 `www.medicore.group`。
- ICP 备案、域名绑定、DNS 和 HTTPS 上线仍待人工完成。

## 4. 构建与检查

建议使用 Node.js 20。

```bash
npm ci
npm run lint
npm run build
```

构建输出位于 `dist/`。发布前至少检查：

- 导航短品牌为“医联智芯”。
- 页脚公司主体为“医联智芯智能科技（上海）有限公司”。
- 页面标题、描述、Open Graph 和结构化数据同时区分公司品牌“医联智芯”和产品名“MediAI”。
- 联系表单字段、必填隐私同意、错误提示和成功状态工作正常。
- 页面在桌面与移动端没有明显布局溢出。

## 5. TOS 发布顺序

为避免首页引用尚未上传的资源，必须按以下顺序发布：

1. 进入 `medicore-group-landing/assets/`。
2. 上传本次构建生成的全部新哈希 CSS 和 JavaScript 文件。
3. 确认上传任务显示失败 0。
4. 回到桶根目录。
5. 覆盖 `favicon.svg`。
6. 最后覆盖 `index.html`。
7. 不删除旧哈希资源。

其他静态资源发生变化时，再按需覆盖：

- `hero_1.webp`
- `hero_2.webp`
- `og-image.jpg`
- `robots.txt`
- `sitemap.xml`

发布后在 TOS 对象详情中核对 `index.html` 的 ETag。对于普通单段上传的小文件，ETag 通常可与本地 MD5 对比；若使用分片上传，不应直接把 ETag 当作文件 MD5。

## 6. SEO 配置

当前仓库已包含：

- `lang="zh-CN"`
- 唯一标题和描述
- canonical：`https://medicore.group/`
- Open Graph 与 Twitter Card
- WebSite、Organization、SoftwareApplication 结构化数据
- `robots.txt`
- `sitemap.xml`
- `og-image.jpg`
- 语义化导航、无脚本说明和基础无障碍优化

备案和域名上线后需再次确认：

- canonical、站点地图和分享图片均可通过 HTTPS 访问。
- `robots.txt` 返回 200。
- `sitemap.xml` 中仅出现 `medicore.group`。
- 页面没有通过其他历史域名公开访问。

## 7. 联系表单

页面通过 Web3Forms 的 `https://api.web3forms.com/submit` 提交以下信息：

- 姓名
- 医院及科室
- 工作邮箱
- 联系电话
- 隐私同意状态

前端已包含 honeypot、提交状态、错误提示和隐私告知。页面明确禁止填写患者姓名、病历内容或其他敏感医疗信息。

Web3Forms access key 是客户端公开标识，不应视为服务端密钥，但正式运营前仍需完成隐私与跨境数据处理评估。建议在 Web3Forms 后台启用 hCaptcha；如需限制来源域名，可评估其域名限制功能。

## 8. ICP、域名与 HTTPS 人工步骤

以下步骤需要有账号权限的人员在备案或审核条件满足后执行：

1. 完成 `medicore.group` 的 ICP 备案，并取得可用于中国大陆云资源接入的备案状态。
2. 在 TOS 自定义域名中只添加 `medicore.group`。
3. 按火山引擎控制台显示的目标值，在权威 DNS 中新增对应解析。不要猜测 CNAME 或 IP。
4. 将已签发证书绑定到 `medicore.group`。
5. 开启 HTTPS，并在确认 HTTPS 正常后配置 HTTP 跳转 HTTPS。
6. 验证首页、静态资源、表单、404、`robots.txt`、`sitemap.xml` 和分享图片。
7. 确认阿里云上的 `medicore.org.cn` 网页记录仍处于暂停状态。
8. 对 `smart-emr.cn` 只做只读核查；不得修改任何记录或生产服务。

ICP 未完成时可以通过本地构建预览和 TOS 对象完整性检查验证部署文件，但不能据此宣称中国大陆正式域名已经上线。

## 9. CDN 策略

当前页面只面向中国大陆用户，且是资源规模较小的静态落地页。首发阶段不要求额外配置 CDN。备案并正式上线后，应先观察访问量、地域分布和加载性能；只有在性能数据证明有必要时，再评估火山引擎 CDN。

新增 CDN 时仍只能使用 `medicore.group`，并应先确认缓存刷新、HTTPS、回源权限和回滚方案。禁止把 CDN 配置扩展到 `smart-emr.cn`。

## 10. 回滚

1. 保留每次发布前的 `index.html` 和对应哈希资源清单。
2. 出现问题时，先把上一版本 `index.html` 覆盖回桶根目录。
3. 因旧哈希资源未删除，上一版本首页应能立即重新引用原资源。
4. 回滚后检查首页和表单，再记录原因。
5. 不使用清空桶、批量删除或 DNS 切换作为常规回滚方式。

## 11. 远程仓库与自动化

远程仓库为 `smart-emr-ai/product_web`，主分支为 `main`。

仓库自动化仅执行依赖安装、代码检查和生产构建，不再自动发布 GitHub Pages。这样可以避免产生未经授权的额外公开产品页。已有 GitHub Pages 历史站点仍需有权限的人员在 GitHub 仓库设置中只读核查；如确认仍公开，应单独评估并经确认后关闭。

本次经 TOS 校验的版本已安全推送到远程分支 `codex/medicore-group-deployment`。远程 `main` 同期存在另一份大型部署提交，其中包含 `smart-emr.cn` 生产路径配置以及不同版本的页面和静态资源；在逐项审查并明确生产影响前，禁止强推、自动合并或直接采用冲突配置。
