import React from 'react';
import { CircularProgress } from '@mui/material';

type ButtonGreenProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const ButtonGreen: React.FC<ButtonGreenProps> = ({ children, ...props }) => {
  return (
    <button
      type="submit"
      className="pt-4 transition delay-75 pb-4 pl-4 pr-4 bg-[#327D6B] rounded-full disabled:opacity-50 hover:opacity-50 active:bg-[#AAE2CA] "
      {...props}
    >
      {props.disabled ? (
        <CircularProgress color="info" />
      ) : (
        <span className="text-white  text-2xl font-bold font-['Lato'] ">{children}</span>
      )}
    </button>
  );
};
