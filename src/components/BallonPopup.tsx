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
};

const BallonPopup = (
  { popUpSide, children }: Props,
  ref: LegacyRef<HTMLElement> | undefined
) => {
  const [parentHeight, setParentHeight] = useState<number>();

  useEffect(() => {
    setParentHeight(
      (ref as MutableRefObject<HTMLElement>)?.current?.parentElement
        ?.offsetHeight
    );
    return () => {
      setParentHeight(0);
    };
  }, [ref, parentHeight]);

  return (
    <div
      ref={ref}
      style={{
        top: `${parentHeight ? parentHeight + 10 : 10}px`,
        ...(popUpSide === 'left' ? { left: '0px' } : { right: '0px' })
      }}
      className="absolute z-10 h-fit w-fit rounded-md bg-slate-200 p-1 py-2 shadow-lg dark:bg-gray-700 dark:text-white"
    >
      {children}
    </div>
  );
};

export default forwardRef(BallonPopup);
