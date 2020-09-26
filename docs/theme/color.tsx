import React, { CSSProperties } from "react";
import { getConfig } from "./theme";

export const basicColor = {
	red100: "#fff1f0",
	red200: "#ffccc7",
	red300: "#ffa39e",
	red400: "#ff7875",
	red500: "#ff4d4f",
	red600: "#f5222d",
	red700: "#cf1322",
	red800: "#a8071a",
	red900: "#820014",
	red1000: "#5c0011",
	volcano100: "#fff2e8",
	volcano200: "#ffd8bf",
	volcano300: "#ffbb96",
	volcano400: "#ff9c6e",
	volcano500: "#ff7a45",
	volcano600: "#fa541c",
	volcano700: "#d4380d",
	volcano800: "#ad2102",
	volcano900: "#871400",
	volcano1000: "#610b00",
	orange100: "#fff7e6",
	orange200: "#ffe7ba",
	orange300: "#ffd591",
	orange400: "#ffc069",
	orange500: "#ffa940",
	orange600: "#fa8c16",
	orange700: "#d46b08",
	orange800: "#ad4e00",
	orange900: "#873800",
	orange1000: "#612500",
	gold100: "#fffbe6",
	gold200: "#fff1b8",
	gold300: "#ffe58f",
	gold400: "#ffd666",
	gold500: "#ffc53d",
	gold600: "#faad14",
	gold700: "#d48806",
	gold800: "#ad6800",
	gold900: "#874d00",
	gold1000: "#613400",
	yellow100: "#feffe6",
	yellow200: "#ffffb8",
	yellow300: "#fffb8f",
	yellow400: "#fff566",
	yellow500: "#ffec3d",
	yellow600: "#fadb14",
	yellow700: "#d4b106",
	yellow800: "#ad8b00",
	yellow900: "#876800",
	yellow1000: "#614700",
	lime100: "#fcffe6",
	lime200: "#f4ffb8",
	lime300: "#eaff8f",
	lime400: "#d3f261",
	lime500: "#bae637",
	lime600: "#a0d911",
	lime700: "#7cb305",
	lime800: "#5b8c00",
	lime900: "#3f6600",
	lime1000: "#254000",
	green100: "#f6ffed",
	green200: "#d9f7be",
	green300: "#b7eb8f",
	green400: "#95de64",
	green500: "#73d13d",
	green600: "#52c41a",
	green700: "#389e0d",
	green800: "#237804",
	green900: "#135200",
	green1000: "#092b00",
	cyan100: "#e6fffb",
	cyan200: "#b5f5ec",
	cyan300: "#87e8de",
	cyan400: "#5cdbd3",
	cyan500: "#36cfc9",
	cyan600: "#13c2c2",
	cyan700: "#08979c",
	cyan800: "#006d75",
	cyan900: "#00474f",
	cyan1000: "#002329",
	blue100: "#e6f7ff",
	blue200: "#bae7ff",
	blue300: "#91d5ff",
	blue400: "#69c0ff",
	blue500: "#40a9ff",
	blue600: "#1890ff",
	blue700: "#096dd9",
	blue800: "#0050b3",
	blue900: "#003a8c",
	blue1000: "#002766",
	geekblue100: "#f0f5ff",
	geekblue200: "#d6e4ff",
	geekblue300: "#adc6ff",
	geekblue400: "#85a5ff",
	geekblue500: "#597ef7",
	geekblue600: "#2f54eb",
	geekblue700: "#1d39c4",
	geekblue800: "#10239e",
	geekblue900: "#061178",
	geekblue1000: "#030852",
	purple100: "#f9f0ff",
	purple200: "#efdbff",
	purple300: "#d3adf7",
	purple400: "#b37feb",
	purple500: "#9254de",
	purple600: "#722ed1",
	purple700: "#531dab",
	purple800: "#391085",
	purple900: "#22075e",
	purple1000: "#120338",
	magenta100: "#fff0f6",
	magenta200: "#ffd6e7",
	magenta300: "#ffadd2",
	magenta400: "#ff85c0",
	magenta500: "#f759ab",
	magenta600: "#eb2f96",
	magenta700: "#c41d7f",
	magenta800: "#9e1068",
	magenta900: "#780650",
	magenta1000: "#520339",
	gray100: "#ffffff",
	gray200: "#fafafa",
	gray300: "#f5f5f5",
	gray400: "#f0f0f0",
	gray500: "#d9d9d9",
	gray600: "#bfbfbf",
	gray700: "#8c8c8c",
	gray800: "#595959",
	gray900: "#434343",
	gray1000: "#262626",
	gray1100: "#1f1f1f",
	gray1200: "#141414",
	gray1300: "#000000",
	primary100: "#f0f4ff",
	primary200: "#ebefff",
	primary300: "#c2cdff",
	primary400: "#99a8ff",
	primary500: "#6e7efa",
	primary600: "#4351ee",
	primary700: "#2e35c7",
	primary800: "#1d1fa1",
	primary900: "#12107a",
	primary1000: "#0e0a54",
};

//主题色对于focuse disable active  hover等会有变化，
// 用户可以覆盖来更改
export const themeColor = {
	colorPrimaryFocus: "primary600",
	colorPrimaryHover: "primary400",
	colorPrimaryDefault: "primary500",
	colorPrimaryActive: "colorPrimaryFocus",
	colorPrimaryDisabled: "primary300",
	colorPrimaryFocusBorder: "primary700",
	colorPrimaryHoverBorder: "colorPrimaryHover",
	colorPrimaryDefaultBorder: "colorPrimaryDefault",
	colorPrimaryActiveBorder: "colorPrimaryActive",
	colorPrimaryDisabledBorder: "colorPrimaryDisabled",
};
//功能色同主题色 以后可以再加
export const statusColor = {
	//basic 不属于任何时
	colorBasicFocus: "gray600",
	colorBasicHover: "gray400",
	colorBasicDefault: "gray500",
	colorBasicActive: "colorBasicFocus",
	colorBasicDisabled: "gray300",
	colorBasicFocusBorder: "gray700",
	colorBasicHoverBorder: "colorBasicHover",
	colorBasicDefaultBorder: "colorBasicDefault",
	colorBasicActiveBorder: "colorBasicActive",
	colorBasicDisabledBorder: "colorBasicDisabled",
	//success
	colorSuccessFocus: "green600",
	colorSuccessHover: "green400",
	colorSuccessDefault: "green500",
	colorSuccessActive: "colorSuccessFocus",
	colorSuccessDisabled: "green300",
	colorSuccessFocusBorder: "green700",
	colorSuccessHoverBorder: "colorSuccessHover",
	colorSuccessDefaultBorder: "colorSuccessDefault",
	colorSuccessActiveBorder: "colorSuccessActive",
	colorSuccessDisabledBorder: "colorSuccessDisabled",
	//info
	colorInfoFocus: "blue600",
	colorInfoHover: "blue400",
	colorInfoDefault: "blue500",
	colorInfoActive: "blue600",
	colorInfoDisabled: "blue300",
	colorInfoFocusBorder: "blue700",
	colorInfoHoverBorder: "colorInfoHover",
	colorInfoDefaultBorder: "colorInfoDefault",
	colorInfoActiveBorder: "colorInfoActive",
	colorInfoDisabledBorder: "colorInfoDisabled",
	//danger
	colorDangerFocus: "red600",
	colorDangerHover: "red400",
	colorDangerDefault: "red500",
	colorDangerActive: "red600",
	colorDangerDisabled: "red300",
	colorDangerFocusBorder: "red700",
	colorDangerHoverBorder: "colorDangerHover",
	colorDangerDefaultBorder: "colorDangerDefault",
	colorDangerActiveBorder: "colorDangerActive",
	colorDangerDisabledBorder: "colorDangerDisabled",
	//warning
	colorWarningFocus: "yellow600",
	colorWarningHover: "yellow400",
	colorWarningDefault: "yellow500",
	colorWarningActive: "yellow600",
	colorWarningDisabled: "yellow300",
	colorWarningFocusBorder: "yellow700",
	colorWarningHoverBorder: "colorWarningHover",
	colorWarningDefaultBorder: "colorWarningDefault",
	colorWarningActiveBorder: "colorWarningActive",
	colorWarningDisabledBorder: "colorWarningDisabled",
};

//默认是浅色模式
//除此外下面的都需要设计其反白色，在激活或者弹窗时，显示另一种颜色。
export const backgroundColor = {
	backgroundBasicColor1: "gray100",
	backgroundBasicColor2: "gray200",
	backgroundBasicColor3: "gray300",
	backgroundBasicColor4: "gray400",
	backgroundInverseColor1: "gray900",
	backgroundInverseColor2: "gray1000",
	backgroundInverseColor3: "gray1100",
	backgroundInverseColor4: "gray1200",
};
//border 一般是界面那种
export const borderColor = {
	borderInverseColor1: "gray900",
	borderInverseColor2: "gray1000",
	borderInverseColor3: "gray1100",
	borderInverseColor4: "gray1200",
	borderBasicColor1: "gray100",
	borderBasicColor2: "gray200",
	borderBasicColor3: "gray300",
	borderBasicColor4: "gray400",
};
// 文字颜色
export const textColor = {
	textBasicColor: "gray800",
	textInverseColor: "gray100",
	textDisabledColor: "gray400",
	textHintColor: "gray600",
};

// shadow outline 等其他部分添加与此
export const extraColor = {
	outlineColor: "gray200",
};

const divStyle = (v: string): CSSProperties => {
	return {
		backgroundColor: v,
		textAlign: "center",
		height: "50px",
		lineHeight: "50px",
		fontWeight: "bold",
		fontFamily: "simsun",
	};
};

const ColorToDumi = () => {
	return (
		<div>
			<div>
				<h1>基础色</h1>
				<div>基础色主要便于挑选各种基础颜色</div>
				{Object.keys(basicColor).map((key: string, i) => {
					return (
						<div key={i} style={divStyle(basicColor[key])}>
							{key} : {basicColor[key]}
						</div>
					);
				})}
			</div>
			<div>
				<h1>主题色</h1>
				<div>
					也叫品牌色，偏向选蓝色，这个是随便挑了个蓝色在antd生成器里生成的。
				</div>
				{Object.keys(themeColor).map((key: string, i) => {
					return (
						<div
							key={i}
							style={divStyle(
								getConfig({ ...basicColor, ...themeColor })[key]
							)}
						>
							{key} : {themeColor[key]}
						</div>
					);
				})}
			</div>
			<div>
				<h1>状态色</h1>
				<div>参照主题色模式设定，只是颜色不一样</div>
				{Object.keys(statusColor).map((key: string, i) => {
					return (
						<div
							key={i}
							style={divStyle(
								getConfig({ ...basicColor, ...statusColor })[
									key
								]
							)}
						>
							{key} : {statusColor[key]}
						</div>
					);
				})}
			</div>
			<div>
				<h1>背景色</h1>
				<div>暗色主题相反</div>
				{Object.keys(backgroundColor).map((key: string, i) => {
					return (
						<div
							key={i}
							style={divStyle(
								getConfig({
									...basicColor,
									...backgroundColor,
								})[key]
							)}
						>
							{key} : {backgroundColor[key]}
						</div>
					);
				})}
			</div>
			<div>
				<h1>边框色</h1>
				<div>主要是界面那种边框</div>
				{Object.keys(borderColor).map((key: string, i) => {
					return (
						<div
							key={i}
							style={divStyle(
								getConfig({
									...basicColor,
									...borderColor,
								})[key]
							)}
						>
							{key} : {borderColor[key]}
						</div>
					);
				})}
			</div>
			<div>
				<h1>文字色</h1>
				{Object.keys(textColor).map((key: string, i) => {
					return (
						<div
							key={i}
							style={divStyle(
								getConfig({
									...basicColor,
									...textColor,
								})[key]
							)}
						>
							{key} : {textColor[key]}
						</div>
					);
				})}
			</div>
			<div>
				<h1>额外部分</h1>
				{Object.keys(extraColor).map((key: string, i) => {
					return (
						<div
							key={i}
							style={divStyle(
								getConfig({
									...basicColor,
									...extraColor,
								})[key]
							)}
						>
							{key} : {extraColor[key]}
						</div>
					);
				})}
			</div>
		</div>
	);
};
export default ColorToDumi;
