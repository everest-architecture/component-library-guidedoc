---
group:
  order: 5
---

## 全局变量与工具函数

这个暂时想不到有啥比较好用的。可以补充一下。最常用的就是防抖与节流了。

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
