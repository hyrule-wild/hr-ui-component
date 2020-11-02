---
name: README
route: /readme
---

# 开发规范

## 环境

1. 执行：`npm run dev`，访问 http://localhost:3000
2. 使用 VS code，并安装 ESLint 和 Prettier 扩展

## 目录规范

1. 统一放在 `src/components` 目录下
2. 示例替换用 `@loadable/component` 异步加载，参考各个组件的 `entry.tsx` 文件。（tea-component 目前还不支持 SSR 渲染，docz 示例需要用到 SSR 渲染）
3. 图片目录 `src/assets/` 目录下