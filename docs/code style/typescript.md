## typescript 代码风格规范

### 所有的 interface 起始为 I,而 types 起始为 T

```ts
  interface IData {
    /* ... */
  }

  type TField = /* ... */
```

### class 或 组件的 interface 应该包含它的名字

```ts
interface IApiService {
	getUser(): IUser;
}

class ApiService implements IApiService {
	/* ... */
}
```

### interface 尽量进行 extends 而不是从零写

```ts
interface IData {
	name: string;
	surname: string;
}

interface IAdmin extends IData {
	/* ... */
}
```

### 如果可以的话，尽量将类型分的更细一点

-   示例

```ts
interface IData {
	level: number;
}
```

-   改为：

```ts
type TLevel = 1 | 2;

interface IData {
	level: TLevel;
}
```

### 使用？来替代 undefined 类型

-   示例

```ts
interface IData {
	level: number | undefined;
}
```

-   修改为

```ts
interface IData {
	level?: number;
}
```

### 在 class 中总是使用 private public protected 明确

```ts
class Api {
	public getUser = () => {
		const token = this.getToken();
		/* ... */
	};

	private getToken = () => {
		/* ... */
	};
}
```
