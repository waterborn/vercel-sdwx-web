# GLINTIC Studio 开发任务一：全局导航 (Mega Menu) 升级与首页信息流重构

> **任务编号**：DEV-TASK-001  
> **优先级**：P0 (核心基础架构)  
> **适用范围**：`Header` 导航组件、`MegaMenu` 下拉大菜单、`Home Page` 首页信息流布局、`Quick Inquire` 轻量化询盘抽屉/表单  
> **设计基调**：Quiet Luxury (静奢风) × Organic Minimalist (有机极简)

---

## 一、 任务目标与背景

当前网站的底层架构已具备良好雏形，但**顶部导航缺少产品分类穿透能力**，且**首页底部表单过于冗长复杂**，容易造成海外高净值馆主流失。  
本任务旨在：
1. **Header 导航升级**：桌面端引入 **5 大品类 Mega Menu 下拉大菜单**，移动端优化为折叠抽屉导航。
2. **首页信息流精简**：建立“**3秒心智 ➔ 5大品类 ➔ 定制实力 ➔ $39 样品盒 ➔ 资质背书 ➔ 30秒极简询盘**”的高转化漏斗。
3. **视觉素材规范植入**：规范色彩 Token 与 Sample Box 视觉。

---

## 二、 全局导航栏 (Header & Mega Menu) 开发需求

### 1. 桌面端导航结构与交互

```
[ Top Announcement Bar: ✨ Studio Sample Box Available | Low MOQ Private Label | Worldwide DDP Delivery ]
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│  GLINTIC STUDIO     Collections ▾     Custom Branding     Sample Box ($39)     About & QA     Contact  │
│  [Logo / 品牌字]    (Mega Menu)       (/about#custom)     (/#sample-box)       (/about)       (/#contact)│
│                                                                                                        │
│                                           [ CTA 1: Order Sample Box ]   [ CTA 2: Request a Quote ]     │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

* **Header 样式属性**：
  * **高度**：`72px` (Sticky 吸顶常驻)
  * **背景色**：`rgba(250, 248, 245, 0.85)` + `backdrop-blur-md`
  * **下边框**：`1px solid rgba(234, 231, 225, 0.6)`
  * **Logo**：`GLINTIC STUDIO`，字体 `Plus Jakarta Sans` 500 字重，全大写，`letter-spacing: +0.08em`。

### 2. Mega Menu (Collections 下拉大菜单面板)

当鼠标悬停在 `Collections ▾` 时，向下滑出全宽/居中浮层面板：

* **浮层规格**：最大宽度 `1140px`，背景 `#FFFFFF`，圆角 `12px`，带柔和弥散阴影 `0 12px 32px -4px rgba(26,26,26,0.08)`。
* **内容分为 5 列（对应 5 大功能区产品线）**：
  1. **Collection 01 · Yoga Essentials**
     * 涵盖：`G-01 Foldable Mat` / `G-02 Cork Blocks` / `G-10 Cotton Straps`
     * 跳转：`/products?cat=yoga-essentials`
  2. **Collection 02 · Pilates Sculpt**
     * 涵盖：`G-05 Fabric Resistance Bands` / `G-06 Magic Circle` / `G-07 Stability Ball` / `G-09 Ankle Weights` / `G-04 Dumbbells`
     * 跳转：`/products?cat=pilates-sculpt`
  3. **Collection 03 · Restorative**
     * 涵盖：`G-11 Bolsters` / `G-12 Blankets` / `G-13 Eye Pillows` / `G-14 Zafu Cushions`
     * 跳转：`/products?cat=restorative`
  4. **Collection 04 · Fascia Recovery**
     * 涵盖：`G-03 Fascia Balls` / `G-08 Foam Roller`
     * 跳转：`/products?cat=fascia-recovery`
  5. **Collection 05 · Studio Retail**
     * 涵盖：`G-15 Grip Socks` / `G-16 Microfiber Towels` / `G-17 Cleaning Cloths` / `G-19 Insulated Bottles` / `G-20 Tote Bags & Mat Straps`
     * 跳转：`/products?cat=studio-retail`
* **底部 Bar**：`[ → Browse All 66 Catalog Items ]` 快速入口。

---

## 三、 首页 (Home Page) 信息流重构规范

请按照以下 **6 大黄金模块顺序** 重新编排首页：

### 模块 1：Hero Section (首屏视觉黄金区)
* **主文案排版**：
  * Badge 胶囊：`B2B STUDIO SUPPLY SOLUTIONS` (背景 `#EAF0EA`，文字 `#4F5D50`)
  * H1 标题：**One-Stop Studio Supply.<br/>Crafted for Sacred Movement.** (字体 `Plus Jakarta Sans`，500 字重，炭黑 `#1A1A1A`)
  * 副标：*High-density props engineered for high-frequency studio use, backed by low-MOQ custom branding and global DDP fulfillment.*
* **双 CTA 按钮**：
  * 主按钮：`[Order Studio Sample Box]`（实心炭黑背景 `#1A1A1A`，文字 `#FAF8F5`，Hover 变 `#7A8B7B` 鼠尾草绿）
  * 副按钮：`[Explore 5 Collections]`（`1px solid #1A1A1A` 细边框，透明背景）
* **4 大 Trust Badges 浮层**：
  * `✓ 10 pcs Low MOQ` | `✓ 7-Day Express Sampling` | `✓ Eco-Certified Materials` | `✓ DDP Door-to-Door`

### 模块 2：Curated Collections (5 大产品矩阵卡片)
* **布局**：3 列网格（第二行 2 列居中），卡片白底 `#FFFFFF`，圆角 `12px`，边框 `1px solid #EAE7E1`。
* **动效**：鼠标 Hover 时卡片轻微上浮 `translateY(-4px)`，图片平滑轻微缩放 `scale: 1.03`。

### 模块 3：OEM/ODM 定制服务 (4-Step Workflow)
* **流程节点**：
  * `01 / Select & Sample` (选品与快速拿样)
  * `02 / Brand Customization` (Logo 镭雕/提花/硅胶压印/色卡匹配)
  * `03 / Studio-Grade QA` (四重质检与环保合规测试)
  * `04 / Delivery Planning` (全球门到门 DDP 双清直达)
* **样式**：数字采用 `Cormorant Garamond` 优雅字体放大展示（`32px`），节点间采用 `0.5px` 极细虚线相连。

### 模块 4：GLINTIC Sample Box 样品盒专区 (核心转化引擎)
* **左侧**：展示 **Sample Box 实物开箱大片**（已提供官方渲染资产：`GLINTIC_Sample_Box_Unboxing_Visual.png`）。
* **右侧**：
  * 标题：**The GLINTIC Studio Sample Box.**
  * 价格标签：`US$39.00` *(Fully Refundable on Bulk Order / 大货全额抵扣)*
  * 样品包含清单（带小图标）：
    * `01` G-01 折叠瑜伽垫实物样块 (Sage Green)
    * `02` G-02 天然软木砖激光雕刻样块
    * `03` G-05 编织弹力带 5 色色卡串
    * `04` G-15 场馆防滑袜实物一双
    * `05` GLINTIC 纸质精装材质与工艺手册
  * 按钮：`[Request a Sample Box ↗]`

### 模块 5：工坊品质与四重 QA (IQC/IPQC/FQC/OQC) + 证书墙
* **四阶段质检**：IQC (来料) ➔ IPQC (制程) ➔ FQC (成品) ➔ OQC (出货)。
* **证书墙 (Trust Badges)**：
  * OEKO-TEX Standard 100 / GOTS / BSCI / SGS 徽标做成低饱和白底浮雕卡片，点击支持在线预览 PDF 说明。

### 模块 6：轻量化快速询盘表单 (Quick Inquiry Form) —— 重点精简！
* **去除冗长的数十个 SKU 勾选框**，将其精简为 **4 个核心必填项**：
  1. **Inquiry Type** (单选胶囊)：`[Bulk Quote]` / `[Sample Box ($39)]` / `[OEM/Custom Project]`
  2. **Contact Name** (输入框)
  3. **Business Email** (输入框)
  4. **Target Products & Notes** (多行文本域，Placeholder 提示：“e.g., G-01 Foldable Mat 100 pcs with custom laser logo, shipping to California 90210”)
* **提交按钮**：`[Send Inquiry →]`，提交后显示优雅的“Thank You! Our sourcing team will reply within 12 business hours”轻量弹窗。

---

## 四、 核心颜色与 CSS 变量速查 (Design Tokens)

```css
/* 请直接写入 globals.css */
:root {
  --glintic-bg: #FAF8F5;          /* 全局主底色 Warm Cream */
  --glintic-surface: #FFFFFF;     /* 卡片白底 */
  --glintic-linen: #F4F1EA;       /* 辅助底色 Warm Linen */
  --glintic-charcoal: #1A1A1A;    /* 主文字 Charcoal */
  --glintic-muted: #6F736F;       /* 次要文本 */
  --glintic-sage: #7A8B7B;        /* 品牌鼠尾草绿 */
  --glintic-sage-light: #EAF0EA;  /* 浅绿胶囊背景 */
  --glintic-border: #EAE7E1;      /* 极细分割线 */
}
```

---

## 五、 配套视觉素材资产

* **Sample Box 开箱视觉图**：`GLINTIC_Sample_Box_Unboxing_Visual.png` (已置于本地项目目录，16:9 2K 极简静奢风)。

## 六、DEV-TASK-001 实施记录（2026-11-25）

| 项目 | 实施结果 |
|---|---|
| 分类迁移 | Yoga Essentials：G-01/G-02/G-10；Pilates Sculpt：G-05/G-06/G-07/G-09/G-04；Restorative：G-11–G-14；Fascia Recovery：G-03/G-08；Studio Retail：G-15/G-16/G-17/G-19/G-20 |
| 目录数量核正 | 五集合 SKU 数为 4/12/4/10/17，共 47；More 为 19，总数仍为 66；共 19 个 G 系列，G-18 未定义，5 个 Made-to-Order。执行计划中的 46/20、Fascia 9、20 条系列链接为统计笔误，不新增或删除 SKU |
| 旧分类链接 | `yoga-pilates-essentials`→`yoga-essentials`；`pilates-props-resistance`→`pilates-sculpt`；`restorative-meditation`→`restorative`；`studio-hygiene-textiles` 与 `retail-merchandise`→`studio-retail` |
| 旧链接附加参数 | 旧 cat 带迁出系列时以该系列的新集合为准，保留 series/sort/limit/campaign/hash，移除旧 price 参数；新 cat 与不匹配 series 则清空无效 series |
| Header 与导航 | 72px 内容行、单行 GLINTIC STUDIO、五列 19 系列、双 CTA；桌面导航从 1280px 启用，较窄视口使用五集合 details 抽屉，640px 起保留顶部双 CTA |
| 可访问性 | `aria-expanded/controls/haspopup`、当前集合/系列 `aria-current`、Enter/Space/ArrowDown 打开、Esc 归还、移出延迟 150ms、焦点离开/外部点击/路由变化关闭；弹层使用具名非模态 `role=dialog` 和 `aria-haspopup=dialog`，内部保留正常链接/Tab 语义，不伪装为应用型 menu |
| 同页目录跳转 | 分类与系列使用普通 a 导航，保证 /products 内变更 query 后重建目录视图；保留静态首批 24 张产品 HTML |
| 首页六模块 | Hero→Collections→四步定制→Sample Box→四重 QA/证据卡→Quick Inquiry；集合卡按执行计划使用六列网格：前三卡各跨 2 列，第二行两卡各跨 3 列；桌面 Hero 保留指定双行标题，移动端自然换行 |
| 图片 | 未在当前仓库发现官方 PNG，生成 16:9 开箱示意图；经 sharp/manifest 转为 640/960/1280w WebP；alt 与图注明确不是实拍，五项内容仅为 Proposed |
| 询盘 | 首页仅 Inquiry Type/Contact Name/Business Email/Notes 四项必填；`source=quick` 走同一 /api/rfq；空公司/国家/邮编/数量/定制邮件行省略；完整 RFQ 保留；错误保留草稿、同内容重试复用 UUID、成功面板挂载后聚焦 |
| 样式 | 指南 Token 映射现有色值；新增 Mega/QA/证据卡/胶囊/Quick 样式；锚点预留 88px，覆盖吸顶 Header 与间隙；保留减弱动效与无 JS 内容兜底 |

### 事实口径与待业务确认

1. 全球 DDP/门到门承诺改为按目的地报价，不假设全球覆盖。
2. Eco-Certified 改为 Certificates on request，未核验证书不作为认证声明。
3. 样品盒 US$39 为参考价格，内容、运费及大货退款/抵扣须购买前书面确认。
4. OEKO-TEX/GOTS/amfori BSCI/SGS 仅为文字证据需求卡，链接 About 说明；无第三方徽标、无虚构 PDF。业务方须提供有效文件、适用范围与展示授权。
5. 按执行计划保留 10 pcs Low MOQ 与 7-Day Express Sampling 两个徽标，均标星号并注明仅为规划目标；实际起订量、材料规格、打样交期和运费按 SKU/目的地书面确认。

另：12 business hours 为目标回复时间，不是合同 SLA；G-02 目录图为 EVA，软木选项需另确认；G-04 候选款为 silicone，neoprene 材料需确认；按钮 hover 使用 #4F5D50 保持白字对比度。未新增依赖、数据库、在线支付或外部部署。

验收数据与剩余上线阻断项见 `docs/site-audit-2026-11.md` 的 Task1 章节。
