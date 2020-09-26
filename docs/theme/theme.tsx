import React, { useState, createContext, useContext } from "react";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme } from "./darkTheme";
import { defaultTheme } from "./defaultTheme";

interface IContextType {
	changeTheme: Function;
	theme: string;
}

export const context = createContext<IContextType>({
	changeTheme: () => {},
	theme: "default",
});

export const getThemeValue = (settings: any, key: string) => {
	//通过递归，找到最原始的定义
	if (settings[key] in settings) {
		return getThemeValue(settings, settings[key]);
	}
	return settings[key];
};

export const getConfig = (settings: any) => {
	//如果是颜色变量，直接返回颜色变量的值。
	Object.keys(settings).forEach((key) => {
		settings[key] = getThemeValue(settings, key);
	});
	return settings;
};

const createTheme = (theme: string, settings?: any) => {
	switch (theme) {
		case "dark":
			return {
				...getConfig({
					...defaultTheme,
					...darkTheme,
					...settings,
				}),
			};
		default:
			return {
				...getConfig({
					...defaultTheme,
					...settings,
				}),
			};
	}
};

export function WithTheme(props: any) {
	const [theme, setTheme] = useState("default");
	const changeTheme = (newTheme) => {
		setTheme(newTheme);
	};
	return (
		<div>
			<context.Provider value={{ changeTheme, theme }}>
				<ThemeProvider theme={createTheme(theme)}>
					{props.children}
				</ThemeProvider>
			</context.Provider>
		</div>
	);
}

const TestDiv = styled.div<{ darkcolor: string }>`
	background: ${(props) => {
		return props.theme[props.darkcolor];
	}};
	height: 50px;
	text-align: center;
	line-height: 50px;
	font-weight: bold;
	font-family: simsun;
`;

//dark模式更改：
const darkKey = Object.keys(darkTheme);

function ThemeTest() {
	const { changeTheme, theme } = useContext(context);
	return (
		<div>
			<button
				onClick={() =>
					changeTheme(theme === "default" ? "dark" : "default")
				}
			>
				切换主题
			</button>
			<div>当前主题是：{theme}</div>
			<div>
				暂时只制作default主题和dark主题，主题色部分前往color查看，只展示dark更改部分。
			</div>
			{darkKey.map((key, i) => {
				return (
					<div key={i}>
						<TestDiv darkcolor={key}>
							{key} :
							{theme === "default"
								? defaultTheme[key]
								: darkTheme[key]}
						</TestDiv>
					</div>
				);
			})}
		</div>
	);
}

const themeDemo = () => (
	<WithTheme>
		<ThemeTest></ThemeTest>
	</WithTheme>
);

export default themeDemo;
