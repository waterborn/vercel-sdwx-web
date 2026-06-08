# vercel-sdwx-web

面向海外市场的电商产品展示网站，基于 Next.js 16 构建，部署于 Vercel 平台。

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| [Next.js](https://nextjs.org) | 16.2.7 | React 全栈框架，使用 App Router 与 Turbopack（默认构建器） |
| [React](https://react.dev) | 19.2.4 | UI 渲染库 |
| [React DOM](https://react.dev) | 19.2.4 | React DOM 渲染器 |
| [TypeScript](https://www.typescriptlang.org) | ^5 | 静态类型检查 |
| [Tailwind CSS](https://tailwindcss.com) | v4 | 原子化 CSS 框架（CSS 配置范式，无需 `tailwind.config.ts`） |
| [ESLint](https://eslint.org) | ^9 | 代码检查，使用 `eslint-config-next`（core-web-vitals + typescript） |
| [PostCSS](https://postcss.org) | — | 通过 `@tailwindcss/postcss` 插件集成 Tailwind CSS v4 |

## 运行环境要求

| 依赖 | 最低版本 |
|------|----------|
| Node.js | >= 20.9.0（Next.js 16 强制要求） |
| npm | 随 Node.js 安装 |

> 项目根目录 `.nvmrc` 文件指定 Node.js 20，`package.json` 中 `engines` 字段声明了最低版本要求。

## 项目结构

```
vercel-sdwx-web/
├── public/                  # 静态资源
├── src/
│   ├── app/                 # App Router 页面
│   │   ├── layout.tsx       # 根布局
│   │   ├── page.tsx         # 首页
│   │   ├── globals.css      # 全局样式（Tailwind CSS v4 入口）
│   │   ├── about/           # About 页面（预留）
│   │   └── products/[id]/   # 产品详情页（动态路由）
│   ├── components/          # 可复用组件
│   └── data/                # 静态数据源
├── .nvmrc                   # Node.js 版本声明
├── next.config.ts           # Next.js 配置
├── postcss.config.mjs       # PostCSS 配置（Tailwind CSS v4）
├── eslint.config.mjs        # ESLint 扁平配置
├── tsconfig.json            # TypeScript 配置
├── vercel.json              # Vercel 部署配置
└── package.json             # 项目依赖与脚本
```

## 构建配置详情

### package.json scripts

| 命令 | 作用 |
|------|------|
| `npm run dev` | 启动开发服务器（Turbopack 模式，默认 `http://localhost:3000`） |
| `npm run build` | 生产环境构建（Turbopack 模式） |
| `npm run start` | 启动生产环境服务器 |
| `npm run lint` | 运行 ESLint 检查 |

### Next.js 配置 (`next.config.ts`)

当前使用默认配置，未自定义 `output`、`basePath`、`redirects` 等选项。Next.js 16 默认使用 Turbopack 作为构建器（不再需要 `--turbopack` 标志）。

### TypeScript 配置 (`tsconfig.json`)

- **target**: ES2017
- **module**: esnext，**moduleResolution**: bundler
- **strict**: 开启严格模式
- **路径别名**: `@/*` 映射到 `./src/*`
- **JSX**: react-jsx
- **增量编译**: 开启

### Tailwind CSS v4 配置

Tailwind CSS v4 采用 CSS 配置范式，无需 `tailwind.config.ts` 文件：

- **入口**: `src/app/globals.css` 中 `@import "tailwindcss"`
- **PostCSS 插件**: `@tailwindcss/postcss`（见 `postcss.config.mjs`）
- **主题扩展**: 在 `globals.css` 中通过 `@theme inline` 定义 CSS 变量（如颜色、字体）

### ESLint 配置 (`eslint.config.mjs`)

使用 ESLint v9 扁平配置格式，集成：
- `eslint-config-next/core-web-vitals`
- `eslint-config-next/typescript`

## Vercel 部署

### 部署配置 (`vercel.json`)

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "installCommand": "npm install",
  "outputDirectory": ".next"
}
```

### 部署要点

1. **Framework Preset**: 必须在 Vercel 项目设置中选择 **Next.js**（不可选 "Other"）
2. **Node.js 版本**: Vercel 构建环境需使用 Node.js >= 20.9（通过 `.nvmrc` 声明）
3. **Build Adapters**: Next.js 16 引入了 Build Adapters API，Vercel 已提供官方验证适配器
4. **Turbopack**: Next.js 16 默认使用 Turbopack 构建，无需额外配置

### 常见问题

- **部署后 404**: 确保 Vercel 项目 Framework Preset 为 Next.js；如持续 404，尝试删除项目后重新从 GitHub 导入
- **Node.js 版本不兼容**: 确认 `.nvmrc` 文件存在且值为 `20`

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 生产构建
npm run build

# 启动生产服务器
npm run start
```

开发服务器启动后访问 [http://localhost:3000](http://localhost:3000)。
