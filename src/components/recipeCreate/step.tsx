import React from 'react';

type Props = {
  step: number;
  text: string;
  onChange: (step: number, value: string) => void;
};

const CreateStep: React.FC<Props> = ({ step, text, onChange }) => (
  <div className="flex items-center gap-4">
    <p className="flex h-9 w-9 items-center justify-center rounded bg-orange-200">
      {step}
    </p>
    <input
      type="text"
      placeholder="Etapa"
      className="h-9 flex-1 rounded pl-2 text-gray-700 shadow-md outline-none"
      value={text}
      onChange={(e) => onChange(step, e.target.value)}
    />
  </div>
);

export default CreateStep;
