import React, { useState } from 'react';
import { TiDelete } from 'react-icons/ti';

type Props = {
  step: number;
  text: string;
  onChange: (step: number, value: string) => void;
  onClick: (step: number) => void;
};

const CreateStep: React.FC<Props> = ({ step, text, onChange, onClick }) => {
  const [hover, setHover] = useState(false);

  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        onMouseEnter={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        onBlur={() => setHover(false)}
        onClick={() => onClick(step)}
        className="flex h-9 w-9 items-center justify-center rounded border-2 border-solid border-black bg-orange-400 dark:border-white dark:bg-orange-500"
      >
        {hover ? <TiDelete className="pointer-events-none" /> : step}
      </button>
      <input
        type="text"
        placeholder="Etapa"
        className="h-9 flex-1 rounded pl-2 text-gray-700 shadow-md outline-none dark:text-gray-200"
        value={text}
        onChange={(e) => onChange(step, e.target.value)}
      />
    </div>
  );
};

export default CreateStep;
