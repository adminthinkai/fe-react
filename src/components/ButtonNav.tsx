import React from 'react';

type ButtonNavProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  active?: boolean;
  color?: string | undefined;
  visible?: 'none' | 'visible';
};

export const ButtonNav: React.FC<ButtonNavProps> = ({
  children,
  active,
  color,
  visible,
  ...props
}) => {
  return (
    <button
      {...props}
      type="button"
      className={` px-4 py-2.5 ${active ? 'opacity-90' : 'opacity-50'}   rounded-[100px] justify-start items-center gap-[15px] inline-flex`}
      style={{
        backgroundColor: active ? color || '#56c596' : '',
        display: visible === 'visible' ? 'flex' : 'none',
      }}
    >
      <div
        style={{ fontWeight: active ? 600 : 400 }}
        className={`text-white flex justify-center items-center flex-row gap-4 text-lg  font-['Late']`}
      >
        {children}
      </div>
    </button>
  );
};
