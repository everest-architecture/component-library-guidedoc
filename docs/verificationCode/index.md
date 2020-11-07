---
group:
  order: 100
---

# 验证码组件

- 今天心血来潮写了个验证码组件,我还记得很久以前，玩爬虫的时候，爬美团发现会跳出个验证码，这个验证码还是个 blob 地址，完全不知道怎么拿到它。

## 思路

- 先做出基本实现再进行加工。
- 比如场景是一个很常见的只在前端做验证码的情况。这样，我们会随机一个数字，传给生成图片的函数，得到图片给用户显示，等用户输入后，与存在内存的变量进行比对，如果相等就继续下一步逻辑。
- 可以先确定一下有哪些字。一般情况下，字母加数字就差不多了。

```js
const allletters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
];
```

- 然后需要生成随机字符串：

```ts
export function randomLetter(num: number) {
  let f = '';
  for (let i = 0; i < num; i++) {
    let x = randomNum(0, allletters.length);
    f = f + allletters[x];
  }
  return f;
}
```

- 这样准备工作就好了，下面需要传给一个生成图片的函数，获得图片
- 先不做什么别的比如干扰线什么东西，只把 code 做成图片。
- 图片可以先用 canvas 画出来，然后 toblob 即可显示。
- 这里关键 api 就是 canvas 的 fillText 可以写字。
- 对于文字颜色要搞成随机彩色，字体大小可以可大可小，字体也要各种倾斜。
- 在 canvas 绘画时，必须要留有白边，因为字体的倾斜会导致字体超出原先做好的大小。

```ts
export function generateBlob(
  code: string,
  width?: number,
  height?: number
): Promise<Blob | null> {
  const canvas = document.createElement('canvas');
  const fheight = height || 40;
  const fwidth = width || 120;
  const padding = 15; //白边距离
  const mheight = fheight - padding;
  const mwidth = fwidth - padding;
  canvas.height = fheight;
  canvas.width = fwidth;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error('can not get canvas context');
    return Promise.resolve(null);
  }
  const len = code.length;
  for (let i = 0; i < len; i++) {
    const text = code[i];
    const randomSize = randomNum(mheight / 2, mheight);
    ctx.font = randomSize + 'px Georgia';
    ctx.fillStyle = randomColor();
    ctx.shadowBlur = randomNum(-3, 3);
    ctx.shadowColor = randomColor();
    const deg = randomNum(-30, 30);
    const centerX = padding + (i * mwidth) / len;
    const centerY = fheight / 2 + randomSize / 2;
    ctx.translate(centerX, centerY);
    ctx.rotate((deg * Math.PI) / 180);
    ctx.fillText(text, 0, 0, mwidth / len);
    ctx.rotate((-deg * Math.PI) / 180);
    ctx.translate(-centerX, -centerY);
  }
  return new Promise((res, rej) => {
    canvas.toBlob(res);
  });
}
```

- 下面需要加点干扰线干扰点什么的，一样原理，多画几条线就行：

```js
const lineNumber = 5;
for (let i = 0; i < lineNumber; i++) {
  ctx.strokeStyle = randomColor();
  ctx.beginPath();
  ctx.moveTo(randomNum(0, fwidth), randomNum(0, fheight));
  ctx.lineTo(randomNum(0, fwidth), randomNum(0, fheight));
  ctx.stroke();
}
```

- 画点也是同样：

```ts
const dotNumber = 100;
for (let i = 0; i < dotNumber; i++) {
  ctx.fillStyle = randomColor();
  ctx.beginPath();
  //x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean | undefined
  ctx.arc(randomNum(0, fwidth), randomNum(0, fheight), 1, 0, 2 * Math.PI); //半径1的圆
  ctx.fill();
}
return new Promise((res, rej) => {
  canvas.toBlob(res);
});
```

- 另外还可以生成点曲线，使用 bezierCurveTo 制作：

```ts
const berzierLine = 2;
for (let i = 0; i < berzierLine; i++) {
  ctx.fillStyle = randomColor();
  ctx.beginPath();
  ctx.moveTo(randomNum(0, fwidth), randomNum(0, fheight));
  ctx.bezierCurveTo(
    randomNum(0, fwidth),
    randomNum(0, fheight),
    randomNum(0, fwidth),
    randomNum(0, fheight),
    randomNum(0, fwidth),
    randomNum(0, fheight)
  );
  ctx.stroke();
}
```

- 这样基本完成了。
- 下面做做封装，把配置项暴露出去：

```ts
export interface IGenerateOptionType {
  //图片宽
  width: number;
  //图片高
  height: number;
  //预留边
  padding: number;
  //干扰直线条数
  lineNumber: number;
  //干扰点数量
  dotNumber: number;
  //干扰曲线数量
  bezierLineNumber: number;
  //生成格式
  imgType: string;
  //图片品质
  encoderOptions: number;
}

export const defaultGenerateOption: IGenerateOptionType = {
  width: 120,
  height: 40,
  padding: 10,
  lineNumber: 2,
  dotNumber: 80,
  bezierLineNumber: 2,
  imgType: 'image/png',
  encoderOptions: 1,
};
```

- 同时也要支持自定义字典，比方说别人想生成汉字之类的，加上配置项替换原来的字典即可。

```ts
export function randomLetter(num: number, dict?: string[]) {
  const xdict = dict ? dict : allletters;
  let f = '';
  for (let i = 0; i < num; i++) {
    let x = randomNum(0, xdict.length);
    f = f + xdict[x];
  }
  return f;
}
```

- 最后看看效果吧：

```tsx
import React from 'react';
import { Demo1 } from './demo';
export default () => <Demo1 />;
```

```tsx
import React from 'react';
import { Demo2 } from './demo';
export default () => <Demo2 />;
```
