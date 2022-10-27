import React, { useEffect, useRef, useState } from 'react';

type List = {
  id: number;
  name: string;
};

type Props = {
  selectionList: List[];
  list: List[];
  addInSelect: (id: number) => void;
  removeFromSelect: (id: number) => void;
};

const ListInput: React.FC<Props> = ({ list, selectionList, addInSelect, removeFromSelect }) => {
  const listRef = useRef<HTMLUListElement | null>(null);
  const [topListWidth, setTopListWidth] = useState<number>(0);
  const [showList, setShowList] = useState<boolean>(false);
  const [inputText, setInputText] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const filteredList = list.filter((text) => text.name.toLowerCase().includes(inputText.toLowerCase()));

  useEffect(() => {
    setTopListWidth(listRef.current?.offsetHeight ?? 0);
  }, [listRef, showList, inputText, addInSelect, removeFromSelect]);

  const addInSelectX = (id: number) => {
    addInSelect(id);
    setInputText("");
    inputRef.current?.focus();
  }

  const inputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      e.preventDefault();
      filteredList[0]?.id && addInSelect(filteredList[0]?.id);
      setInputText("");
      inputRef.current?.focus();
    } else if (e.code === 'Backspace' && inputText === '') {
      selectionList[selectionList.length-1]?.id && removeFromSelect(selectionList[selectionList.length-1]?.id as number);
    }
  }

  return (
    <ul
      onFocus={() => setShowList(true)}
      onBlur={() => setShowList(false)}
      className="relative flex h-fit w-full flex-wrap gap-2 py-2 px-1 ring-1"
    >
      {showList && (
        <ul
          ref={listRef}
          style={{
            top: `-${topListWidth}px`
          }}
          className="right-0 absolute z-10 h-fit max-h-32 w-full overflow-y-scroll bg-slate-200"
        >
          {filteredList.map(({ id, name }) => (
            <li onMouseDown={() => addInSelectX(id)} key={id} className="cursor-pointer hover:bg-slate-400 px-1 py-1 text-sm font-medium text-gray-800">
              {name}
            </li>
          ))}
        </ul>
      )}
      {selectionList.map(({ id, name }) => (
        <li key={id} className="flex items-center gap-1 bg-gray-400 px-1">
          <button type='button' onMouseDown={() => removeFromSelect(id)} className="text-lg font-bold text-gray-700">x</button>
          <p className="text-xs font-semibold uppercase text-white">{name}</p>
        </li>
      ))}
      <input
        ref={inputRef}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(e) => inputKeyDown(e)}
        className="bg-transparent flex-grow text-sm text-gray-600 outline-none"
      />
    </ul>
  );
};

export default ListInput;
