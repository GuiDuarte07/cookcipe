import React, { useState } from 'react';

type Props = {
  step: number;
  text: string;
  onChange: (step: number, value: string) => void;
};

const CreateStep: React.FC<Props> = ({ step, text, onChange }) => { 
  console.log('renderizou', step, text);
  const [hover, setHover] = useState(false);

  return(
  <div className="flex items-center gap-4">
    <button type="button" onMouseEnter={() => setHover(true)} onMouseOut={() => setHover(false)}  className="flex h-9 w-9 items-center justify-center rounded bg-orange-200">
      {hover ? 'x' : step}
    </button>
    <input
      type="text"
      placeholder="Etapa"
      className="h-9 flex-1 rounded pl-2 text-gray-700 shadow-md outline-none"
      value={text}
      onChange={(e) => onChange(step, e.target.value)}
    />
  </div>
)};

export default CreateStep;
