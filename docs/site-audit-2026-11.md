# GLINTIC 官网自测 · 未解决问题清单

> 执行依据：`GLINTIC_Studio_独立站建站需求说明书_v3.1_审核版.md`，D1–D4。
> 本报告跟踪当前英文开发版的未闭环项目；不代表正式上线批准。原报告的订阅表单、阿里外链及旧字体遗留项已不适用于本版。

## v3.1 历史验证范围与证据（最新结果见 Task1 章节）

- 日期：2026-11-22；本次工作区改动尚未提交。
- 环境：Next.js 16.4.6 生产构建 + `next start`，`http://localhost:3100`。
- 页面：`/`、`/products`、`/about`、`/legal`、404；服务端 `/api/rfq`。
- 浏览器：本机 Edge `158.0.4370.33`，现有 `puppeteer-core` 驱动的独立无头实例。IDE 浏览器连接曾超时，后续结果以独立实例记录为准；未新增项目依赖。
- 视口：390 / 640 / 1024 / 1280 / 1440 × 900，五页共 25 组；移动抽屉另测 390 × 844。
- 数据：`.verify/v31-browser.json`、`.verify/verify-v31.mjs`；截图 `.verify/v31-home-390.png`、`v31-home-1440.png`、`v31-products-desktop.png`、`v31-rfq-error.png`、`v31-rfq-mobile.png`。
- 静态检查：`tsc --noEmit`、生产构建通过；ESLint 0 errors / 6 warnings，均为既定预编码图片架构的 `@next/next/no-img-element`，其中一项属于未被新首页引用的历史组件。
- 自动化：`npm test` 的 13 项目录 / URL / 校验 / Route Handler 检查通过；加生产 HTTP 冒烟为 14 项通过。服务端测试 mock Resend，不真实发送邮件。
- 浏览器：11 组交互检查通过、25 组视口记录均无横向溢出 / 破图。已覆盖 24→48 分页、More 19 SKU、G-06、排序与 URL 恢复、RFQ 焦点与滚动锁、Esc / 遮罩 / 关闭确认、503 保留草稿、重试复用提交 ID、样品预填、移动菜单互斥、减弱动效、无 JS 告知及站内锚点。
- 成功提示及重新申请焦点仅以本地拦截的 200 响应验证，不代表 Resend 收信成功。200% 仅测 1440→720 CSS 像素的等效重排，不代替浏览器原生缩放验收。

旧版 2026-11-10 的传输量、LCP 和字体体积不作为本版性能结论；历史 `.verify/r2-*` 数据仍保留。

## Task1 实施验收与待业务确认（2026-11-25）

当前 DEV-TASK-001 开发范围已完成；此结论不等于正式上线批准。实施记录见 `Task1_全局导航MegaMenu与首页信息流重构开发指南.md` 第六节。

### 当前证据

- Next.js 16.4.6 生产模式 `http://localhost:3100`；`tsc --noEmit`、`npm run build` 通过，路由仍为 7 static + `/api/rfq` dynamic。ESLint 0 errors / 7 个 `no-img-element` warnings，继续使用既定 sharp 预编码架构。
- `npm test`：18 项通过；`node scripts/test-site.mjs --http=http://localhost:3100`：19 项通过，包含服务端模拟、邮件空字段模板与实际页面/资源/首批 24 卡 HTML。
- 本机 Edge 158.0.4370.33 通过 Node 内置 WebSocket/CDP 驱动，无新增 npm 依赖；禁用独立验收实例的扩展与同步。现有临时 puppeteer-core 已不可用，两个浏览器脚本改用 `.verify/cdp-browser.mjs`。
- `.verify/task1-browser.json`：390/640/1024/1280/1440 × 首页/Products/About/Legal/404 共 25 组，0 横向溢出、0 破图、0 动画残留隐藏，英文 lang 与主控件 ≥44px 检查通过。Windows 滚动条占 15px，scrollWidth 为视口宽度减 15px，不将正常滚动条算为溢出。
- Task1 11 组交互全部通过：五列/19 系列/5 个 Made-to-Order、1140px 面板与 72px Header 内容行；hover/Enter/Space/ArrowDown/Esc/离开焦点/外部点击；19 系列与五集合结果；同页 cat+series 导航/后退/aria-current；旧链接归一与参数保留；六模块/3+2 布局（前三卡 span 2、后两卡 span 3）/锚点不被 Header 遮挡；桌面 Hero 双行/QA/证据卡/Token/样品图；Quick 必填/503/504/草稿与 UUID；Sample/OEM/模拟 200 成功焦点与清空；移动折叠与 RFQ 互斥；减弱动效/等效 720px 重排/无 JS。
- `.verify/v31-browser.json`：完整 RFQ 与目录回归的 11 组交互、25 组视口通过。覆盖 24→48 分页、More 19、G-06、排序/历史、SKU 预填、Tab 循环/滚动锁、关闭确认/遮罩、503 重试 UUID、成功焦点/重新申请、样品数量/移动宽度、站内链接与无 JS。
- IDE 浏览器另实测桌面导航、Sample Box RFQ 打开/关闭、四字段 Quick 输入响应；最终措辞复核确认 Hero 与四徽标正确、Collections 五列展开/Esc 关闭、样品盒与 Contact 锚点命中，可视区域截图 `.verify/task1-browser-final-contact.png` 已人工检查。`task1-browser-final-top.png` 是较早版本的截图，不作为最终 Hero 文案证据；最终首页/菜单/样品截图以独立 Edge/CDP 产物为准。五视口结论不由 IDE 固定视口推断。
- 首页全页截图：`.verify/task1-home-390.png`、`.verify/task1-home-1440.png`；菜单截图：`.verify/task1-mega-menu.png`；完整样品盒可见证据：`.verify/task1-sample-box.png`；Quick 失败态：`.verify/task1-quick-error.png`。早期 `task1-ide-browser.png` 全页截图截取不完整，不作为完整首页证据。
- Quick 成功焦点曾出现异步 DOM 挂载竞争，已改为成功面板挂载后的 effect 聚焦；最终浏览器复测通过。开发中临时测试驱动同步/扩展问题不计入最终生产页面结论。
- 所有浏览器 200/503/504 均为本地拦截；服务端 Resend 全部 mock。未发送真实邮件，不代表实际收信成功。未提交、推送、部署或修改 DNS，package.json/package-lock.json 未改。

### Task1 事实口径

1. 全球 DDP/门到门承诺 → `DDP quoted per destination`，覆盖范围与运费需确认。
2. `Eco-Certified Materials` → `Certificates on request`，没有文件不作认证承诺。
3. 样品盒全额退款 → 购买前书面确认退款/抵扣，US$39 为参考价，内容和运费待确认。
4. 第三方徽标/PDF → 四张文字证据需求卡与 About 说明；待提供证书 PDF、适用 SKU、有效期和展示许可。
5. 按计划保留 `10 pcs Low MOQ`/`7-Day Express Sampling`，配星号与逐 SKU/目的地书面确认脚注；仅规划目标，不承诺普遍 MOQ、交期或最终材料规格。

开箱图为生成的 16:9 示意图，不是实拍；三档 WebP 与 manifest 已落地。12 business hours 仅为目标回复时间，不是合同 SLA，仍待业务团队确认执行能力。G-02 软木选项与 G-04 neoprene 材料另行确认。目录实际为 47 映射 + 19 More = 66、19 系列、Fascia 10 SKU；计划中的 46/20、20 系列、Fascia 9 为统计笔误，未以增删产品凑数。

### 仍需业务闭环

以下第一至四节的上线阻断项继续有效：真实发信/收信与正式联系渠道、样品内容和退款/运费条款、认证文件/授权、商业事实、域名/DNS/隐私，以及 Lighthouse 和真实设备/读屏/浏览器原生缩放。它们不是本次 Task1 开发验收的已完成项。

## 依赖与 Node 版本（2026-11-23 更新）

Vercel 构建日志提示 `engines` 使用开放区间会在 Node 新大版本发布后自动升级，且 `npm audit` 在生产依赖中报告 1 个 critical（Next 自身）。经确认后执行：

- `next` 由 `16.2.7` 升到 `16.4.6`，`eslint-config-next` 同步到 `16.4.6`；`npm audit fix` 在 semver 范围内解决余下传递依赖后，`npm audit` 与 `npm audit --omit=dev` 均为 0 漏洞。
- `engines.node` 由 `>=20.9.0` 改为 `22.x`，`.nvmrc` 同步为 `22`。Vercel 侧同时设置了 Node.js Version 覆盖，二者需保持一致；本机 Node 25 与声明版本不同，`npm install` 可能打印 EBADENGINE 提示，属预期。
- 该升级替换了 v3.1 文档表中「Next.js 16.2.7」的版本锁定，属同主版本安全修复，未更换框架；App Router、静态页面与 Route Handler 结构不变，构建仍为 8 条路由（7 static + 1 dynamic）。
- 升级后复验：`tsc --noEmit` 0 错误、ESLint 0 errors / 6 warnings、`npm test` 13 项通过、生产 HTTP 冒烟 14 项通过、浏览器 11 组交互与 25 组视口全部通过。

## 一、正式邮件与联系渠道（上线阻断）

目前未配置 Resend 三项发信变量，合法 RFQ 明确返回 503，不清空草稿、不虚报发信成功。未发送真实询盘或买家自动回执。

待业务方完成：

- Resend 账户与发信域验证；设置 `RESEND_API_KEY`、`RFQ_FROM_EMAIL`、`RFQ_TO_EMAIL`。邮箱变量只填地址，不含显示名。
- 设置正式 `NEXT_PUBLIC_CONTACT_EMAIL`，使页脚、无 JS 及失败 mailto 兜底真实可用；空配置下没有假邮箱链接。
- 提供 `NEXT_PUBLIC_WHATSAPP_NUMBER` 国际纯数字号码；空配置下不显示挂件。尚未验证真实设备唤起与浮层避让。
- 端到端确认管理员实际收信、字段完整、Reply-To 和服务商幂等结果；区分服务商接受与进入收件箱。
- 确认三秒反馈指标、回复时效与是否需要自动回执；当前不提供自动回执。

限流仅为单实例哈希桶防护，不承诺跨实例精确全局限流或永久保存询盘。询盘主要存于业务邮箱与 Resend 日志，网站不新增数据库。

## 二、业务内容与素材真实性（上线阻断）

- 提供运营主体、工厂经营身份与自有 / 合作关系、真实车间照片及授权。当前工坊 / 四级 QA 为待确认的项目框架，不宣称拥有未经核验的工厂或已完成所有测试。
- 复核 47 个系列 SKU / 19 个 More SKU 草案，重点确认 G-04、G-08、G-10、G-16、G-20 材质及结构冲突。五个 Made-to-Order 系列须确认供应能力、MOQ 与交期；G-18 未获定义，不擅自创建。
- 逐张核验店铺图片版权、水印、中文残留、第三方标识与材质对应；五款核心微距图尚未取得合规实拍证据。图库明确作为编辑氛围图，不冒充生产线。
- 样品盒五项实物、软木刻字样块、色卡与手册、US$39 是否含运费及返还条件待确认。当前清单标明 Proposed，不替换为未经批准的实物，不将退款改为首单抵扣。
- 取得 OEKO-TEX / GOTS / amfori BSCI / SGS 等有效证据、适用 SKU 与徽标许可；当前不展示无证据徽标，不承诺全品类认证、抗菌、环保或全球 DDP。
- 确认最终 Slogan 与字体。开发版采用已定义英文定位、原文允许的 Plus Jakarta Sans + Cormorant Garamond，仅 400 / 500；不表示最终品牌选择已批准。
- 确认数量梯度边界、精确数量控件及无邮编国家规则。当前精确数量可选且为 10 的倍数，无邮编采用买家声明；样品不套大货数量。
- 运费 / DDP 自动计算未提供数据规则；当前收集目的地，由人工报价，不提供虚构运费计算器。

## 三、域名、部署与隐私（上线阻断）

- `NEXT_PUBLIC_SITE_URL` 默认 `https://glinticstudio.com`。确认根域 / www canonical 及归一策略后，在部署环境配置并重新构建。
- Porkbun / Vercel HTTPS、DNS、重定向与 Resend 邮箱记录尚未配置或验收；本轮未执行部署或外部 DNS 修改。
- 设置 `NEXT_PUBLIC_LEGAL_NAME`；完善隐私政策的处理主体、法律依据、保存期限、跨境安排及正式联系渠道。
- 不在仓库或客户端放真实密钥，只有非公开的服务端环境变量可保存 Resend key。`.env.example` 为空值模板，`.env.local` 仍被忽略。

## 四、尚未完成的性能与设备验收

- Lighthouse 桌面 / 移动 Performance >90 尚未测量；当前环境未提供 Lighthouse 工具，不能用历史 LCP 或本地 HTTP 检查代替。
- 尚需真实移动触控设备、浏览器原生 200% 缩放、读屏与逐区域文字对比度测试；已通过的视口和键盘检查不等于完整无障碍认证。
- 图片上的文字、样品内容及正式 WhatsApp 配置后需复测。当前主按钮、目录筛选与选择器 44px 高度检查通过，不代替全站逐个目标的人工验收。

## 本地配置与复测

使用 `.env.example` 配置本地 `.env.local` 或 Vercel 环境变量。`NEXT_PUBLIC_*` 改动需重新构建；构建前停止同目录的运行服务，避免争用 `.next`。

```sh
npm test
npx tsc --noEmit
npm run lint
npm run build
npm run start -- --port 3100
```

服务运行后另一个终端执行 `node scripts/test-site.mjs --http=http://localhost:3100`，检查实际页面与资源。浏览器验收依次运行 `node .verify/verify-task1.mjs`、`node .verify/verify-v31.mjs`；它们全程拦截 /api/rfq，默认不发送邮件。适配器使用本机 Edge 与 Node 内置 WebSocket，不需安装 puppeteer-core；两脚本使用同一个调试端口，应顺序运行。验收脚本、报告与截图在 gitignored 的 `.verify` 目录中保留为本地证据。

一期没有在线支付或 Newsletter 后端；Sample Box 在确认内容、地址与运费后线下发 PayPal 账单。无需复测已移除的阿里产品跳转，但脚本侧来源采集记录仍保留。
