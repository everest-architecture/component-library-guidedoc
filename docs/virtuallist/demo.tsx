import React, { useRef } from 'react';
import VirtualList, { SuperVirtualList } from 'yh-react-virtuallist';

const mockArr = new Array(10000).fill(1).map((x, y) => y);

export function VirtuallistDemo() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      style={{
        height: '500px',
        border: '1px solid black',
        overflow: 'auto',
      }}
    >
      this text in the current component
      <div>
        <VirtualList renderNumber={25} itemHeight={30} scrollDom={ref}>
          {mockArr.map((v, i) => {
            return (
              <div
                style={{
                  border: '1px solid black',
                  height: '30px',
                }}
                key={i}
              >
                {v}
              </div>
            );
          })}
        </VirtualList>
      </div>
    </div>
  );
}

export function SuperVirtuallistDemo() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      style={{
        height: '500px',
        border: '1px solid black',
        overflow: 'auto',
      }}
    >
      <div>
        <SuperVirtualList
          scrollDom={ref}
          referItemHeight={25}
          renderNumber={30}
        >
          {mockArr.map((v, i) => {
            return (
              <div
                style={{
                  border: '1px solid black',
                  height: `${Math.random() * 30 + 20}px`,
                }}
                key={i}
              >
                {v}
              </div>
            );
          })}
        </SuperVirtualList>
      </div>
    </div>
  );
}
