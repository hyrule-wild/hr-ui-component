---
name: study
route: /study
---

本文档为记录 hy-ui-component 组件库脚手架搭建遇到的一些问题和总结

## 一、hoist-non-react-statics

能复制到目标组件**所有的静态方法**到目标组件上

### 用法

> import hoistReactStatics from 'hoist-non-react-statics'; hoistReactStatics(targetComponent, sourceComponent);

> 如果某个特定的组件不需要复制 您可以传第三个参数来将它们排除在外

> hoistReactStatics(targetComponent, sourceComponent, { myStatic: true, myOtherStatic: true });

## 二、@loadable/component

按需加载

### 用法

> import loadable from '@loadable/component'
>
> const OtherComponent = loadable(() => import('./OtherComponent'))

## 三、docz&gatsby

> docz 提供了文档的打包、文档开发、生产环境的服务还有第三方库的适配
>
> gatsby 丰富了 docz 为 docz 提供了很多插件 包括外观、主题皮肤等**https://www.gatsbyjs.com/docs/api-reference/**
