import React, { useState } from 'react';
import { randomLetter, generateBlob } from 'yh-verificationcode';

export function Demo1() {
  const [state, setState] = useState({
    url: '',
    code: '',
  });
  return (
    <div>
      <div>
        <button
          onClick={() => {
            const val = randomLetter(5);
            const p = generateBlob(val);
            p.then((res) => {
              if (res) {
                const str = window.URL.createObjectURL(res);
                setState((pre) => {
                  window.URL.revokeObjectURL(pre.url);
                  return {
                    url: str,
                    code: val,
                  };
                });
              }
            });
          }}
        >
          generate code
        </button>
        {state.url !== '' && <img src={state.url} alt="valicode"></img>}
        {state.code}
      </div>
    </div>
  );
}

export function Demo2() {
  const [state, setState] = useState({
    url: '',
    code: '',
  });
  return (
    <div>
      <div>
        <button
          onClick={() => {
            const val = randomLetter(8, ['支', '持', '生', '成', '汉', '字']);
            const p = generateBlob(val, {
              width: 800,
              height: 200,
            });
            p.then((res) => {
              if (res) {
                const str = window.URL.createObjectURL(res);
                setState((pre) => {
                  window.URL.revokeObjectURL(pre.url);
                  return {
                    url: str,
                    code: val,
                  };
                });
              }
            });
          }}
        >
          generate code
        </button>
        {state.url !== '' && <img src={state.url} alt="valicode"></img>}
        {state.code}
      </div>
    </div>
  );
}
