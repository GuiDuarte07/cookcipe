import React, {
  forwardRef,
  LegacyRef,
  MutableRefObject,
  useEffect,
  useState
} from 'react';

type Props = {
  popUpSide: 'left' | 'right';
  children?: React.ReactNode;
  sameWidth?: boolean;
  setFalse: () => void;
};

const BallonPopup = (
  { popUpSide, sameWidth, setFalse, children }: Props,
  ref: LegacyRef<HTMLElement> | undefined
) => {
  const [parentHeight, setParentHeight] = useState<number>();
  const [elementWidth, setElementWidth] = useState<number>();

  useEffect(() => {
    setParentHeight(
      (
        (ref as MutableRefObject<HTMLElement>)?.current
          ?.previousElementSibling as HTMLElement
      )?.offsetHeight
    );

    if (sameWidth) {
      setElementWidth(
        (
          (ref as MutableRefObject<HTMLElement>)?.current
            ?.previousElementSibling as HTMLElement
        )?.offsetWidth
      );
    }

    return () => {
      setParentHeight(0);
    };
  }, [ref, sameWidth, parentHeight, elementWidth]);

  useEffect(() => {
    const clickOutEvent = (e: MouseEvent) => {
      let parentOfParent =
        (e.target as HTMLElement)?.parentElement ?? undefined;
      let isParent = false;

      while (!!parentOfParent && !isParent) {
        if (
          parentOfParent ===
          (ref as MutableRefObject<HTMLElement>)?.current?.parentElement
        ) {
          isParent = true;
        } else {
          parentOfParent = parentOfParent?.parentElement ?? undefined;
        }
      }
      if (!isParent) setFalse();
    };

    document.addEventListener('mousedown', clickOutEvent);

    return () => {
      document.removeEventListener('mousedown', clickOutEvent);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        top: `${parentHeight ? parentHeight + 10 : 8}px`,
        ...(sameWidth ? { width: elementWidth } : {}),
        ...(popUpSide === 'left' ? { left: '0px' } : { right: '0px' })
      }}
      className="absolute z-10 h-fit w-fit rounded-md bg-slate-200 shadow-lg dark:bg-gray-600 dark:text-white"
    >
      {children}
    </div>
  );
};

export default forwardRef(BallonPopup);
