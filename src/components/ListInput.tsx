import React, { useState } from 'react';

type List = {
    id: number;
    name: string;
}

type Props = {
  filteredList: List[];
  list: List[];
};

const CreateStep: React.FC<Props> = ({list, filteredList}) => { 
  return(
  <ul className="relative flex flex-wrap gap-4 w-full h-fit py-4 ring-1">
    {filteredList.map(({id, name}) => 
        <li key={id} className="flex px-2 py-1 bg-gray-400">
            <span className='font-bold text-lg text-gray-700'>x</span>
            <p className="text-white text-sm font-bold uppercase">{name}</p>
        </li>
    )}
  </ul>
)};

export default CreateStep;
