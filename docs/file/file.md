---
group:
  order: 6
---

## 文件夹结构与配置工具相关

### 文件夹结构

文件夹结构，主要跟按需加载有点关系。

一般情况，所有组件会并列放置。

antd 的结构：https://github.com/ant-design/ant-design/tree/master/components

理论上说现在一般都用 webpack，生产模式自动开启 treeshaking，这样的话，开不开按需加载在打包后其实基本没啥区别。开发模式会有些区别，开发模式没按需加载会大一点。

按需加载本质就是改 import 语句，把其变为某种导出，具体按照设置来。

所以每个组件的导出方式全部统一，最后由 index 进行汇总：https://github.com/ant-design/ant-design/blob/master/components/index.tsx

js 按需加载：https://www.npmjs.com/package/ts-import-plugin

ts 按需加载：https://www.npmjs.com/package/ts-import-plugin

### 配置工具等

plop 是我用了做组件库感觉非常好用的神器：https://www.npmjs.com/package/plop

打包工具一般使用 rollup https://rollupjs.org/guide/en/

社区也还有很多零配置打包工具:

parcel:https://zh.parceljs.org/getting_started.html

microbundle: https://www.npmjs.com/package/microbundle

umi-library :https://www.npmjs.com/package/umi-library

eslint 与 prettier 应该不用说了，配合 husky,lint-staged 保证提交格式统一

如果有 css 之类的还有 stylint 可以配一下

另外还有提交规范之类的 angular 一套，emoji 那个 windows 上不好用，需要 windows 额外去下个软件才能正常使用。

有什么好用的或者细节注意点都可以补充一下。
