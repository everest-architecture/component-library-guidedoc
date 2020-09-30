import React, { useContext, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { context, createTheme, WithTheme } from '../theme/theme';

const DivWrapper = styled.div<{ bg: string; bd: string }>`
  background-color: ${(props) => props.theme[props.bg]};
  border: 1px solid ${(props) => props.theme[props.bd]};
`;

const Pwrapper = styled.p<{ cl: string }>`
  color: ${(props) => props.theme[props.cl]};
`;

const bgarr = new Array(4).fill(1).map((x, y) => y + 1);

export default function () {
  const [theme, setTheme] = useState('default');
  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };
  return (
    <div>
      <context.Provider value={{ changeTheme, theme }}>
        <ThemeProvider theme={createTheme(theme)}>
          <TestDEMO></TestDEMO>
        </ThemeProvider>
      </context.Provider>
    </div>
  );
}

function TestDEMO() {
  const { changeTheme, theme } = useContext(context);
  return (
    <>
      <button
        onClick={() => changeTheme(theme === 'default' ? 'dark' : 'default')}
      >
        切换主题
      </button>
      <div>当前主题是：{theme}</div>
      {bgarr.map((v, i) => (
        <DivWrapper
          bd={'borderBasicColor' + v}
          key={i}
          bg={'backgroundBasicColor' + v}
        >
          <Pwrapper cl="textBasicColor">textBasicColor</Pwrapper>
          <Pwrapper cl="textDisabledColor">textDisabledColor</Pwrapper>
          <Pwrapper cl="textHintColor">textHintColor</Pwrapper>
        </DivWrapper>
      ))}
      <div>inverse：</div>
      {bgarr.map((v, i) => (
        <DivWrapper
          bd={'borderInverseColor' + v}
          key={i}
          bg={'backgroundInverseColor' + v}
        >
          <Pwrapper cl="textInverseColor">textInverseColor</Pwrapper>
          <Pwrapper cl="textDisabledColor">textDisabledColor</Pwrapper>
          <Pwrapper cl="textHintColor">textHintColor</Pwrapper>
        </DivWrapper>
      ))}
    </>
  );
}

const DivShadow = styled.div<{ bs: string }>`
  margin: 20px;
  box-shadow: ${(props) => props.theme[props.bs]};
  height: 50px;
`;

export function ShadowDemo() {
  return (
    <div>
      <WithTheme>
        <DivShadow bs="boxShadowUp">boxShadowUp</DivShadow>
        <DivShadow bs="boxShadowDown">boxShadowDown</DivShadow>
        <DivShadow bs="boxShadowLeft">boxShadowLeft</DivShadow>
        <DivShadow bs="boxShadowRight">boxShadowRight</DivShadow>
      </WithTheme>
    </div>
  );
}
