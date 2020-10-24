import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { context, createTheme } from '../theme/theme';
import { Button, Shape, Size, Status } from './button';

const sizelist: Array<Size> = ['sm', 'md', 'lg'];

const shapelist: Array<Shape> = ['rect', 'sround', 'round'];

const statuslist: Array<Status> = [
  'basic',
  'danger',
  'info',
  'primary',
  'success',
  'warning',
];

const BackgroundDiv = styled.div`
  background: ${(props) => {
    return props.theme.backgroundBasicColor1;
  }};
`;

export function FilledDemo() {
  const [theme, setTheme] = useState('default');
  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };
  return (
    <>
      <context.Provider value={{ changeTheme, theme }}>
        <ThemeProvider theme={createTheme(theme)}>
          <button
            onClick={() =>
              changeTheme(theme === 'default' ? 'dark' : 'default')
            }
          >
            当前主题{theme}
          </button>
          <BackgroundDiv>
            <div style={{ padding: '20px' }}>
              {sizelist.map((v, i) => {
                return (
                  <Button
                    style={{ margin: '5px' }}
                    key={i}
                    btnType="filled"
                    size={v}
                  >
                    size:{v}
                  </Button>
                );
              })}
            </div>
            <div style={{ padding: '20px' }}>
              {shapelist.map((v, i) => {
                return (
                  <Button
                    style={{ margin: '5px' }}
                    key={i}
                    btnType="filled"
                    shape={v}
                  >
                    shape:{v}
                  </Button>
                );
              })}
            </div>
            <div style={{ padding: '20px' }}>
              {statuslist.map((v, i) => {
                return (
                  <Button
                    style={{ margin: '5px' }}
                    key={i}
                    btnType="filled"
                    status={v}
                  >
                    status:{v}
                  </Button>
                );
              })}
            </div>
            <div style={{ padding: '20px' }}>
              {statuslist.map((v, i) => {
                return (
                  <Button
                    style={{ margin: '5px' }}
                    key={i}
                    btnType="filled"
                    status={v}
                    disabled
                  >
                    status:{v}
                  </Button>
                );
              })}
            </div>
          </BackgroundDiv>
        </ThemeProvider>
      </context.Provider>
    </>
  );
}

export function OutlineDemo() {
  const [theme, setTheme] = useState('default');
  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };
  return (
    <>
      <context.Provider value={{ changeTheme, theme }}>
        <ThemeProvider theme={createTheme(theme)}>
          <button
            onClick={() =>
              changeTheme(theme === 'default' ? 'dark' : 'default')
            }
          >
            当前主题{theme}
          </button>
          <BackgroundDiv>
            <div style={{ padding: '20px' }}>
              {sizelist.map((v, i) => {
                return (
                  <Button
                    style={{ margin: '5px' }}
                    key={i}
                    btnType="outline"
                    size={v}
                  >
                    size:{v}
                  </Button>
                );
              })}
            </div>
            <div style={{ padding: '20px' }}>
              {shapelist.map((v, i) => {
                return (
                  <Button
                    style={{ margin: '5px' }}
                    key={i}
                    btnType="outline"
                    shape={v}
                  >
                    shape:{v}
                  </Button>
                );
              })}
            </div>
            <div style={{ padding: '20px' }}>
              {statuslist.map((v, i) => {
                return (
                  <Button
                    style={{ margin: '5px' }}
                    key={i}
                    btnType="outline"
                    status={v}
                  >
                    status:{v}
                  </Button>
                );
              })}
            </div>
            <div style={{ padding: '20px' }}>
              {statuslist.map((v, i) => {
                return (
                  <Button
                    style={{ margin: '5px' }}
                    key={i}
                    btnType="outline"
                    status={v}
                    disabled
                  >
                    status:{v}
                  </Button>
                );
              })}
            </div>
          </BackgroundDiv>
        </ThemeProvider>
      </context.Provider>
    </>
  );
}

export function GhostDemo() {
  const [theme, setTheme] = useState('default');
  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };
  return (
    <>
      <context.Provider value={{ changeTheme, theme }}>
        <ThemeProvider theme={createTheme(theme)}>
          <button
            onClick={() =>
              changeTheme(theme === 'default' ? 'dark' : 'default')
            }
          >
            当前主题{theme}
          </button>
          <BackgroundDiv>
            <div style={{ padding: '20px' }}>
              {sizelist.map((v, i) => {
                return (
                  <Button
                    style={{ margin: '5px' }}
                    key={i}
                    btnType="ghost"
                    size={v}
                  >
                    size:{v}
                  </Button>
                );
              })}
            </div>
            <div style={{ padding: '20px' }}>
              {shapelist.map((v, i) => {
                return (
                  <Button
                    style={{ margin: '5px' }}
                    key={i}
                    btnType="ghost"
                    shape={v}
                  >
                    shape:{v}
                  </Button>
                );
              })}
            </div>
            <div style={{ padding: '20px' }}>
              {statuslist.map((v, i) => {
                return (
                  <Button
                    style={{ margin: '5px' }}
                    key={i}
                    btnType="ghost"
                    status={v}
                  >
                    status:{v}
                  </Button>
                );
              })}
            </div>
            <div style={{ padding: '20px' }}>
              {statuslist.map((v, i) => {
                return (
                  <Button
                    style={{ margin: '5px' }}
                    key={i}
                    btnType="ghost"
                    status={v}
                    disabled
                  >
                    status:{v}
                  </Button>
                );
              })}
            </div>
          </BackgroundDiv>
        </ThemeProvider>
      </context.Provider>
    </>
  );
}
