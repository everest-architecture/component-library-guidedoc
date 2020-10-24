---
group:
  order: 7
---

# 按钮

## 制作原则

- 一般所有组件，都需要提供其外层的样式，类名等配置项，方便使用。

- 基础组件在制作时不建议造别的东西，比如套个 div 里写个 button 什么的。只在 button 上做即可。

### 样式

- 前面主题部分已经决定了颜色，一般情况，在不同主题下，button 的颜色不随着主题改变而改变。

### 种类

- 一般需要下面几个种类：

- 填充满颜色的 filled
- 内部半透明的 outline
- 全透明的 ghost

```ts
export type BtnType = 'filled' | 'outline' | 'ghost';
```

- 这些分别会对应上不同的状态色+primary 色

```ts
export type Status =
  | 'info'
  | 'success'
  | 'danger'
  | 'primary'
  | 'warning'
  | 'basic';
```

- 在颜色制作时，最好能把 focus,active,hover,disable 的样式全设上，变化上能更丰富点。

- 另外还有个 link，都是做成 button 的样子然后渲染 a 标签。

### 大小

- 这个没啥说的，设计个 3-4 种差不多了

```ts
export type Size = 'sm' | 'md' | 'lg';
```

### 圆角

- 由于 button 不一定是个正方形，所以圆角到顶可能不会很圆，antd 那种很圆的直接做的切换，有 transition 动画的则没法平滑过度。

- 这个就正常做就可以了，不用整别的。

```ts
export type Shape = 'rect' | 'sround' | 'round';
```

### 预览

对以上进行实现，预览效果，具体细节还需要调整。

有兴趣的可以加上渐变色和 boxshadow 变化，这样更好看。

通常不建议自己造 dom 或者占用伪类做一些比如点击后水纹之类的效果

filled:

```tsx
import React from 'react';
import { FilledDemo } from './buttonDemo';

export default () => <FilledDemo />;
```

outline:

```tsx
import React from 'react';
import { OutlineDemo } from './buttonDemo';

export default () => <OutlineDemo />;
```

ghost:

```tsx
import React from 'react';
import { GhostDemo } from './buttonDemo';

export default () => <GhostDemo />;
```
