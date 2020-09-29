---
order: 2
group:
  order: 2
---

## javascript 代码风格规范

### 避免使用默认导出

- 默认导出需要自己重命名，会让人混淆。
- 改成这样：

```js
import { HomeApi } from './home.api';
```

### 使用 index.js 统一文件夹下的导出。

- 示例：

```js
import { homeActions } from '../../home/home-utils/home.actions';
import { routeUtils } from '../../../utils/route.utils';
import { homeTypes } from '../../home/home.typings';
```

- 改成这样：

```js
import { homeActions, homeTypes } from '../../home';
import { routeUtils } from '../../../utils';
```

### 同类处理函数包装成对象

- 示例：

```js
// utils.js
const formatTimeSlots = () => {};
const updateTimeSlots = () => {};
const createTimeSlots = () => {};

//file.js
import { formatTimeSlots, createTimeSlots, updateTimeSlots } from './utils';
```

- 改成这样：

```js
// utils.js
const utils = {
  formatTimeSlots: () => {},
  updateTimeSlots: () => {},
  createTimeSlots: () => {},
};

//file.js
import { utils } from './utils';
```

- 或者可以这么导入：

```js
import * as utils from './utils';
```

### 跨层级太多尽量使用别名

- 示例：

```js
import { User } from '../../../scenes/Account/User';
import { THEME_COLOR } from '../../constants/theme';
import { getUser } from '../services/userServices';
```

- 改成这样：

```js
import { User } from '@scenes/Account/User';
import { THEME_COLOR } from '@constants/theme';
import { getUser } from '@services/userServices';
```

### 布尔值变量方法需要以 is 开头

```js
const isCompleted = true;
const isValidUser = (user) => !!user;
```

### 常量变量总是大写

```js
const NEW_MODE = 'New Mode';
const GOOGLE_KEY = '1da541ac298';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
```

### 使用少量变量让可读性更好

- 示例：

```js
const result = (income - expenses) - income > expenses * 2 ? income * 0,25: 0;
```

- 改成这样：

```js
const value = income - expenses;
const isUseTaxes = income > expenses * 2;
const taxes = isUseTaxes ? income * 0,25 : 0;
const result = value - taxes;
```

### 尽量将对象解构出来使用

- 示例：

```js
setState({
  account: `${response.user.name} ${response.user.surname}`,
  photo: response.user.photo,
  options: response.options,
});
```

- 改成这样：

```js
const { user, options } = response;
// two times if needed
const { name, surname, photo } = user;

setState({
  account: `${name} ${surname}`,
  photo,
  options,
});
```

### 合理使用简短的三元表达式替代 if

- 示例：

```js
if (isCompleted) {
  return method();
}
return null;
```

- 改成这样：

```js
return isCompleted ? method() : null;
```

### 合理构造对象来代替多个 if

- 示例：

```js
const response = await api.fetchData();

if (response.message === 'saved') {
  /* ... */
}
if (response.message === 'updated') {
  /* ... */
}
if (response.message === 'error') {
  /* ... */
}
```

- 改成这样：

```js
  const responseHandleMap = {
   saved: () => /* ... */,
   updated: () => /* ... */,
   error: () => /* ... */
  }
  /* ... */
  const response = await api.fetchData();
  responseHandleMap[response.message]();
```

### 使用 async / await 替代 then / catch

- 示例：

```js
getUserInfo()
  .then(({ user, options }) => {
    /* ... */
  })
  .catch((e) => {
    /* ... */
  });
```

- 改成这样：

```js
request = async () => {
  try {
    const { user, options } = await getUserInfo();
    /* ... */
  } catch (e) {
    /* ... */
  }
};
```
