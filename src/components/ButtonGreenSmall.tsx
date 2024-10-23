import React from 'react';
import { CircularProgress } from '@mui/material';

type ButtonGreenSmallProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  isLoading?: boolean;
};

export const ButtonGreenSmall: React.FC<ButtonGreenSmallProps> = ({
  children,
  isLoading,
  ...props
}) => {
  return (
    <button
      type="button"
      className="min-w-40 pb-2.5 pt-2.5 pr-[30px] pl-[30px] bg-teal-700 rounded-[100px] justify-center items-center gap-[15px] inline-flex"
      disabled={isLoading}
      {...props}
    >
      <div className="text-white text-base font-semibold font-['Lato']">
        {isLoading ? (
          <div className="flex gap-3">
            <CircularProgress size={20} color="inherit" />
            Loading
          </div>
        ) : (
          children
        )}
      </div>
    </button>
  );
};
