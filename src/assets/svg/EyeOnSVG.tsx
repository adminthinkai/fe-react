import { SVGProps } from 'react';
import { JSX } from 'react/jsx-runtime';

export const EyeOnSVG = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle
        cx="15"
        cy="15"
        r="2.5"
        stroke="#363C39"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 23.75C10 23.75 5.83375 20.8337 2.5 15C5.83375 9.16625 10 6.25 15 6.25C20 6.25 24.1662 9.16625 27.5 15C26.975 15.92 26.4275 16.7675 25.8612 17.5412"
        stroke="#363C39"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.75 23.75L21.25 26.25L26.25 21.25"
        stroke="#363C39"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
