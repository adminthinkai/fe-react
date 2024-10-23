import React from 'react';

type ButtonBorderedProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const ButtonBordered: React.FC<ButtonBorderedProps> = ({ children, ...props }) => {
  return (
    <button
      type="button"
      className=" pb-2.5 pt-2.5 pr-[30px] pl-[30px] border border-teal-700  rounded-[100px] justify-center items-center gap-[15px] inline-flex"
      {...props}
    >
      <div className="text-neutral-700 text-sm font-normal font-['Lato']">{children}</div>
    </button>
  );
};
