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
