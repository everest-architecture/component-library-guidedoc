import React, { useContext, useEffect, useRef, useState } from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
import { context, createTheme } from '../theme/theme';
import {
  commonAnimation,
  modalCloseAnimate,
  modalOpenAnimate,
  progressFlash,
  scrollbars,
  spinAnimate,
  useClickOutside,
} from './shared';

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

const DivWithScroll = styled.div<{ fg: string; bg: string; hint: string }>`
  ${(props) => css`
    height: 200px;
    overflow: scroll;
    ${scrollbars(
      props.theme[props.fg],
      props.theme[props.bg],
      '8px',
      props.theme[props.hint]
    )};
  `}
`;

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
      <DivWithScroll
        fg="textHintColor"
        bg="backgroundBasicColor1"
        hint="textBasicColor"
      >
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
      </DivWithScroll>

      <div>inverse：</div>

      <DivWithScroll
        fg="textHintColor"
        bg="backgroundInverseColor1"
        hint="textInverseColor"
      >
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
      </DivWithScroll>
    </>
  );
}

const AnimateDiv = styled.div<{ posX: number }>`
  height: 20px;
  width: 20px;
  background-color: red;
  ${commonAnimation('0.15')};
  transform: translate(${(props) => props.posX}px, 0);
`;

export function AnimateDemo() {
  const [x, setX] = useState(0);

  useEffect(() => {
    let timer = window.setInterval(() => {
      setX((prev) => {
        if (prev === 0) {
          return 300;
        } else {
          return 0;
        }
      });
    }, 500);
    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <AnimateDiv posX={x}></AnimateDiv>
    </div>
  );
}

const ModalDemoDiv = styled.div<{
  openState: boolean;
}>`
  background: red;
  height: 200px;
  width: 200px;
  ${(props) =>
    props.openState &&
    css`
      animation: ${modalOpenAnimate} 0.5s ease-in;
    `}
  ${(props) =>
    !props.openState &&
    css`
      animation: ${modalCloseAnimate} 0.5s ease-in;
      opacity: 0;
    `}
`;

export function ModalAnimateDemo() {
  const [x, setX] = useState(false);
  useEffect(() => {
    let timer = window.setInterval(() => {
      setX((prev) => !prev);
    }, 1000);
    return () => {
      window.clearInterval(timer);
    };
  }, []);
  return (
    <div>
      <ModalDemoDiv openState={x}></ModalDemoDiv>
    </div>
  );
}

const ProgressDiv = styled.div`
  height: 20px;
  background: red;
  position: relative;
  &::before {
    animation: ${progressFlash} 2.4s cubic-bezier(0.23, 1, 0.32, 1) infinite;
    background: blue;
    bottom: 0;
    content: '';
    left: 0;
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
  }
`;

export function ProgressFlashDemo() {
  return (
    <div>
      <ProgressDiv></ProgressDiv>
    </div>
  );
}

const SpinDiv = styled.div`
  background: red;
  height: 20px;
  width: 20px;
  animation: ${spinAnimate} 1s linear infinite;
`;

export function SpinDemo() {
  return (
    <div>
      <SpinDiv></SpinDiv>
    </div>
  );
}

export function ClickOutSideDemo() {
  const [text, setText] = useState('点击我');
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setText('点击了外面'));
  return (
    <div>
      <div
        ref={ref}
        onClick={() => setText('点击了里面')}
        style={{ height: '250px', width: '250px', backgroundColor: 'red' }}
      >
        <div style={{ backgroundColor: 'blue' }}>我是子div</div>
        {text}
      </div>
    </div>
  );
}
