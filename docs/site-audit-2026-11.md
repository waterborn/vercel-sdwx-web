# GLINTIC 官网自测 · 未解决问题清单

> 本文档只跟踪**尚未解决**的问题。第 1 批（性能与死链）、第 2 批（SEO 与内容闭环）、第 3 批（可访问性与列表体验）已实施并复测通过，其修复记录、逐项证据、验收口径对照、改动清单与第 1 轮基线快照均已从本文档删除。
> 订阅表单按需求本轮**不做**。

- **测试日期**：2026-11-10
- **被测版本**：分支 `manduka`，基线提交 `43b75de` + 267 项工作区改动（尚未提交）
- **测试范围**：`/`、`/products`、`/about`、`/legal`、自定义 404 + 共享布局（AnnouncementBar / Navbar / Footer）
- **运行环境**：`next build` 产物 + `next start`（http://localhost:3000，Next.js 16.2.7 Turbopack）；桌面 1440×900、移动 390×844（`isMobile + hasTouch`）
- **取证方式**：puppeteer-core 驱动本机 Edge（`headless: "new"`）：冷缓存上下文逐页测传输量与 LCP、a11y/键盘回归、交互回归、Node `fetch` 全量内部链接与 hash 目标校验、CDP `Emulation.setScriptExecutionDisabled` 测无 JS 可见性
- **原始数据**：`.verify/r2-audit.json`、`.verify/r2-a11y.json`、`.verify/r2-func.json`、`.verify/brand.json` 及 `audit-r2.mjs` / `audit-r2b.mjs` / `audit-r2c.mjs` / `probe-rail.mjs` / `probe-payload.mjs` / `probe-brand.mjs` / `shot-brand.mjs`（`.verify/` 已在 `.gitignore` 与 `eslint` ignore 中）

---

## 一、待解决问题

### 1. 订阅表单（P0，按需求本轮排除）

仍为原生 `<form>` 提交，`requestSubmit()` 会发出 `GET /?` 并刷新页面。落地需 `onSubmit` → `POST /api/subscribe`（或接第三方 EDM）+ 成功/失败态文案；未接后端前至少改 mailto 预填。

### 2. `rel="sponsored noopener noreferrer"`

产品卡外链目前为 `noopener noreferrer`（安全项已达标，`extUnsafeRel=0`）。阿里系商品链接是否补 `sponsored` / `ugc` 标记，待确认外链长期保留策略后一并加。

### 3. 需人工提供信息后才能闭环

- 正式域名（决定 canonical / OG / sitemap 的绝对地址）→ 请在 Vercel 项目环境变量里设 `NEXT_PUBLIC_SITE_URL`（现兜底 `vercel-sdwx-web.vercel.app`）；
- 社媒主页 URL → 填入 `Footer.tsx` 的 `SOCIAL_PROFILES` 即自动出现图标（现为空数组，整块不渲染）；
- 询盘邮箱与电话/WhatsApp → 全站 `contact@glintic.com` 为占位（邮箱域名按惯例保持小写）；
- 素材合规：商品图直取店铺素材，需逐张复核水印 / 中文残留 / 第三方标识。

### 4. 上线前需真人浏览器抽查产品卡外链

66 个 SKU 的详情页链接以 alicdn imageHash 与本地素材精确匹配（66/66 命中、66 个唯一 productId，59/66 slug 同源交叉校验），本地证据链完整；但自动化会话点外链会被阿里风控拦到 `login.alibaba.com`，因此**上线前请用真人浏览器抽查若干条**确认落地页正确。

### 5. 未做但可选的后续优化

- 字体传输 67.1 KB（Cormorant 4 字重 + Nunito 5 字重）可裁到实际使用的 2–3 个字重；
- JS 164.8 KB 以 React runtime 为主，暂无可拆重库；
- 站内详情页（`/products/[id]` + Product schema）待脱离阿里自营时再做。

---

## 二、当前基线数据（供后续优化参照）

### 传输与加载（生产构建，冷缓存上下文）

| 页面 | HTML | 总传输 | 图片 | `<img>` | LCP |
|---|---|---|---|---|---|
| `/` | 15.7 KB | **451.4 KB** | 56.1 KB(+40.9 KB 背景) | 34 | 456 ms |
| `/products` | 10.7 KB | 399.8 KB | 27.4 KB | 24 | 264 ms |
| `/about` | 16.3 KB | 476.6 KB | 100.5 KB | 7 | 280 ms |
| `/legal` | 9.0 KB | 369.0 KB | 0 | 0 | 212 ms |
| 404 | 6.1 KB | 325.2 KB | 0 | 0 | 96 ms |

首页构成拆解（`encodedBodySize`）：JS 164.8 KB（9 文件）、字体 67.1 KB（2 woff2 子集）、图片 56.1 KB、CSS 背景图 40.9 KB、CSS 7.8 KB、favicon 25.3 KB。LCP 在本机多次实测 316–456 ms，属测量抖动区间。

站点图片磁盘负载 2.16 MB（WebP 阶梯，`public/` 全目录 2.23 MB）；移动端触控目标 `<44px` 首页 9 个 / 其余 1 个，`<24px` 为 0。

### 构建与静态检查

```
next build   ✓ Compiled successfully / TypeScript 通过 / 9 static pages
             ○ /  ○ /_not-found  ○ /about  ○ /legal  ○ /products  ○ /robots.txt  ○ /sitemap.xml
tsc --noEmit  0 errors
eslint        0 errors / 9 warnings —— 全部为 @next/next/no-img-element
链接完整性     dead=0 hashMiss=0 placeholder=0 extUnsafeRel=0
```

> **9 条 lint warning 为有意豁免**：图片走「sharp 预编码 + manifest + 原生 `<img>`」路线，`next/image` 的自动优化在此架构下是重复劳动；已把 `.verify/**` 加入 `eslint` ignore，让告警面只反映站点代码。
