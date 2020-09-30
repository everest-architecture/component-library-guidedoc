import React, {
  useState,
  createContext,
  useContext,
  CSSProperties,
} from 'react';
import styled, { ThemeProvider } from 'styled-components';
import {
  backgroundColor,
  basicColor,
  borderColor,
  extraColor,
  statusColor,
  textColor,
  themeColor,
} from './color';
import { darkTheme } from './darkTheme';
import { defaultTheme } from './defaultTheme';

interface IContextType {
  changeTheme: Function;
  theme: string;
}

export const context = createContext<IContextType>({
  changeTheme: () => {},
  theme: 'default',
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

export const createTheme = (theme: string, settings?: any) => {
  switch (theme) {
    case 'dark':
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
  const [theme, setTheme] = useState('default');
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
        onClick={() => changeTheme(theme === 'default' ? 'dark' : 'default')}
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
              {key} :{theme === 'default' ? defaultTheme[key] : darkTheme[key]}
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

const divStyle = (v: string): CSSProperties => {
  return {
    backgroundColor: v,
    textAlign: 'center',
    height: '50px',
    lineHeight: '50px',
    fontWeight: 'bold',
    fontFamily: 'simsun',
  };
};
//由于dumi循环引用的bug 示例改放这里
export const ColorToDumi = () => {
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
              style={divStyle(getConfig({ ...basicColor, ...themeColor })[key])}
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
                getConfig({ ...basicColor, ...statusColor })[key]
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
