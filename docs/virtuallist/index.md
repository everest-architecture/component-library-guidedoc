---
group:
  order: 99
---

# 虚拟列表

今天来制作个比较有意思的虚拟列表组件。

虚拟列表相当常用，我以前也手写过但实现的不是太好。

我看了下 umihook 的虚拟滚动，发现也不是很好用，它支持手动设定每个元素高度，但也不能支持不定高度，而且限定更多了，比如不能在同一个滚动 dom 下绑定多个虚拟滚动，对跨组件调用不太友好，甚至第一次出现可能不会显示，需要划一下或者使用 scrollto 才会出现。

不过 umihook 的有些设定还是可以对我有些启发的。加上以前我就知道有种方法可以不用知道高度进行虚拟滚动，所以就写写这玩意。

## 思路

- 我以前写的虚拟滚动，有些参数可以不需要的，有些参数可以优化下，但是原理还是一样。
- 能滚动的 dom 是必拿的，渲染的 list 我们可以包裹一层，从而相减拿到两者之差的起始位置，省去人为进行计算。
- 还是先做定高的，定高做完再做不定高。

## 步骤

- 首先还是要拿到滚动 dom。通过 scrolldom 传来，然后还有个 children 的 wrapper，这里直接做到组件里。
- 拿到 dom 后获取其各参数，存入 state，为啥不用 usememo?因为 memo 存进去没法刷新，我存进去需要刷新下。
- 有了参数，我就可以计算起始高度了：

```ts
const [scrollDomParams, setScrollDomParams] = useState({
  width: 0,
  height: 0,
  top: 0,
  left: 0,
});

useEffect(() => {
  if (props.scrollDom.current) {
    const rect = props.scrollDom.current.getBoundingClientRect();
    setScrollDomParams({
      width: rect.width,
      height: rect.height,
      left: rect.left,
      top: rect.top,
    });
  }
}, [props.scrollDom]);

const [childrenWrapParams, setChildrenWrapParams] = useState({
  width: 0,
  height: 0,
  top: 0,
  left: 0,
});

const ref = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (ref.current) {
    const rect = ref.current.getBoundingClientRect();
    setChildrenWrapParams({
      width: rect.width,
      height: rect.height,
      left: rect.left,
      top: rect.top,
    });
  }
}, []);

const wrapperToScrollDomDistance = useMemo(() => {
  return childrenWrapParams.top - scrollDomParams.top;
}, [childrenWrapParams.top, scrollDomParams.top]);
```

- 下面需要制作模拟滚动条，由于我们要做定高的，所以需要传递每个高度进来，然后根据 length 计算总共高度，这样模拟滚动条高度还要减去开始那个高度即是总共高度。

```ts
const mockHeight = useMemo(() => {
  return arrayResolve<number>(
    props.children,
    (val: any[]) => val.length * props.itemHeight - wrapperToScrollDomDistance,
    () => 0
  );
}, [props.children, props.itemHeight, wrapperToScrollDomDistance]);
```

- 有了模拟滚动条，后面则是制作虚拟滚动渲染了，我们需要将拿到的孩子从手里过一遍，得到需要渲染的孩子。
- 需要设定个渲染元素个数，渲染的多，往下滚动时不容易看见空白。
- 由于这个改变元素渲染需要刷新，所以这个我也做到 state 里。

```ts
function arrayResolve<R>(
  value: any,
  isArrayFunc: Function,
  notArrayFunc: Function
): R {
  if (Array.isArray(value)) {
    return isArrayFunc(value);
  } else {
    console.error('you must pass array children ');
    return notArrayFunc();
  }
}

const [renderChildren, setRenderChildren] = useState(
  //一开始，需要返回对应截取的元素
  () => {
    return arrayResolve<ReactChildren>(
      props.children,
      (val: any[]) => val.slice(0, props.renderNumber),
      () => null
    );
  }
);
```

- 下面需要绑定滚动监听，自然是绑到 scrolldom 上，当滚动时计算渲染位置。
- 在每次滚动时，scrolltop 会发生改变，比如当我滚到 100 时，我前面应该减少 100 除每个元素高个元素，后面应该增加同样的元素进行渲染。
- 所以要在监听函数中计算 scroll 的值除每个元素的高，再从头和尾加对应元素即可，另一方面我们还需要控制视口的移动，由于有初始高度，所以视口在滚过初始高度后才可以移动。这里调整 translateY 即可。

```ts
useEffect(() => {
  let fn: (e: Event) => void;
  if (props.scrollDom.current) {
    fn = (e: Event) => {
      const target = e.target as HTMLDivElement;
      const scroll = target.scrollTop;
      const iNumber = Math.floor(scroll / props.itemHeight);
      let Y = scroll - wrapperToScrollDomDistance;
      if (Y < 0) {
        Y = 0;
        //最后的scroll 需要减去一屏幕高度
      } else if (Y >= mockHeight - scrollDomParams.height) {
        Y = mockHeight - scrollDomParams.height;
      }
      unstable_batchedUpdates(() => {
        setRenderChildren(
          arrayResolve<ReactChildren>(
            props.children,
            (val: any[]) =>
              val.slice(0 + iNumber, props.renderNumber + iNumber),
            () => null
          )
        );
        setViewPortY(Y);
      });
    };

    props.scrollDom.current.addEventListener('scroll', fn);
  }
  return () => {
    if (props.scrollDom.current) {
      //解绑非常重要，否则渲再次出现渲染会出严重问题
      props.scrollDom.current.removeEventListener('scroll', fn);
    }
  };
}, [
  mockHeight,
  props.children,
  props.itemHeight,
  props.renderNumber,
  props.scrollDom,
  scrollDomParams.height,
  wrapperToScrollDomDistance,
]);
```

- 这样一个定高的虚拟滚动就做好了，是不是很简单呢？
- 下面需要制作不定高的虚拟滚动，不定高的话制作起来就比较困难，我觉得做动态赋给高度的意义不大，既然用了虚拟滚动，那么牺牲点性能傻瓜式代入自动算高度才是最舒服的组件。
- 不定高难度就在于各个元素高度不定，这样滚动条滚到一定地步到底有没有就不知道，所以在什么都不知道的情况下，我们需要让用户给每个元素的参考高度，便于去估算大致的滚动条高度，渲染后再动态调整剩余滚动条高度。
- 其他选项则与定高相同。为了方便，我新建个文件进行制作。
- 首要则是制作个可以动态拿到渲染的 dom 高度并且执行动态修正模拟高度的函数。比如用户传来每个元素大概 20px 高，有 100 个元素，那么估算高度为 100\*20，2000px，我渲染出第一个元素到页面上发现它有 10px 高，那么我就得修正 2000px，原来预估 20px，那么就用 2000-20+10=1900px，反之，如果我第二个元素到页面上有 30px，那么就是 1900px-20+30=2000px。通过不断修正滚动条来完成。
- 下面我会使用个对象来做个缓存，先预设用户给的高度，再进行计算：

```ts
//为每个元素建立高度
const cache = useMemo(() => {
  return arrayResolve<Record<number, number>>(
    props.children,
    (val: any[]) => {
      return val.reduce((prev, next, index) => {
        prev[index] = props.referItemHeight;
        return prev;
      }, {});
    },
    () => {}
  );
}, [props.children, props.referItemHeight]);

const mockHeight = useMemo(() => {
  return Object.values(cache).reduce((prev, next) => prev + next, 0);
}, [cache]);
```

- 由于我们要动态调整 mock 滚动条，所以需要把 mockheight 变为 state：

```ts
const [mockHeight, setMockHeight] = useState(() => {
  return Object.values(cache).reduce((prev, next) => prev + next, 0);
});
useEffect(() => {
  setMockHeight(Object.values(cache).reduce((prev, next) => prev + next, 0));
}, [cache]);
```

- 下面会比较麻烦，我们需要渲染出元素然后获取其高度，我们需要加快获取元素进度就要用 uselayouteffect。
- 同时，我们需要让其注册到 ref 上才可以获取。
- 这里就还需要考虑下内存问题，估计这也是 umihook 没做自动获取高度的原因。但是我们可以牺牲性能来获取更好的体验。

```ts
const refData: Record<number, HTMLDivElement> = useMemo(() => {
  return {};
}, []);

const cloneChildren = useMemo(() => {
  return arrayResolve<ReactElement[]>(
    props.children,
    (val: ReactElement[]) => {
      return val.map((v, i) => {
        const oprops = v.props;
        return React.cloneElement(v, {
          ...oprops,
          ref: (node: HTMLDivElement) => {
            refData[i] = node;
          },
        });
      });
    },
    () => []
  );
}, [props.children, refData]);
```

- 后续操作就会换成 cloneChildren 操作。
- 初次渲染，立即调整 cache 中的高度：

```ts
//初次返回，我们进行修正cache //初次渲染 0- props.renderNumber
useLayoutEffect(() => {
  if (
    //如果0存在，说明已经显示了，
    refData[0]
  ) {
    //map rendernumber
    new Array(props.renderNumber).fill(1).forEach((x, y) => {
      const height = refData[y].getBoundingClientRect().height || cache[y];
      cache[y] = height;
    });
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
```

- 后面修改监听 scroll 逻辑。
- 这里我们不能对元素进行增减固定值的操作，因为这样会导致元素明明有 50px 高，结果滚动了 20px 就滚过了 50px 导致最终计算错误。所以这里需要利用缓存的高度计算滚到的第一个位置，再从第一个位置加上用户传的，即为应该渲染在页面的元素。
- 每次进行滚动，我们需要动态修正 cache 的高度，同时删除 ref 中减少的 dom（防止内存过大）。当一轮滚动彻底结束后，缓存全部都有，dom 也都删光，回滚时，记录的长度如果大于已更新长度，则不会触发后续更新缓存操作。

```ts
const current = useMemo(() => {
  return {
    //以start为界。每次删除前面的，加入后面的，并且修正cache
    start: props.renderNumber,
  };
}, [props.renderNumber]);

const maxY = useMemo(() => {
  //最大值等于mock高减去一屏幕高度
  return mockHeight - scrollDomParams.height;
}, [mockHeight, scrollDomParams.height]);
useEffect(() => {
  let fn: (e: Event) => void;
  let timer: number;
  if (props.scrollDom.current) {
    fn = (e: Event) => {
      const target = e.target as HTMLDivElement;
      const scroll = target.scrollTop;
      //根据scroll的高度判断滚到第几个位置
      let sum = 0;
      let sindex = 0;
      Object.values(cache).some((v, i) => {
        sum = sum + v;
        if (sum > scroll) {
          sindex = i;
          return true;
        }
        return false;
      });

      const remain =
        props.renderNumber + sindex > cloneChildren.length
          ? cloneChildren.length
          : props.renderNumber + sindex;

      const start = current.start;
      if (start < remain && start < cloneChildren.length) {
        timer = window.setTimeout(() => {
          for (let i = start; i < remain; i++) {
            if (refData[i]) {
              const height =
                refData[i].getBoundingClientRect().height || cache[i];
              cache[i] = height;
            }
          }
          setMockHeight(
            Object.values(cache).reduce((prev, next) => prev + next, 0)
          );
          current.start = remain;
          //删除start之前的dom
          for (let i = 0; i < start; i++) {
            if (refData[i]) {
              delete refData[i];
            }
          }
        });
      }

      let Y = scroll - wrapperToScrollDomDistance;
      if (Y < 0) {
        Y = 0;
        //最后的scroll 需要减去一屏幕高度
      } else if (Y >= maxY) {
        Y = maxY;
      }
      unstable_batchedUpdates(() => {
        setRenderChildren(cloneChildren.slice(0 + sindex, remain));
        setViewPortY(Y);
      });
    };

    props.scrollDom.current.addEventListener('scroll', fn);
  }
  return () => {
    if (props.scrollDom.current) {
      //解绑非常重要，否则渲再次出现渲染会出严重问题
      props.scrollDom.current.removeEventListener('scroll', fn);
    }
    window.clearTimeout(timer);
  };
}, [
  cache,
  cloneChildren,
  current,
  maxY,
  props.referItemHeight,
  props.renderNumber,
  props.scrollDom,
  refData,
  wrapperToScrollDomDistance,
]);
```

- 最终，这个可以自动获取高度的虚拟滚动组件就做好了！

- 看一下效果，我直接封了个包可以调用,首先是固定宽高的：

```tsx
import React from 'react';
import { VirtuallistDemo } from './demo';

export default () => <VirtuallistDemo />;
```

- 在看个不定宽高的：

```tsx
import React from 'react';
import { SuperVirtuallistDemo } from './demo';

export default () => <SuperVirtuallistDemo />;
```
