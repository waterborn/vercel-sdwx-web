# GLINTIC Studio 独立站完整建站需求说明书 (PRD & Frontend Specs v3.0)

> **项目名称**：GLINTIC Studio 官方 B2B 品牌与供应链官网  
> **域名**：`glinticstudio.com`（DNS 管理商：Porkbun）  
> **部署与托管平台**：Vercel  
> **技术栈基线**：Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion + Lucide React  
> **输入依据**：  
> 1. 《独立站计划第2版.docx》（业务定位、5 大产品集合、G-01~G-20 编号、B2B 转化功能）  
> 2. 《美学视觉开发规范.docx》（设计原则、Design Tokens 色值、排版字号层级、图像微距要求、组件 UI 规范）  
> 3. 对标参考：Manduka B2B / Custom Branding 架构模式  
> **版本**：v3.0（美学规范与业务计划完整融合版）  
> **更新日期**：2026-11-22  

---

## 1. 业务与品牌定位 (Brand & Business Positioning)

### 1.1 核心定义（源自《独立站计划第2版.docx》）
- **品牌英文名**：`GLINTIC` / `GLINTIC Studio`
- **行业定位**：B2B 瑜伽与普拉提场馆一站式辅具供应链服务商 (One-Stop Yoga & Pilates Studio Supply & Private Label Partner)
- **核心价值主张 (Slogan 备选项)**：
  - Option 1: *GLINTIC | One-Stop Yoga & Pilates Studio Supply Solutions*
  - Option 2: *GLINTIC | Premium Yoga & Pilates Props for Studios & Brands*
  - Option 3: *GLINTIC | Your Trusted Studio Sourcing & Customization Partner*
- **主要买家画像**：
  1. 欧美中高端瑜伽与普拉提工作室 (Studios / Boutique Fitness)
  2. 运动品牌商与 DTC 卖家 (Private Label / Brand Owners)
  3. 酒店、SPA、康养度假村 (Hotel & Wellness Resorts)
  4. 场馆前台零售采购 (Studio Retail Corner Buyers)

### 1.2 核心设计哲学（源自《美学视觉开发规范.docx》）
- **三大设计原则**：
  1. **Quiet Luxury (静奢工坊)**：摆脱冰冷代工感，呈现温润、自然、空间留白与身心疗愈感。
  2. **Tactile Material Truth (触感即信任)**：通过微距实拍呈现高密度、防滑、环保材质质感。
  3. **Editorial Elegance & B2B Clarity (杂志级排版与 B2B 结构)**：优雅字形排版与严谨参数结构并存。

---

## 2. 完整 Design Tokens 规范（源自《美学视觉开发规范.docx》）

### 2.1 颜色系统 (Color Palette Tokens)

前端开发需直接在 `tailwind.config.js` 中配置以下 `glintic` 命名空间颜色：

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        glintic: {
          // 1. Canvas / Backgrounds (画布与底层背景)
          cream: '#FAF8F5',       // 全局主背景色 (Warm Cream，替代生硬纯白)
          linen: '#F4F1EA',       // 浅亚麻色 (卡片底色、Hover 浅背景、次级容器、通知条)
          surface: '#FFFFFF',     // 纯白高光卡片 (悬浮卡片、弹窗与表单输入框)

          // 2. Typography & Deep Accents (文字与深色结构)
          charcoal: '#1A1A1A',    // 炭黑主文字 (主标题、主要按钮底色)
          slate: '#363939',       // 深石板灰 (副标题、产品 Logo 专用标色、深色边框)
          muted: '#6F736F',       // 辅助说明文本 (参数键名、次要描述、面包屑导航)
          caption: '#969B96',     // 弱化文本与占位符 (表单 Placeholder、失效态)

          // 3. Brand Signature Accents (品牌点睛色)
          sage: {
            DEFAULT: '#7A8B7B',   // 品牌鼠尾草绿 (生态认证、主转化按键 Hover、核心标签)
            light: '#EAF0EA',     // 浅鼠尾草软底 (Trust Badges 浅色背景胶囊)
            dark: '#4F5D50',      // 深鼠尾草绿 (深色按键强调态)
          },
          cork: {
            DEFAULT: '#D4A373',   // 软木暖褐 (天然材质标签、定制工艺点缀)
            light: '#F8F1EA',     // 浅软木底色 (高亮卡片背景)
          },
          champagne: {
            DEFAULT: '#C5A880',   // 香槟冷金 (VIP 定制、Sample Box 礼盒徽标)
            light: '#F5EFE6',
          },
          peach: {
            DEFAULT: '#E8C5B8',   // 柔和蜜桃粉 (疗愈与女性系列 Accent)
            light: '#FAF1EE',
          },

          // 4. Lines, Dividers & Borders (微细分割线)
          line: '#EAE7E1',        // 极细主分割线 (0.5px~1px 柔和分隔)
          lineDark: '#D8D4CC',    // 强调描边 (输入框激活边框、卡片深色边框)
        }
      }
    }
  }
}
```

### 2.2 CSS 变量 (globals.css)

```css
:root {
  --glintic-bg-primary: #FAF8F5;
  --glintic-bg-secondary: #F4F1EA;
  --glintic-surface: #FFFFFF;
  --glintic-text-primary: #1A1A1A;
  --glintic-text-secondary: #6F736F;
  --glintic-text-muted: #969B96;
  --glintic-border: #EAE7E1;
  --glintic-border-dark: #D8D4CC;

  --glintic-accent-sage: #7A8B7B;
  --glintic-accent-sage-bg: #EAF0EA;
  --glintic-accent-cork: #D4A373;
  --glintic-accent-champagne: #C5A880;
  --glintic-accent-peach: #E8C5B8;

  --glintic-shadow-ambient: 0 4px 20px -2px rgba(26, 26, 26, 0.04);
  --glintic-shadow-hover: 0 12px 32px -4px rgba(26, 26, 26, 0.08);
}
```

### 2.3 字体排印规范 (Typography Hierarchy)

- **字体家族**：
  - 标题（Headings）：`Plus Jakarta Sans` / `Outfit`
  - 衬线点缀（Brand Story & 强调）：`Cormorant Garamond`
  - 正文与参数（Body / Specs / Form）：`Inter` / `Plus Jakarta Sans`
- **字重约束**：只使用 `Regular 400` 与 `Medium 500`（避免 Bold 700 的笨重感）。

| 层级 | 桌面端 (Desktop) | 移动端 (Mobile) | 字重 | 行高 | 字间距 | 适用场景 |
|---|---|---|---|---|---|---|
| **Display H1** | 56px (3.5rem) | 36px (2.25rem) | 500 | 1.15 | -0.02em | Hero 首屏主标语 |
| **Section H2** | 36px (2.25rem) | 26px (1.625rem) | 500 | 1.25 | -0.01em | 模块大标题、Collections 标题 |
| **Card H3** | 22px (1.375rem) | 18px (1.125rem) | 500 | 1.35 | 0 | 产品卡片标题、工艺步骤标题 |
| **Subtitle / Lead** | 18px (1.125rem) | 15px (0.9375rem) | 400 | 1.60 | 0 | Hero 辅助副标、模块导语 |
| **Body (正文)** | 15px (0.9375rem) | 14px (0.875rem) | 400 | 1.65 | 0 | 详情描述、品牌故事、常见问题 |
| **Specs & UI (参数)**| 13px (0.8125rem) | 12px (0.75rem) | 400/500 | 1.50 | +0.02em | MOQ 阶梯、规格表、色卡标签 |
| **Badge & Overline** | 11px (0.6875rem) | 11px (0.6875rem) | 500 | 1.20 | +0.08em (全大写) | 顶部类别标签、Trust Badge 徽章 |

---

## 3. 页面模块与结构规范 (Page Architecture & Layout)

```
Top Announcement Bar (浅亚麻色 #F4F1EA)
  ↓
Sticky Header (毛玻璃 rgba(250,248,245,0.85) + 双 CTA 胶囊)
  ↓
Hero Section (大片级视觉 + 品牌 Slogan + Trust Badges 浮层)
  ↓
5 大产品集合矩阵 (Curated Collections Grid)
  ↓
OEM / ODM 4 步定制工坊流程 (4-Step Workflow)
  ↓
GLINTIC Sample Box 专属样品盒 ($39 转化模块)
  ↓
现代工坊设备与质检规范 (Workshop, QC & Certifications)
  ↓
品牌故事与可持续承诺 (Brand Story & Eco-Vision)
  ↓
Global RFQ 询盘与抽屉中心 (Slide-over Drawer & Form)
  ↓
Footer (多列导航、合规说明与直达联系方式)
```

---

## 4. 核心产品矩阵规范（源自《独立站计划第2版.docx》）

### 4.1 五大产品集合与 SKU 清单

#### Collection 1: Yoga & Pilates Essentials (核心基础款)
- `G-01` Yoga Mat Series (折叠瑜伽垫、TPE 垫、天然橡胶垫)
- `G-02` High-Density Yoga Blocks (高密度 EVA / 软木瑜伽砖)
- `G-03` Fascia & Lacrosse Massage Balls (单球/花生球筋膜按摩球)
- `G-04` Soft Neoprene Hand Dumbbells (浸塑手骨哑铃)

#### Collection 2: Pilates Props & Resistance (普拉提小器械)
- `G-05` Resistance & Booty Bands (编织弹力带 / 乳胶阻力圈)
- `G-06` Pilates Magic Circle (普拉提魔力圈)
- `G-07` Pilates Mini Stability Balls (普拉提迷你球 / 核心球)
- `G-08` High-Density Foam Rollers (高密度泡沫轴)
- `G-09` Adjustable Ankle & Wrist Weights (可调节手腕与脚踝负重)

#### Collection 3: Restorative & Meditation (疗愈与辅具)
- `G-10` Yoga Straps & Stretching Belts (纯棉瑜伽拉伸带)
- `G-11` Yoga Bolsters (圆柱/长条瑜伽抱枕)
- `G-12` Studio Meditation Blankets (场馆纯棉/羊毛冥想毯)
- `G-13` Eye Pillows (决明子/薰衣草真丝眼枕)
- `G-14` Ergonomic Meditation Cushions (Zafu & Zabuton 冥想坐垫地垫)

#### Collection 4: Studio Hygiene & Textiles (场馆织物与卫生)
- `G-15` Studio Non-Slip Grip Socks (专业防滑瑜伽袜/普拉提袜)
- `G-16` Microfiber sweat & Towel & Mat Towels (超细纤维防滑铺巾/手汗巾)
- `G-17` Anti-Bacterial Equipment Cleaning Cloths (器械抗菌清洁擦拭布)

#### Collection 5: Retail Corner & Merchandise (前台零售与周边)
- `G-19` Stainless Steel Insulated Water Bottles (双层不锈钢保温运动水壶)
- `G-20` Canvas Studio Tote Bags & 2-in-1 Yoga Mat Carry Strap (帆布托特包与二合一垫带)

### 4.2 核心产品微距实拍与标注规范（源自美学规范）

| 产品编号与品名 | 关键微距对焦要求 | 屏幕微文案对位标注 (On-Screen Micro Copy) |
|---|---|---|
| **G-01 折叠瑜伽垫** | 45° 侧光实拍压花方格纹理、折叠分块边缘包边缝线、左下角深石板灰 Logo | `High-Density TPE / Natural Rubber`<br>`Anti-Slip Grid Texture` |
| **G-02 软木瑜伽砖** | 天然栓皮栎橡树皮颗粒孔隙、高精度激光镭雕边缘无烧焦发黑 | `100% Sustainable Organic Cork`<br>`Precision Laser Engraving` |
| **G-05 编织弹力带** | 紧密涤棉混纺提花纹理、内侧 2 条平行防卷边透明立体防滑硅胶丝 | `Anti-Rolling Silicone Grip Strip`<br>`Double-Stitched Seams` |
| **G-10 纯棉拉伸带** | 2.5mm 加厚纯棉织造纹理、无缝焊接哑光合金 D 环 | `Heavyweight Organic Cotton`<br>`Matte Nickel Alloy D-Rings` |
| **G-15 防滑瑜伽袜** | 脚底立体半球形蜂窝点胶颗粒、足弓环形加固弹力包裹带 | `Ergonomic PVC/Silicone Grip Dots`<br>`Reinforced Arch Compression` |

---

## 5. B2B 核心转化功能与交互规范

### 5.1 GLINTIC Sample Box 样品盒模块（源自两份文档融合）
- **定位**：降低初次采购门槛，将大买家决策链路大幅缩短。
- **盒内标配内容**（美学规范定稿）：
  1. Mini G-01 折叠垫实物样块
  2. Mini G-02 软木砖刻字样块
  3. G-05 弹力带 5 色色卡串
  4. G-15 专业防滑袜实物一双
  5. GLINTIC 纸质精装材质与工艺手册
- **价格与权益政策**：
  - 定价：**\$39.00 USD**（支持线上极速支付：PayPal / 信用卡）
  - 核心条款标注：`Fully Refundable on Bulk Order`（大货采购全额返还打样费）

### 5.2 批量采购询价系统 (Request a Bulk Quote / RFQ)
- **触发入口**：
  1. 顶部 Header 悬浮按钮 `[Request a Quote]`
  2. 每个产品详情卡片 `[Inquire This Item]`（自动注入当前产品编号如 G-01）
  3. 底部全幅 Contact Section
- **交互形式**：480px 宽度右侧滑出抽屉（Slide-over Drawer），背景毛玻璃遮罩。
- **结构化字段清单**：
  - `Contact Name`（必填，采购人姓名）
  - `Business Email`（必填，企业邮箱）
  - `Company / Studio Name`（必填，场馆/公司名称）
  - `Country & Zip Code`（必填，用于系统计算 DDP / CIF 门到门运费）
  - `Target Product`（下拉多选或当前页自动带入编号）
  - `Order Quantity`（采购数量梯度：`10-50 pcs`, `50-200 pcs`, `200-500 pcs`, `500-1000 pcs`, `1000+ pcs`，支持整十数输入）
  - `Customization Options`（定制项勾选：`No Logo (Blank)` / `Laser Engraved` / `Silk Screen` / `Custom Colorway` / `Custom Packaging` / `Full ODM`）
  - `Project Details & Notes`（多行文本输入）
- **邮件推送机制**：通过 Web3Forms 或 Resend API 在 3 秒内将完整表单推送至管理员收件箱。

### 5.3 OEM / ODM 定制 4 步工坊流程
采用极细 `0.5px` 虚线连接卡片，步骤数字采用 `Cormorant Garamond 32px` 弱化展示：
- **01 / Select & Sample**：选择产品基础规格，下单 Sample Box 快速质检验收。
- **02 / Brand Customization**：提供 Logo 矢量图（支持激光刻印、丝印、提花织唛、硅胶标），支持 Pantone 对色。
- **03 / Studio-Grade QA**：经过来料检测、制程拉伸防滑测试与出厂全检。
- **04 / Global DDP Delivery**：全球门到门双清含税运输，直达场馆前台或海外仓库。

### 5.4 即时通讯挂件 (WhatsApp Floating Widget)
- 页面右下角常驻 WhatsApp 图标。
- 预设点击深链接文案：“Hi GLINTIC team, I am interested in bulk studio supply for our facility. Could you please share the latest wholesale catalog and quotation?”

---

## 6. 工厂实力、质检与认证背书 (Workshop & Quality Assurance)

### 6.1 车间与设备实拍规范
- 必须使用高洁净度、柔和明亮光线的真实生产线画面：自动化针织机台、发泡硫化生产线、数控激光雕刻机、无尘包装流水线。

### 6.2 四级质检标准 (QA Hierarchy)
- **IQC (来料质检)**：环保原料无毒测试、色牢度检测。
- **IPQC (制程质检)**：厚度均匀度、回弹率、表面防滑摩擦系数检测。
- **FQC (成品全检)**：外观平整度、Logo 附着牢固度、气味挥发测试。
- **OQC (出厂抽检)**：包装跌落测试、条码扫描核对与封箱防潮测试。

### 6.3 国际认证徽标墙 (Certifications Wall)
统一采用白底浮雕微投影卡片呈现：
- `OEKO-TEX Standard 100`（生态纺织品认证）
- `GOTS`（全球有机纺织品标准）
- `BSCI`（商业社会标准体系认证）
- `SGS`（REACH / RoHS 环保无毒检测报告）

---

## 7. 响应式布局与断点标准 (Responsive Layout)

| 屏幕断点 | 容器最大宽度 (Max-width) | 左右内边距 (Padding) | 核心列数分布 (Grid Layout) |
|---|---|---|---|
| **Mobile (< 640px)** | 100% | 16px | 单列流式 / 2 列色卡微瀑布流 |
| **Tablet (640px ~ 1024px)** | 100% | 24px | 2 列产品矩阵 / 2 列定制流程 |
| **Desktop (1024px ~ 1280px)** | 1200px | 32px | 3~4 列产品矩阵 / 4 列流程卡片 |
| **Wide Screen (> 1280px)** | 1440px | 40px | 标准 12 列栅格系统 |

---

## 8. 技术栈与上线交付检查清单 (Launch Checklist)

- [ ] **Tailwind Design Tokens 全量注入**：检查 `cream`、`linen`、`charcoal`、`sage`、`cork` 等色彩变量是否准确配置。
- [ ] **字体加载与字重限制**：引入 `Plus Jakarta Sans`、`Inter` 与 `Cormorant Garamond`，全局禁止使用非法的 Bold 700 样式。
- [ ] **5 大 Collection 与 G-01~G-20 完整上架**：每款产品拥有完整的参数、微距对焦标签与询盘按钮。
- [ ] **Sample Box 极速支付对接**：\$39.00 USD 样品盒支付通道测试（Stripe/PayPal Sandbox 跑通）。
- [ ] **RFQ 表单与抽屉端到端收信测试**：提交测试数据，确认企业邮箱在 3 秒内收到结构化字段邮件。
- [ ] **WhatsApp 浮窗唤起与深链接测试**。
- [ ] **响应式与性能优化**：图片开启 WebP/AVIF，Lighthouse 移动端与桌面端性能得分均 > 90。
- [ ] **Porkbun 域名绑定与 SSL**：`https://glinticstudio.com` 与 `https://www.glinticstudio.com` 正常通过 Vercel CDN 加速访问。
