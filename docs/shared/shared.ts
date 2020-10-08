import { RefObject, useEffect } from 'react';
import { css, keyframes } from 'styled-components';
export function debounce(fn: Function, delay: number) {
  let timer: number;
  return function (...args) {
    let that = this;
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      fn.call(that, ...args);
    }, delay);
  };
}

export function throttle(fn: Function, delay: number) {
  let flag = true;
  return function (...args) {
    let that = this;
    if (!flag) return;
    flag = false;
    fn.apply(that, args);
    window.setTimeout(() => {
      flag = true;
    }, delay);
  };
}

export const scrollbars = (
  fg: string,
  bg: string,
  size: string,
  hint: string
) => {
  const borderRadius = parseFloat(size) / 2;
  return css`
    &::-webkit-scrollbar {
      width: ${size};
      height: ${size};
    }

    &::-webkit-scrollbar-track {
      background: ${bg};
    }

    &::-webkit-scrollbar-thumb {
      background: ${fg};
      cursor: pointer;
      border-radius: ${borderRadius}px;
    }

    &::-webkit-scrollbar-thumb:hover {
      cursor: pointer;
      background: ${hint};
    }

    &::-webkit-scrollbar-corner {
      background: ${bg};
    }
  `;
};

export const commonAnimation = (duration: string) => {
  return css`
    transition: all ${duration}s ease-in-out;
  `;
};

export const modalOpenAnimate = keyframes`
  0% {
    opacity: 0;
    transform:scaleY(0,0);
  }
  100% {
    opacity: 1;
    transform:scale(1, 1);
    transform-origin:center;
  }
`;
export const modalCloseAnimate = keyframes`
  0% {
    opacity: 1;
    transform:scale(1, 1);
    transform-origin:center;
  }
  100% {
    opacity: 0;
    transform:scaleY(0,0);
  }
`;

export const progressFlash = keyframes`
  0% { opacity: 0.1;
    width: 0; 
  }
  20% { opacity: 0.5;
    width: 0; 
  } 
  100% { opacity: 0;
    width: 100%; 
  }
`;

export const spinAnimate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export function stopScroll(state: boolean, delay: number, open?: boolean) {
  if (open) {
    let width = window.innerWidth - document.body.clientWidth;
    if (state) {
      document.body.style.overflow = 'hidden';
      document.body.style.width = `calc(100% - ${width}px)`;
    } else {
      window.setTimeout(() => {
        document.body.style.overflow = 'auto';
        document.body.style.width = `100%`;
      }, delay);
    }
  }
}

export function useClickOutside(
  ref: RefObject<HTMLElement>,
  handler: Function
) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };
    window.addEventListener('click', listener);
    return () => window.removeEventListener('click', listener);
  }, [ref, handler]);
}
