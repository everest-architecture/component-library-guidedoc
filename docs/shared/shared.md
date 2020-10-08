---
group:
  order: 5
---

## 全局变量与工具函数

这个可以补充一下。

写到后面如果用上啥了就往里面加。

### 动效

通用动效可以加进来。

antd 动效设计参考：https://motion.ant.design/language/basic-cn

主要就是动效别整太花哨，自然，不喧宾夺主，有效率（避免某些动画时间过长）。

贝塞尔曲线制作网址：http://yisibl.github.io/cubic-bezier/#1,.01,1,1

贝塞尔谷歌也有自带的可以使用，感觉网站上搞起来更方便。

如果某个值大于 1 可能会有问题，老旧浏览器对大于 1 的可能不支持。

对于需求大于 1 的动画且要求适配的可以试着用 keyframe 解决。

大部分要求不高只要个简单过度的就可以加一下：

```ts
export const commonAnimation = (duration: string) => {
  return css`
    transition: all ${duration}s ease-in-out;
  `;
};
```

根据 antd 动效设计指引，普遍 duration 应该为 0.15s 比较好。

```tsx
import React from 'react';
import { AnimateDemo } from './demo';

export default () => <AnimateDemo />;
```

对于动画行为方面，有几种比较常见：

一、类似于 antd modal 组件的出现。

主要使用了缩放动画，慢慢变大的效果突出弹窗。

```ts
export const modalOpenAnimate = keyframes`
  0% {
    opacity: 0;
    transform:scaleY(0,0);
  }
  100% {
    opacity: 1;
    transform:scale(1, 1);
    transform-origin:center;
  }
`;
export const modalCloseAnimate = keyframes`
  0% {
    opacity: 1;
    transform:scale(1, 1);
    transform-origin:center;
  }
  100% {
    opacity: 0;
    transform:scaleY(0,0);
  }
`;
```

目前组件没写，所以大概展示下效果：

```tsx
import React from 'react';
import { ModalAnimateDemo } from './demo';

export default () => <ModalAnimateDemo />;
```

二、类似于 antd 进度条的闪烁效果：

主要利用了透明度做一个看起来像进度不断前进的动画。

```ts
const progressFlash = keyframes`
  0% { opacity: 0.1;
    width: 0; 
  }
  20% { opacity: 0.5;
    width: 0; 
  } 
  100% { opacity: 0;
    width: 100%; 
  }
`;
```

```tsx
import React from 'react';
import { ProgressFlashDemo } from './demo';

export default () => <ProgressFlashDemo />;
```

三、无限旋转动画：

```ts
export const spinAnimate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;
```

```tsx
import React from 'react';
import { SpinDemo } from './demo';

export default () => <SpinDemo />;
```

### 全局样式

一般这个拿 normalize.css 抹平浏览器差异。antd 的就是这玩意改的。

https://necolas.github.io/normalize.css/latest/normalize.css

```tsx
import React from 'react';
import { GlobalStyle } from './global';

export default () => <GlobalStyle />;
```

### 滚动条

滚动条是个容易忽略的点，用默认的话，windows 上滚动条会比较丑。

如果有主题存在，一般情况，滚动条和背景色相符会不太突兀。

::-webkit-scrollbar 横纵滚动条宽度

::-webkit-scrollbar-thumb 滚动条里面的小方块

::-webkit-scrollbar-track 滚动条的轨道（里面装有 Thumb）

::-webkit-scrollbar-button 滚动条的轨道的两端按钮，允许通过点击微调小方块的位置。

::-webkit-scrollbar-track-piece 内层轨道，滚动条中间部分（除去）

::-webkit-scrollbar-corner 边角，即两个滚动条的交汇处

::-webkit-resizer 两个滚动条的交汇处上用于通过拖动调整元素大小的小控件

```ts
export const scrollbars = (
  fg: string,
  bg: string,
  size: string,
  hint: string
) => {
  const borderRadius = parseFloat(size) / 2;
  return css`
    &::-webkit-scrollbar {
      width: ${size};
      height: ${size};
    }

    &::-webkit-scrollbar-track {
      background: ${bg};
    }

    &::-webkit-scrollbar-thumb {
      background: ${fg};
      cursor: pointer;
      border-radius: ${borderRadius}px;
    }

    &::-webkit-scrollbar-thumb:hover {
      cursor: pointer;
      background: ${hint};
    }

    &::-webkit-scrollbar-corner {
      background: ${bg};
    }
  `;
};
```

```tsx
import React from 'react';
import Demo from './demo';

export default () => <Demo />;
```

### 停止滚动

在某些情况，比如 modal 弹窗出现时，此时如果还能滚动会比较奇怪，所以可能会需要这种停止滚动函数。

当 modal 操作完成后，释放滚动条。

```ts
export function stopScroll(state: boolean, delay: number, open?: boolean) {
  if (open) {
    let width = window.innerWidth - document.body.clientWidth;
    if (state) {
      document.body.style.overflow = 'hidden';
      document.body.style.width = `calc(100% - ${width}px)`;
    } else {
      //这个delay应该取决于弹窗关闭的动画结束时间
      window.setTimeout(() => {
        document.body.style.overflow = 'auto';
        document.body.style.width = `100%`;
      }, delay);
    }
  }
}
```

### 防抖

一段时间不持续触发时触发对应函数。

可以做成第一次就触发一下，整个变量判断是不是第一次就行。

如果没有 this 要求，直接执行也可以。

```ts
export function debounce(fn: Function, delay: number) {
  let timer: number;
  return function (...args) {
    let that = this;
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      fn.call(that, ...args);
    }, delay);
  };
}
```

### 节流

每隔一段时间触发函数。

可以根据需要写，一般都是第一次触发下。

```ts
export function throttle(fn: Function, delay: number) {
  let flag = true;
  return function (...args) {
    let that = this;
    if (!flag) return;
    flag = false;
    fn.apply(that, args);
    window.setTimeout(() => {
      flag = true;
    }, delay);
  };
}
```

### React 相关

组件外点击判断相当实用，对于有 modal 或者逻辑，都可以使用。

这种监听不能挂在目标上，因为就是要点到目标外面然后触发某种事件。

```ts
export function useClickOutside(
  ref: RefObject<HTMLElement>,
  handler: Function
) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };
    window.addEventListener('click', listener);
    return () => window.removeEventListener('click', listener);
  }, [ref, handler]);
}
```

```tsx
import React from 'react';
import { ClickOutSideDemo } from './demo';

export default () => <ClickOutSideDemo />;
```
