## 排版

### 字体

字体方面，暂时参考 https://ant.design/docs/spec/font-cn

#### font-family

```css
@font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica
Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
  'Noto Color Emoji';
```

```tsx
import React from 'react';
import styled from 'styled-components';
import { WithTheme } from '../theme/theme';

const TextDemo = styled.p`
  font-family: ${(props) => {
    return props.theme.fontFamilyPrimary;
  }};
`;

export default () => {
  return (
    <WithTheme>
      <TextDemo>font family 中文字型 1234567890</TextDemo>
    </WithTheme>
  );
};
```

#### 字号与行高

根据 antd 的设计指引，字号尽量在 3-5 种，建议主字号为 14，与之对应行高为 22

<img  src ='https://gw.alipayobjects.com/zos/rmsportal/iFjgfIBExksqCqGMwUlw.png'>

```tsx
import React from 'react';
import styled from 'styled-components';
import { WithTheme } from '../theme/theme';

const TextSizeDemo = styled.p<{ fz: string; lh: string }>`
  font-family: ${(props) => props.theme.fontFamilyPrimary};
  font-size: ${(props) => {
    return props.theme[props.fz];
  }};
  line-height: ${(props) => props.theme[props.lh]};
`;
const arr = new Array(5).fill(100).map((x, y) => x * (y + 1));

export default () => {
  return (
    <WithTheme>
      <>
        {arr.map((v, i) => (
          <TextSizeDemo fz={'fontSize' + v} key={i} lh={'lineHeight' + v}>
            字号与行高{v}
          </TextSizeDemo>
        ))}
      </>
    </WithTheme>
  );
};
```

#### 字重

3 种等级，400，500，600 ，对应变量名 100，200，300

```tsx
import React from 'react';
import styled from 'styled-components';
import { WithTheme } from '../theme/theme';

const TextSizeDemo = styled.p<{ fw: string }>`
  font-family: ${(props) => props.theme.fontFamilyPrimary};
  font-weight: ${(props) => props.theme[props.fw]};
`;
const arr = new Array(3).fill(100).map((x, y) => x * (y + 1));

export default () => {
  return (
    <WithTheme>
      <>
        {arr.map((v, i) => (
          <TextSizeDemo fw={'fontWeight' + v} key={i}>
            字重{v}
          </TextSizeDemo>
        ))}
      </>
    </WithTheme>
  );
};
```

#### 字体颜色

这个涉及到对比度问题，字体颜色在主题的颜色里已经定义，如果有需要变更，调整 color 颜色即可：

```tsx
import React from 'react';
import Demo from './typography';
export default () => <Demo />;
```

### 阴影

阴影向下：主要应用于组件内部或组件本身，是比较常规场景的用法

阴影向上：主要应用于底部导航或工具栏等

阴影向左：主要应用于右边导航栏、抽屉组件或固定表格栏

阴影向右：主要应用于左边导航栏、抽屉组件或固定表格栏

```tsx
import React from 'react';
import { ShadowDemo } from './typography';
export default () => <ShadowDemo />;
```
