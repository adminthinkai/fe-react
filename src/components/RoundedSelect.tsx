import React, { ChangeEvent } from 'react';
import { ArrowDownSVG } from 'src/assets/svg/ArrowDownSVG';
import { FilterType } from 'src/utils/selectorConstants';

type RoundedSelectPropsType = {
  selectItem: string;
  onChangeSelect: (event: ChangeEvent<HTMLSelectElement>) => void;
  items: Array<FilterType>;
};

export const SelectText: React.FC<RoundedSelectPropsType> = ({
  items,
  selectItem,
  onChangeSelect,
}) => {
  return (
    <form>
      <div className="relative">
        <select
          value={selectItem}
          onChange={onChangeSelect}
          className="pl-5 z-10 pr-9 py-2.5 w-full border appearance-none border-gray-200 rounded-[100px] text-black text-base  font-['Lato']"
        >
          {items.map((item, i) => (
            <option key={i} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <div className="absolute top-4 bottom-0 z-0 right-5">
          <ArrowDownSVG />
        </div>
      </div>
    </form>
  );
};
