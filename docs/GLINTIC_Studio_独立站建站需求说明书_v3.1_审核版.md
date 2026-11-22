# GLINTIC Studio 独立站建站需求说明书 v3.1 · 审核版

> 项目：GLINTIC Studio 官方 B2B 品牌与供应链官网
> 原说明书：`docs/GLINTIC_Studio_独立站建站需求说明书.md`（v3.0）
> 目标域名：`glinticstudio.com`；DNS 管理商：Porkbun；托管平台：Vercel
> 审核日期：2026-11-22
> 技术依据：当前仓库的 `package.json`、`src/` 与图片处理脚本。
> 交付范围：仅生成本文件。原说明书、网站代码、依赖、部署配置与既有自测报告均未修改。
> 文档状态：用户已确认的决策可作为后续开发依据；标为“建议”或“待确认”的内容不得视为已经批准。下列验收清单描述未来要求，不代表网站已实现或已测试通过。

## 0. 审核结论与执行边界

### 0.1 总体结论

原说明书的 B2B 定位、静奢视觉方向、五大产品集合与询盘链路可以在当前项目上实现，无需更换框架。需要修正的是技术配置写法、目录映射和交互落地细节；商业条款、真实材质、工厂关系与认证不能依据现有代码自行定稿。

原文声明引用《独立站计划第2版.docx》《美学视觉开发规范.docx》，但本次只收到融合后的 MD，未取得两份原件，不能回溯验证 G-18 等缺口。

本次为需求文档与仓库静态代码核对，未进行浏览器测试、实物验货、实时库存查询或证书核验。SKU 存在于目录不等于实际有库存；代码中的公司宣传文案也不等于已经取证。

### 0.2 用户已确认的四项决策

| 编号 | 已确认决策 | 影响 |
|---|---|---|
| D1 | 五大集合为主，G 编号作为系列，映射现有 SKU；无对应 SKU 的系列走 Made-to-Order 询盘；不属于五大集合的 SKU 从首页隐藏，保留在 `/products` 的 More From GLINTIC 分组 | 产品目录、首页集合、RFQ 产品预填 |
| D2 | 一期不做在线支付。Sample Box 改为样品申请，打开 RFQ 并预选 Sample Box，后续线下发 PayPal 账单 | 删除一期支付接入及 Sandbox 验收；保留样品盒业务 |
| D3 | RFQ 使用 Next.js Route Handler + 原生 `fetch` 调 Resend REST API，不安装 Resend SDK | 新增 `/api/rfq`，不新增独立后端或数据库 |
| D4 | 移除产品卡上的阿里巴巴外链与价格；以 `Inquire This Item` 作为主要操作 | 卡片结构、价格筛选与排序、相关文案 |

除上述四项外，本审核不代替业务方决定退款与抵扣、样品实物替换、产品材质、供应能力或认证真实性。

### 0.3 当前技术栈与架构约束

| 项目 | 仓库现状 | 本说明书约束 |
|---|---|---|
| 框架 | Next.js 16.2.7、React / React DOM 19.2.4 | 保留 App Router，不更换框架 |
| 语言 | TypeScript 5；Node 要求 `>=20.9.0` | 沿用当前类型检查和运行环境 |
| 样式 | Tailwind CSS 4、`@tailwindcss/postcss`；`globals.css` 使用 `@import`、`@theme inline` | 使用 CSS-first 配置，不新增 `tailwind.config.js` |
| 字体 | `next/font/google`；当前为 Nunito Sans、Cormorant Garamond | 继续使用现有字体加载机制；按原文允许的字体选项调整 |
| 动效 | CSS transition + `useScrollAnimation` | 不引入 Framer Motion |
| 图标 | 内联 SVG | 不引入 Lucide React |
| 图片 | sharp 构建期 WebP 阶梯 + `image-manifest.json` + `asset()` / `bgImage()` + 原生 `<img>` | 保留预编码与 manifest 架构，不切换到运行时 `next/image` 优化 |
| 数据 | 本地 JSON / TypeScript；现目录共 66 个 SKU、6 个旧分类 | 增加系列映射，不引入 CMS、数据库或状态管理库 |
| 表单服务 | 当前以 mailto 入口为主，暂无 RFQ API | 在同一 Next.js 项目增加 Route Handler，以 REST 调 Resend |
| 部署 | Vercel，`.next` 构建产物 | 保留现有部署方式；DNS 变更另行授权执行 |

本次实现要求不新增 npm 依赖。Resend 是用户已确认的外部发信服务，不等于增加 SDK 或变更技术架构。

## 1. 业务与品牌定位

### 1.1 核心定义

- 品牌字标：`GLINTIC`；完整名称：`GLINTIC Studio`。
- 品牌显示文本一律全大写 GLINTIC；域名、邮箱与 CSS 命名空间保留小写。
- 行业定位：B2B 瑜伽与普拉提场馆一站式辅具供应链服务商。
- 英文定位：`One-Stop Yoga & Pilates Studio Supply & Private Label Partner`。
- 买家画像：欧美中高端工作室、运动品牌与 DTC 卖家、酒店 / SPA / 康养度假村、场馆前台零售采购。

原 Slogan 三个选项均保留，最终待业务方确认：

1. `GLINTIC | One-Stop Yoga & Pilates Studio Supply Solutions`
2. `GLINTIC | Premium Yoga & Pilates Props for Studios & Brands`
3. `GLINTIC | Your Trusted Studio Sourcing & Customization Partner`

审核建议采用 Option 1，与供应链定位更直接；这是建议，不是已确认决策。

当前 `company.ts`、`site.ts`、Hero 与 metadata 仍以 Sports Support / Recovery 为核心。后续应按本章统一首页、About、SEO description、keywords、OG 图片与邮件签名，不延续旧护具旗舰定位。

### 1.2 设计哲学

保留原文三项原则：

1. Quiet Luxury：温润、自然、空间留白，避免冰冷代工感。
2. Tactile Material Truth：通过真实微距图表达材质与工艺，不用虚构素材证明性能。
3. Editorial Elegance & B2B Clarity：杂志级排版与规格、MOQ、询盘结构并存。

可持续、环保、防滑与性能描述必须关联实际产品证据，不以统一宣传词覆盖整个目录。

## 2. Design Tokens 与视觉规范

### 2.1 配置方式：Tailwind CSS 4 CSS-first

原文色值全部保留。将原 `tailwind.config.js` 示例改写为 `src/app/globals.css` 中的 `@theme`；这是配置方式适配，不是重新设计配色。

```css
@import "tailwindcss";

@theme {
  /* 画布与底层背景 */
  --color-glintic-cream: #FAF8F5;
  --color-glintic-linen: #F4F1EA;
  --color-glintic-surface: #FFFFFF;

  /* 文字与深色结构 */
  --color-glintic-charcoal: #1A1A1A;
  --color-glintic-slate: #363939;
  --color-glintic-muted: #6F736F;
  --color-glintic-caption: #969B96;

  /* 品牌点睛色 */
  --color-glintic-sage: #7A8B7B;
  --color-glintic-sage-light: #EAF0EA;
  --color-glintic-sage-dark: #4F5D50;
  --color-glintic-cork: #D4A373;
  --color-glintic-cork-light: #F8F1EA;
  --color-glintic-champagne: #C5A880;
  --color-glintic-champagne-light: #F5EFE6;
  --color-glintic-peach: #E8C5B8;
  --color-glintic-peach-light: #FAF1EE;

  /* 分割线与描边 */
  --color-glintic-line: #EAE7E1;
  --color-glintic-line-dark: #D8D4CC;

  /* 原文阴影 */
  --shadow-glintic-ambient: 0 4px 20px -2px rgba(26, 26, 26, 0.04);
  --shadow-glintic-hover: 0 12px 32px -4px rgba(26, 26, 26, 0.08);
}
```

命名适配：`sage.DEFAULT` 对应 `glintic-sage`，`sage.light` 对应 `glintic-sage-light`，`lineDark` 对应 `glintic-line-dark`。使用 `bg-glintic-cream`、`text-glintic-charcoal` 等工具类。

原文 `--glintic-bg-primary` 等语义变量可保留，但应引用上述 token，不能维护第二套独立色值。语义映射如下：

| 原文变量 | 单一来源 |
|---|---|
| `--glintic-bg-primary` / `--glintic-bg-secondary` / `--glintic-surface` | cream / linen / surface |
| `--glintic-text-primary` / `--glintic-text-secondary` / `--glintic-text-muted` | charcoal / muted / caption |
| `--glintic-border` / `--glintic-border-dark` | line / line-dark |
| `--glintic-accent-sage` / `--glintic-accent-sage-bg` | sage / sage-light |
| `--glintic-accent-cork` / `--glintic-accent-champagne` / `--glintic-accent-peach` | cork / champagne / peach |
| `--glintic-shadow-ambient` / `--glintic-shadow-hover` | 上述两个 shadow token |

注意：原文 `--glintic-text-muted` 对应 caption，不是颜色名 muted；使用时以此表为准。

旧 `ink`、`brand-black`、`brand-white`、`soft-gray` 类迁移时按场景替换：页面背景 cream、表单及高光卡 surface、次级卡 linen、正文 charcoal；不可把所有白色区域机械替换为 cream。

### 2.2 对比度审核与使用限制

以下为按原始色值计算的相对亮度对比度，不是当前页面已通过无障碍测试的结论。

| 组合 | 对比度 | 使用规则 |
|---|---|---|
| charcoal on cream | 16.42:1 | 适合正文与标题 |
| slate on linen | 10.34:1 | linen 底上的辅助文字可用 slate |
| muted on cream / surface | 4.55:1 / 4.82:1 | 可用于普通文字，避免再叠加降低对比的 opacity |
| muted on linen | 4.27:1 | 不达普通文字 4.5:1；此场景改用已有 slate，不改变 muted 色值 |
| caption on cream | 2.67:1 | 不用于必读参数、表单提示或 Placeholder；保留作装饰与禁用态 |
| white on sage | 3.62:1 | 不用于小字按钮；Hover 使用 sage-dark 底与白字，约 6.97:1 |
| sage on sage-light | 3.13:1 | Trust Badge 使用 sage-dark 字与 sage-light 底，约 6.02:1 |
| line-dark on surface | 1.48:1 | 可作装饰线，不单独承担必要的输入框识别；输入边界用已有 sage 或 slate |
| cork / champagne 作浅底上的文字 | 约 2.1–2.3:1 | 作为底色与点缀，其上文字使用 charcoal |

无需更改原 palette 即可解决以上组合问题。焦点轮廓必须可见；图片上的叠加文本逐区域测试，不能只测试纯色 token。

### 2.3 字体与字号

保留原允许的字体家族：

- 标题：Plus Jakarta Sans / Outfit。
- 衬线点缀：Cormorant Garamond。
- 正文与规格：Inter / Plus Jakarta Sans。
- 字重：仅 Regular 400、Medium 500。

审核建议选 Plus Jakarta Sans 同时承载标题与正文，Cormorant Garamond 用于故事与步骤数字；选择仍待确认。使用现有 `next/font/google`，不增加字体加载库。确定后移除旧 Nunito 字体与未使用字重，避免浏览器合成额外粗细。

| 层级 | 桌面 | 移动 | 字重 | 行高 | 字间距 | 场景 |
|---|---|---|---|---|---|---|
| Display H1 | 56px | 36px | 500 | 1.15 | -0.02em | Hero 主标语 |
| Section H2 | 36px | 26px | 500 | 1.25 | -0.01em | 模块标题 |
| Card H3 | 22px | 18px | 500 | 1.35 | 0 | 产品卡、步骤标题 |
| Subtitle / Lead | 18px | 15px | 400 | 1.60 | 0 | 副标、导语 |
| Body | 15px | 14px | 400 | 1.65 | 0 | 描述、故事、FAQ |
| Specs & UI | 13px | 12px | 400 / 500 | 1.50 | +0.02em | 规格、表单标签、色卡 |
| Badge & Overline | 11px | 11px | 500 | 1.20 | +0.08em | 全大写类别标签 |

关键条款、错误提示和必读参数不得只以 11px 呈现；可在保留 Overline 风格的同时另提供可读正文。桌面字号建议从 `lg`（1024px）开始使用，平板采用移动字号或经设计确认后的过渡值。

### 2.4 动效、图标与图片

- 复用 CSS transition 和 `useScrollAnimation`；保持 `prefers-reduced-motion`、无脚本与打印可见性兜底。
- 抽屉使用 CSS transform 与 transition；图标使用内联 SVG，装饰图标 `aria-hidden`，图标按钮必须有可访问名称。
- 不引入 Framer Motion、Lucide React。
- 本地图片仍通过 `scripts/optimize-images.mjs` → manifest → `src/data/images.ts` 解析；保留原始逻辑路径、尺寸、`srcSet`、`sizes`。
- 首屏关键图 eager / 高优先级，非首屏图 lazy；全幅图使用真实 `<img>` 与响应式阶梯，不退回仅下载最大档的 CSS 背景。
- 新增或替换源图需重新生成 manifest；未确认版权与真实性的图片不得进入正式稿。

## 3. 页面结构与路由

### 3.1 首页严格按原文顺序

1. Top Announcement Bar：linen 背景。
2. Sticky Header：`rgba(250,248,245,0.85)` 毛玻璃与双 CTA 胶囊。
3. Hero：大片视觉、已确认 Slogan、Trust Badges。
4. 五大 Curated Collections。
5. OEM / ODM 四步流程。
6. GLINTIC Sample Box 样品申请模块（D2）。
7. Workshop、QC 与认证背书。
8. Brand Story 与可持续承诺。
9. 全幅 Contact / RFQ 入口。
10. Footer：多列导航、合规说明、直达联系方式。

RFQ 抽屉和 WhatsApp 是全局浮层，不占页面流中的独立高度。

### 3.2 对应当前组件

| 模块 | 当前组件 | 后续处理 |
|---|---|---|
| 公告与导航 | AnnouncementBar、Navbar | 改为原文配色与胶囊 CTA；双入口建议为 Request a Quote / Sample Box，移动端均应可到达 |
| Hero | HeroSection | 更新定位、素材与 Slogan；Badge 先核验证据 |
| 集合 | CategoryGrid | 六个旧分类改为五大集合 |
| OEM / ODM | ProcessSection、PartnerSection | 重组为四步流程，保留可证实的能力信息 |
| 样品盒 | 暂无独立模块 | 增加展示与样品申请入口 |
| 工坊与质检 | About 页已有相关内容 | 首页提供摘要，About 提供完整内容 |
| 故事与联系 | AboutSummary、ContactCTA | 按新定位改写，主 CTA 进入 RFQ |
| Footer | Footer | 按原文要求重组；Newsletter 不纳入本说明书范围，正式页面移除无效订阅入口 |
| 旧商品推荐区 | ProductRail、FlagshipBanner、ProductGridSection | 不纳入新首页，以原文模块顺序为准；是否保留文件由实际引用决定，不要求为改版删除历史资产 |

当前 Hero Badge 不应直接沿用未取证的 `SGS Tested Materials`、打样时效或 DDP 承诺。可展示已核实的 OEM 能力等事实；证据未齐时保留该模块设计，暂缓具体宣传条目上线。

### 3.3 路由与静态渲染

| 路由 | 要求 |
|---|---|
| `/` | 保留静态生成与首页模块顺序 |
| `/products` | 五大集合、More、All；静态输出首批产品，客户端筛选和 Load more |
| `/about` | 故事、工坊、OEM、QA、认证及 FAQ，保留有效锚点 |
| `/legal` | 隐私、使用条款、RFQ 数据处理与正式公司信息 |
| `/api/rfq` | 同一 Next.js 项目中的 POST Route Handler；无需把页面改为动态渲染 |
| sitemap、robots、404 | 保留现有实现，更新正式域名与实际路由 |

`/products` 沿用当前 `useState + history.replaceState + popstate` 同步筛选与 URL。不要未经验证改用 `useSearchParams` / `useRouter` 并导致当前整页退化为客户端空壳；验收关键是服务端 HTML 仍含首批真实产品，而不是把该结论推广为所有 Next.js 页面都不能使用这些 API。

## 4. 五大集合、系列与 SKU

### 4.1 数据分层

- Collection：原文五大集合，承载名称、slug、介绍与图片。
- Series：G 编号表示产品系列，不取代现有 SKU ID。
- SKU：继续保留现有 ID、图片与可核实的规格；新增所属系列或 More 映射。
- Made-to-Order：用户已确认的询盘类型，不等于现货，也不等于已经证实能生产；报价前核实供应能力与交期。

下面映射是依据仓库品名形成的审核草案，47 个 SKU 拟归入 G 系列、19 个拟归入 More。具体规格不一致处须业务复核，不将“功能相近”自动认定为“完全同款”。

### 4.2 完整集合与编号清单

#### Collection 1：Yoga & Pilates Essentials

| 系列 | 原文产品范围 | 拟映射 SKU / 缺口 |
|---|---|---|
| G-01 | Yoga Mat Series：折叠、TPE、天然橡胶垫 | `floor-exercise-mat`；名称为折叠运动地垫，是否符合瑜伽垫材质与规格待核实 |
| G-02 | High-Density Yoga Blocks：EVA / 软木砖 | `eva-yoga-blocks`；本地目录无软木砖，不能用 EVA 图片证明软木材质 |
| G-03 | Fascia & Lacrosse Massage Balls | `portable-massage-ball`、`portable-silicone-massage-ball`、`cork-fascia-ball`、`oak-forest-cork-ball`、`silicone-peanut-ball`、`electric-peanut-ball` |
| G-04 | Soft Neoprene Hand Dumbbells | `silicone-dumbbell`、`mini-dumbbells`；材质及可调结构不完全一致，原系列名保留，是否改为中性命名待确认 |

#### Collection 2：Pilates Props & Resistance

| 系列 | 原文产品范围 | 拟映射 SKU / 缺口 |
|---|---|---|
| G-05 | Resistance & Booty Bands | `silicone-resistance-band`、`multi-loop-band`、`latex-resistance-bands-set`、`tpe-resistance-band`、`hip-lifting-band`、`shoulder-resistance-band`、`latex-yoga-ropes`；不同材质按 SKU 单独标注 |
| G-06 | Pilates Magic Circle | 本地无对应 SKU，Made-to-Order 询盘 |
| G-07 | Pilates Mini Stability Balls | `pvc-yoga-ball` |
| G-08 | High-Density Foam Rollers | `eva-foam-roller-53`、`eva-foam-roller-camo`、`qiyun-cork-roller`、`cork-massage-roller`；软木滚轴与泡沫轴分开说明材质 |
| G-09 | Adjustable Ankle & Wrist Weights | `ankle-wrist-weights`、`magnetic-wristband`；具体结构与调节能力待核实 |

#### Collection 3：Restorative & Meditation

| 系列 | 原文产品范围 | 拟映射 SKU / 缺口 |
|---|---|---|
| G-10 | Yoga Straps & Stretching Belts | `iyengar-yoga-strap`、`leg-stretching-strap`；前者名称为铜扣，不能直接标为镍合金 D 环 |
| G-11 | Yoga Bolsters | `iyengar-yoga-bolster` |
| G-12 | Studio Meditation Blankets | 本地无对应 SKU，Made-to-Order 询盘 |
| G-13 | Eye Pillows | 本地无对应 SKU，Made-to-Order 询盘 |
| G-14 | Ergonomic Meditation Cushions：Zafu & Zabuton | `zafu-meditation-cushion`、`crescent-meditation-pillow`、`round-cotton-cushion`；未取得独立 Zabuton 地垫证据 |

#### Collection 4：Studio Hygiene & Textiles

| 系列 | 原文产品范围 | 拟映射 SKU / 缺口 |
|---|---|---|
| G-15 | Studio Non-Slip Grip Socks | `calf-strap-pilates-socks`、`summer-yoga-socks`、`pilates-yoga-socks`、`five-toe-socks`、`ballet-boat-socks`、`toe-cross-back-socks`、`silicone-grip-socks`、`women-yoga-socks`、`five-toe-pilates-socks`、`mid-calf-five-toe-socks`、`short-five-toe-socks` |
| G-16 | Microfiber Sweat Towels & Mat Towels | `yoga-towel-ultrafine`、`microfiber-mat-towel`、`bamboo-yoga-towel`、`pilates-mat-cover-polka`、`pilates-mat-cover-honeycomb`；英文名称修正原文重复连接词，竹纤维和垫套不能统一标为超细纤维 |
| G-17 | Anti-Bacterial Equipment Cleaning Cloths | 本地无对应 SKU，Made-to-Order 询盘；抗菌声明需取证 |

#### Collection 5：Retail Corner & Merchandise

| 系列 | 原文产品范围 | 拟映射 SKU / 缺口 |
|---|---|---|
| G-18 | 原文缺失 | 待补定义；不得擅自补一个商品，不渲染虚构占位 |
| G-19 | Stainless Steel Insulated Water Bottles | 本地无对应 SKU，Made-to-Order 询盘 |
| G-20 | Canvas Studio Tote Bags & 2-in-1 Yoga Mat Carry Strap | `mat-carrier-strap` 为候选垫带；二合一功能待核实，托特包暂无本地 SKU |

原文 G-01～G-20 实际列出 19 个系列，其中 14 个有候选 SKU，5 个没有候选 SKU。该数字不是库存或可交付商品数量。

#### More From GLINTIC：仅在 `/products` 保留

`knee-compression-sleeve`、`waist-support-corset`、`pull-up-grips`、`fitness-gloves-women`、`silicone-fitness-gloves`、`women-tennis-skort`、`yoga-2piece-set`、`ballet-shoes`、`soccer-grip-socks`、`bamboo-sports-socks`、`thin-performance-socks`、`hand-grip-dumbbell`、`pilates-bar-set`、`eva-knee-pad`、`push-up-board-14in1`、`push-up-board-color`、`balance-board-round`、`cork-balance-board-set`、`cork-half-ball`。

这 19 项拟保留，不首页展示；后续可按业务确认重新归类，不以本次草案永久锁定。

### 4.3 产品卡与工具栏

- 卡片保留产品图、系列 / SKU 名、规格摘要与 `Inquire This Item`。
- 无阿里外链与价格；取消现有整卡外链结构，避免未来在 `<a>` 内嵌套询盘按钮。
- 询盘预填完整 SKU ID、名称和 G 系列；More 商品无 G 编号时仍可正常预填 SKU。
- Made-to-Order 没有真实图片时可使用纯文字系列卡，不用 AI 图或他牌图片冒充实物。
- 不公开虚构 MOQ、库存、认证、交期；无确认参数时注明需询价确认。
- 删除价格带筛选与价格排序；保留集合筛选、非价格排序、当前分页 / Load more 能力。
- 删除旧 `price` 查询参数，未知分类 / 排序安全归一；刷新与浏览器前进后退可复现合法状态。

D4 是前台移除外链与价格，不要求删除素材采集证据。若精简前端 JSON，需同步调整 `download-images.mjs` 对 `sourceUrl` 的读取，保证图片下载与 manifest 链仍可运行。历史来源记录可留在不被 `src/` 导入的脚本侧文件；不再向前台产品类型暴露价格与详情链接。

### 4.4 原文微距实拍规范与待核验标签

| 系列 | 保留的拍摄要求 | 原文标签 / 审核要求 |
|---|---|---|
| G-01 | 45° 侧光、压花方格纹理、折叠分块与包边、左下角 slate Logo | `High-Density TPE / Natural Rubber`、`Anti-Slip Grid Texture`；逐 SKU 核实，不将两种材质混标 |
| G-02 | 栓皮栎软木颗粒孔隙、激光雕刻边缘 | `100% Sustainable Organic Cork`、`Precision Laser Engraving`；有机与可持续宣称需证据，未取证时建议 `Natural Cork`；EVA 砖不用此文案 |
| G-05 | 紧密提花、内侧两条防滑硅胶丝、双缝线 | `Anti-Rolling Silicone Grip Strip`、`Double-Stitched Seams`；拍摄并验证具体编织款，不能覆盖乳胶或 TPE 款 |
| G-10 | 2.5mm 棉织纹理、哑光合金 D 环 | `Heavyweight Organic Cotton`、`Matte Nickel Alloy D-Rings`；棉材认证和扣环材质待核验，不用铜扣款代证 |
| G-15 | 半球形蜂窝点胶颗粒、足弓加固带 | `Ergonomic PVC/Silicone Grip Dots`、`Reinforced Arch Compression`；按实际材质和结构展示 |

五款核心微距图是原文要求，现有店铺图不能仅因文件已下载就认定满足。上线前逐张核对纹理、构图、品牌标识、版权与清晰度，缺失则补拍。

屏幕微文案采用 HTML 文本叠层，保持可读、可访问与对比度，不把关键标签只烧录进图片。

## 5. B2B 转化功能

### 5.1 GLINTIC Sample Box：一期样品申请

保留原文业务内容，D2 只改变支付方式，不自动改变价格或盒内实物：

1. Mini G-01 折叠垫实物样块。
2. Mini G-02 软木砖刻字样块。
3. G-05 弹力带五色色卡串。
4. G-15 防滑袜一双。
5. GLINTIC 纸质精装材质与工艺手册。

价格保留 `US$39.00`。主按钮为 `Request a Sample Box`，打开 RFQ 并预选 Sample Box；站内不出现直接支付按钮。线下确认内容、地址、运费后发 PayPal 账单。

原权益 `Fully Refundable on Bulk Order` 保留为待确认商业条款。须明确返还触发条件、时限、是否包含运费、是否原路退款；不能未经授权改为“首单抵扣”，因为退款与抵扣并非同一权益。

软木样块来源、五色色卡、手册与样品包装尚未取证。EVA SKU 存在不能证明软木样块不存在，也不能自动替换盒内实物；供应方确认清单后再上线正式展示。

### 5.2 RFQ 入口与抽屉

入口：Header `Request a Quote`、每张产品卡 `Inquire This Item`、首页 Contact、Sample Box 申请。

- 桌面右侧 480px 滑出；窄屏使用 `min(480px, 100vw)`，保证不溢出。
- 背景毛玻璃遮罩，内部滚动，不遮住关闭按钮和错误信息。
- 使用 React Context / 本地 state 管理，不引入状态库；小型客户端触发器可嵌入服务端页面。
- `role="dialog"`、`aria-modal="true"`、可访问标题；打开时焦点进入抽屉、循环限制 Tab、背景 inert、锁滚动；Esc / 关闭按钮 / 遮罩关闭并归还焦点。
- 现 Navbar 已有 Esc、菜单收起 inert 和滚动锁，可复用思路；它不是现成的模态焦点陷阱，RFQ 需另补完整焦点管理。
- 用户正在填写时避免误关闭造成丢失；浮层与移动菜单互斥，WhatsApp 暂时隐藏。
- 无 JS 时保留邮箱联系兜底，不能展示永远无法打开的唯一入口。

### 5.3 RFQ 字段

| 字段 | 原文要求与审核处理 |
|---|---|
| Inquiry Type | 为 D2 增加 Bulk Quote / Sample Box / OEM Project，用于区分处理流程 |
| Contact Name | 必填，长度限制、去除首尾空白 |
| Business Email | 必填，格式校验；不因 Gmail 等域名自动拒绝工作室买家 |
| Company / Studio Name | 必填 |
| Country & Zip Code | 保留原意，界面可拆两项；无邮编国家如何填写待确认，不擅自取消国家与配送信息 |
| Target Product | 多选系列 / SKU；入口注入身份信息，允许只咨询样品或整体方案 |
| Order Quantity | 保留原五个梯度：10–50、50–200、200–500、500–1,000、1,000+ pcs；原文另要求整十数输入，建议提供可选精确数量并校验 10 的倍数，最终控件与边界待确认；Sample Box 不套用大货数量要求 |
| Customization Options | No Logo (Blank) / Laser Engraved / Silk Screen / Custom Colorway / Custom Packaging / Full ODM；空白款与包装定制可能并存，不把 No Logo 设为禁用所有其他项 |
| Project Details & Notes | 多行文本，建议上限 2,000 字符；不接受可执行 HTML |
| Privacy Notice | 增加隐私说明链接与处理告知；是否采用同意复选框及法律依据按目标市场确认，不与营销订阅捆绑 |
| 防垃圾字段 | 可用隐藏蜜罐，排除辅助技术和自动填充误命中；时间戳不能作为可信防滥用依据 |

原文“用于系统计算 DDP / CIF 门到门运费”缺少运价、重量、税率与目的地规则，当前无对应计算器。需求不因代码缺失自动删除：保留收集配送信息，报价暂由人工处理；是否一期自动计算须业务补充数据与规则后确认。CIF 不等于门到门 DDP，应在正式文案中区分。

### 5.4 Route Handler + Resend REST

1. 浏览器 POST JSON 到 `/api/rfq`，带正确 Content-Type；提交中禁用按钮，失败保留内容并提供重试与 mailto 兜底。
2. 服务端校验请求体大小、JSON、字段类型、长度、枚举、系列 / SKU ID；不信任客户端传入的收件人、主题或显示名称。
3. 校验允许的同源 Origin，结合蜜罐与合理请求限制。不能把“填写少于三秒”视为机器人并丢弃，合法自动填充也可能很快。
4. 用原生 `fetch("https://api.resend.com/emails")` 发送到固定管理员邮箱；`from` 使用验证域邮箱，`reply_to` 使用已校验的买家地址；正文使用纯文本或严格转义的 HTML。
5. 设置上游超时并检查 HTTP 状态。只有 Resend 已接受管理员邮件才能向正常请求返回成功；超时、服务不可用、配置缺失返回明确错误，不虚报已发送。
6. 重试使用服务商支持的幂等键与同一提交 ID，防止重复邮件；不在当前无数据库架构下承诺永久保存订单或精确全局限流。
7. 可选自动回执须确认内容与防滥用方案；不把公开 RFQ 做成任意地址群发入口。回执失败不应掩盖管理员邮件的真实结果，也不应在响应后留下未受生命周期保障的发信任务。

环境变量：`RESEND_API_KEY`、`RFQ_FROM_EMAIL`、`RFQ_TO_EMAIL`。不使用 `NEXT_PUBLIC_` 暴露密钥，不写入仓库或日志。Resend 域验证所需 DNS 按控制台添加，避免覆盖已有邮箱 SPF 等记录。

原“三秒内收到邮件”不能保证由收件服务器执行。审核建议将三秒定义为表单提交反馈的性能目标，另验证管理员邮件实际到达；此项指标修订待确认。不能将 Resend 接受请求等同于已进入收件箱。

当前无持久数据层：询盘主要留存于业务邮箱与 Resend 的服务日志，隐私政策须反映实际处理者、保存期限和跨境安排。

### 5.5 OEM / ODM 四步流程

| 步骤 | 保留的原文要求 | 审核提示 |
|---|---|---|
| 01 / Select & Sample | 选规格、申请 Sample Box 验收 | 依据 D2 将“下单”改为“申请” |
| 02 / Brand Customization | Logo 矢量文件、激光 / 丝印 / 提花织唛 / 硅胶标、Pantone 对色 | 正式能力逐项核实；RFQ 不擅自增加文件上传服务，资料可后续邮件沟通 |
| 03 / Studio-Grade QA | 来料、制程拉伸防滑、出厂检测 | 与第 6 章保持一致 |
| 04 / Global DDP Delivery | 双清含税、场馆 / 海外仓配送 | 保留原业务目标；覆盖国家、清关与税费能力待取证，未确认前不得上线全球 DDP 的绝对承诺 |

步骤数字使用 Cormorant Garamond 32px；原 0.5px 虚线可在高像素密度屏测试，建议 1px 作为清晰度兜底，不把 CSS 小数像素说成技术栈不支持。

### 5.6 WhatsApp 挂件

- 右下角常驻，触控区域至少 44×44px，考虑安全区与内容遮挡；菜单 / RFQ 打开时隐藏。
- `https://wa.me/<国际号码纯数字>?text=<编码文案>`，安全的新标签链接与可访问名称；不加载第三方挂件脚本。
- 预设文案保留：`Hi GLINTIC team, I am interested in bulk studio supply for our facility. Could you please share the latest wholesale catalog and quotation?`
- 正式号码由业务方提供；配置为空时不渲染假链接。桌面和移动端唤起结果取决于设备安装与账户状态，验收分别测试。

## 6. 工坊、质检与认证

### 6.1 实拍与企业主体

保留针织机台、发泡硫化线、数控激光雕刻机与包装线的真实、洁净、明亮画面要求。

`company.ts` 同时有 Trading Company 与 manufacturer 文案，存在口径冲突。只能确认仓库这样写，不能凭此断言实际企业登记或工厂产权。业务方需提供主体信息和工厂关系：

- 自有工厂：用可证明的自有车间实拍。
- 合作工厂网络：明确标为合作工厂，不宣传为自有设施。
- 不用图库或 AI 场景冒充真实生产线。

### 6.2 四级 QA

| 层级 | 原文检查内容 |
|---|---|
| IQC | 原料安全性 / 原文环保无毒测试、色牢度 |
| IPQC | 厚度、回弹、表面防滑摩擦系数 |
| FQC | 外观、Logo 附着、气味挥发 |
| OQC | 包装跌落、条码核对、封箱防潮 |

保留四级结构，测试项目、执行频率与记录须业务确认。FQC 全检与 OQC 抽检应分别说明，不把“所有成品外观检查”扩大为“所有材质所有性能均逐件检测”。环保与无毒声明应明确标准、报告及适用产品。

### 6.3 认证墙

原文要求的 OEKO-TEX Standard 100、GOTS、BSCI、SGS 全部保留在待核验清单；不擅自删除要求，也不把代码中已有文字视为证书。

| 条目 | 核验要求 |
|---|---|
| OEKO-TEX Standard 100 | 有效证书、持证主体、产品范围、编号与徽标使用条件 |
| GOTS | 持证主体、认证范围、供应链与具体产品资格；不能覆盖所有棉制品 |
| amfori BSCI | 社会责任审核报告、工厂、日期与允许的宣传方式；不笼统写成产品认证 |
| SGS | 具体检测报告、测试标准、样品与结果，不使用无范围的 SGS Certified 承诺 |
| ISO 14001 | 当前代码已有此文案，属于补充候选；不替代原文四项要求，先取得证据 |

REACH 与 RoHS 适用范围不同；RoHS 仅对适用的电子电气产品核实，本目录电动按摩球应单独判断。非电子辅具不因目录统一模板而挂 RoHS。

视觉保留 surface 白底、柔和浮雕与微投影卡片。正式上线只展示已核实且授权可用的条目；未提供证据不是“已经确认没有认证”，而是该项尚未完成验收。

## 7. 响应式布局

保留原宽度与内边距，将断点写成互不重叠区间：

| 视口 | 容器最大宽度 | 左右内边距 | 核心布局 |
|---|---|---|---|
| `<640px` | 100% | 16px | 单列；色卡可两列 |
| `640–<1024px` | 100% | 24px | 两列产品、两列步骤 |
| `1024–<1280px` | 1200px | 32px | 三至四列产品、四列步骤 |
| `≥1280px` | 1440px | 40px | 十二列版式栅格，内部按模块分配 |

- 容器为 `width:100%`、`box-sizing:border-box`，最大宽度包括内边距，避免窄桌面溢出。
- 原文色卡微瀑布流可使用当前 CSS / React 实现，不需要新依赖；建议等高两列网格提升阅读顺序，设计确认后选择，不把瀑布流直接判为技术栈之外。
- 所有关键控件至少 44×44px；200% 缩放可操作；长品名、国家名和错误信息不造成整页横向滚动。
- 390px、640px、1024px、1280px、1440px 验证边界；产品横向轨道若保留，局部滚动不得撑大整个页面。

## 8. 后续实施验收清单

### 8.1 技术与视觉

- [ ] 依赖仍为当前技术栈；未引入 Framer Motion、Lucide、Resend SDK、支付 SDK、数据库或独立后端。
- [ ] Tailwind 4 CSS-first 配置；18 个原色值与两项原阴影一致，无第二套漂移的硬编码 palette。
- [ ] 字体组合经确认，加载机制仍为 `next/font`；仅实际使用 400 / 500，移除旧额外字重。
- [ ] `npx tsc --noEmit` 无错误、`npm run lint` 无错误；原生图片规则 warning 按既有架构说明。
- [ ] 生产构建保持页面 Static，RFQ POST 为 Route Handler；构建前避免与运行服务争用 `.next`。
- [ ] 首页顺序、公告、胶囊 CTA、五集合、四步骤、样品盒、工坊、故事和 Footer 均符合原文。

### 8.2 产品与真实性

- [ ] 66 个旧 SKU 均有映射或 More 归属，没有丢失或重复归属；草案里的材质与规格冲突已业务复核。
- [ ] 19 个原系列定义有据可查；G-18 不擅自填充，Made-to-Order 与真实库存明确区分。
- [ ] 每卡规格与询盘入口有效；前台无旧商品价格与阿里详情跳转；无嵌套交互控件。
- [ ] 价格筛选、价格排序和旧 URL 状态已妥善退场；合法筛选刷新、前进后退及 Load more 正常。
- [ ] 五款核心微距图与标签逐 SKU 取证，版权、材质、性能与工厂身份真实。
- [ ] 样品盒内容、US$39、运费与返还条件经确认，不擅自改退款为抵扣。
- [ ] 认证条目有有效证据与展示许可，无未经证明的环保或认证承诺。

### 8.3 RFQ 与通信

- [ ] 四类入口正确打开抽屉，系列 / SKU / Sample Box 预填准确；More 商品可单独询盘。
- [ ] 合法提交得到真实服务端结果；管理员收信字段完整、Reply-To 正确；失败可重试且不丢数据。
- [ ] 非法输入、超大请求、未知 SKU、上游超时和发信失败有明确处理；没有“提交太快就丢弃”的误杀规则。
- [ ] 密钥未进入客户端、仓库或日志；服务商域名已验证；重复提交幂等策略可测试。
- [ ] 抽屉焦点限制、Esc、归还焦点、背景 inert、滚动锁与无 JS 兜底通过。
- [ ] 如启用回执，单独验证防滥用、发送结果与隐私告知，不承诺未经测试的自动回执功能。
- [ ] WhatsApp 正式号码、预设文案、移动 / 桌面链接与浮层避让通过。

### 8.4 性能、SEO 与部署

- [ ] 图片继续使用 WebP 预编码、manifest 与响应式 `<img>`；原 WebP/AVIF 要求优先以已实现的 WebP 达成，不为格式改架构。
- [ ] Lighthouse 移动与桌面 Performance 均 >90；记录工具版本、生产模式、测试设备与运行条件，不把历史 LCP 数据当本版结果。
- [ ] 文字对比度、键盘操作、减弱动效、无横向溢出和触控目标通过。
- [ ] 品牌显示全大写；metadata、OG、JSON-LD、canonical、sitemap 与新定位和域名一致；子页用现有 `pageOpenGraph()` 保证分享图完整。
- [ ] 根域与 www 归一策略经确认；两者 HTTPS 有效，重定向无循环。不要预设平台一定使用某个固定 IP、状态码或单跳链。
- [ ] Porkbun DNS 按 Vercel 当前面板配置，邮箱与 Resend 记录不相互破坏；`NEXT_PUBLIC_SITE_URL` 配置后重新构建。
- [ ] 正式收信邮箱、WhatsApp、运营主体与隐私政策均真实可用。

## 9. 主要审核问题登记

P0：上线真实性或关键链路阻断；P1：需求与实现冲突或缺关键条件；P2：规范细节与体验补充。等级用于优先级，不等于已经判定违法。

| 编号 | 问题 | 级别 | 处理 / 状态 |
|---|---|---|---|
| T01 | 原文列 Framer Motion / Lucide，当前无依赖 | P1 | 用现有 CSS、hook 与 SVG 适配 |
| T02 | 原文 Tailwind JS 配置与项目 CSS-first 不一致 | P1 | 保留原色值，改 `@theme` 写法；不声称 Tailwind 4 绝对不能兼容 JS 配置 |
| T03 | 原文 CSS 语义变量与色名命名容易混淆 | P2 | 显式映射并保持单一来源，不简单断言双轨必然错误 |
| T04 | 在线支付、服务商和订单闭环未定义 | P1 | D2 已确认一期样品申请；托管支付链接也能零 SDK，支付本身不是必须引入 SDK |
| T05 | RFQ 发信方案原为二选一 | P1 | D3 已确认 Resend REST + Route Handler |
| T06 | 三秒到收件箱不可由站点保证 | P1 | 反馈性能与实际到达分开，指标修订待确认 |
| V01 | caption、sage 白字、部分辅助文字对比不足 | P1 | 保留 palette，调整使用组合与语义，不自行改色值 |
| V02 | 标题 / 正文多字体选项未定 | P2 | 推荐 Jakarta + Cormorant，业务确认后实施 |
| C01 | G-18 缺号，实际只有 19 个定义 | P1 | 待原件 / 业务补齐，不编造 |
| C02 | 五集合 / G 系列与 66 个旧 SKU 不一致 | P1 | D1 已确认映射与 More；47 / 19 为待复核草案 |
| C03 | G-04、G-08、G-10、G-16、G-20 存在材质或结构不匹配 | P1 | 系列原意保留，逐 SKU 核验与分型 |
| C04 | 无本地 SKU 被误当成无库存 / 无供应能力 | P1 | 仅报告目录缺口，Made-to-Order 报价前确认 |
| C05 | 微距标签与实际材质、认证未对应 | P0 | 正式稿逐 SKU 取证，缺图补拍 |
| F01 | 旧整卡阿里外链与询盘按钮组合冲突 | P1 | D4 已确认移除外链与价格，重组卡片 |
| F02 | 数量区间与整十数输入缺少兼容规则 | P2 | 保留两项原意，建议区间 + 可选精确数量，待确认 |
| F03 | DDP / CIF 自动运费计算缺规则与数据 | P1 | 信息收集保留，人工报价；自动计算范围待确认 |
| F04 | 模态抽屉、失败态、校验与防滥用未定义 | P1 | 仅用当前 React / Route Handler 补充要求 |
| B01 | 原退款政策与首单抵扣不是同一政策 | P1 | 保留原文，业务补充返还条件 |
| B02 | 软木样块不在本地目录，不能自动替换为 EVA | P1 | 保留原盒内清单，核实实物来源 |
| B03 | Trade Company 与 manufacturer 文案冲突 | P0 | 查企业主体与工厂关系，不凭代码断言产权 |
| B04 | 认证、环保、抗菌、DDP 全球承诺缺证据 | P0 | 原要求保留，正式上线必须核实 |
| O01 | 正式域名、邮箱、WhatsApp 与 DNS 未完成 | P1 | 待配置与测试；本次无外部变更 |

### 9.1 与既有报告的关系

后续真正完成 D4 或移除无效订阅入口后，再更新 `docs/site-audit-2026-11.md` 的遗留项。当前不能因本文件写了需求就标记修复完成；阿里来源采集记录也无需因此删除。

## 10. 业务方待确认清单

以下内容不阻止本审核文档交付，但影响最终实施定稿或正式上线：

| 项目 | 需要确认的内容 |
|---|---|
| 原件与 G-18 | 两份引用 docx；缺失编号是否保留、补齐或取消 |
| Slogan 与字体 | 三个 Slogan 的最终选择；原文允许范围内的标题 / 正文字体组合 |
| SKU 映射 | 47 / 19 草案、材质冲突、Made-to-Order 供应能力与 MOQ |
| Sample Box | 真实五项实物、五色色卡和手册、US$39 是否含运费、发货国家与返还机制 |
| 数量与邮编 | 区间边界、精确数量、无邮编国家的输入规则 |
| 运费与 DDP | 自动计算是否一期范围；运价数据；清关税费与覆盖国家 |
| 主体与工厂 | 公司正式名称、真实经营身份、自有 / 合作关系及实拍授权 |
| 认证与材质 | 证书、报告、适用 SKU、有效期、徽标许可与环保宣称证据 |
| RFQ 服务 | 正式收信 / 发信邮箱、Resend 账户、三秒指标口径、是否自动回执及回复时效 |
| WhatsApp 与域名 | 正式号码、canonical 根域 / www 策略、Vercel 与 Porkbun 配置权限 |
| 隐私政策 | 数据处理主体、依据、保存期限、外部处理者、跨境安排与联系渠道 |

结论：保留原说明书业务与视觉要求，以 D1–D4 的已确认变更消除主要冲突；技术实现限定在当前项目架构。所有未取证或未确认的商业事项显式留待确认，不默认为“已实现”“有现货”“有认证”或“已批准变更”。
