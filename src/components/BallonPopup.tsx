import React, {
  forwardRef,
  MutableRefObject,
  useEffect,
  useState
} from 'react';

/* interface BallonPopupType extends React.HTMLAttributes<HTMLElement> {
  props: { popUpSide: 'left' | 'right'; children: React.ReactNode };
  balloonRef: MutableRefObject<HTMLDivElement | null>;
} */

type Props = {
  popUpSide: 'left' | 'right';
  children: React.ReactNode;
};

const BallonPopup = forwardRef(
  (
    { popUpSide, children }: Props,
    balloonRef: MutableRefObject<HTMLElement | null>
  ) => {
    const [parentHeight, setParentHeight] = useState<number>();

    useEffect(() => {
      setParentHeight(balloonRef.current.parentElement.offsetHeight);
      return () => {
        setParentHeight(0);
      };
    }, [parentHeight]);

    return (
       <div className="absolute shadow rounded-md bg-slate-400 z-10 w-40 h-0 left00">
        <div className="top-[-9px] right-5 absolute w-0 h-0 rounded-md border-t-0 border-b-[10px] border-solid border-transparent border-b-slate-300"></div>
       </div>
  }
);

export default BallonPopup;

