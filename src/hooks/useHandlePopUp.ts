import { MutableRefObject, useEffect, useState } from 'react';

async function sleep(ms: number): Promise<number> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function useHandlePopup<T extends HTMLElement>(
  ref: MutableRefObject<T | null>
): [boolean, () => void] {
  const [state, setState] = useState(false);
  const [visible, setVisible] = useState(false);

  function handleMultipleClicks() {
    if (visible && !state) {
      setVisible(false);
    }
    setState((prev) => !prev);
  }

  function handleDeletion<U extends HTMLElement>(
    element: MutableRefObject<U | null>
  ) {
    const style = element?.current?.style;
    if (!style) return;
    style.animation = 'removed 0.5s forwards';
    sleep(500).then(() => {
      // if (!state) return;
      setVisible(false);
    });
  }

  useEffect(() => {
    if (!state && visible) {
      handleDeletion(ref);
    } else if (state) {
      setVisible(true);
    }
  }, [ref, state]);

  return [visible, handleMultipleClicks];
}

export default useHandlePopup;
