import React from 'react';

type ClassTypeItemPropsType = {
  title: string;
  isActive: boolean;
  onPress: () => void;
};

export const ClassTypeItem: React.FC<ClassTypeItemPropsType> = ({
  title,
  isActive,
  onPress,
}) => {
  return (
    <div>
      <button
        type="button"
        onClick={onPress}
        className="text-neutral-700 text-lg font-normal font-['Lato']"
      >
        {title}
      </button>
      <div
        style={{ visibility: isActive ? 'visible' : 'hidden' }}
        className="h-0.5 bg-green-400 rounded-[5px]"
      />
    </div>
  );
};
