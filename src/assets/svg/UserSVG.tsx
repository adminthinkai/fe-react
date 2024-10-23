import React, { SVGProps } from 'react';

export const UserSvg = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="25" cy="25" r="25" fill="#E6E6E6" />
      <circle
        cx="24.4569"
        cy="22.2825"
        r="7.17391"
        stroke="white"
        strokeWidth="1.95652"
      />
      <path
        d="M8.69531 42.3911C10.4466 38.4075 14.6242 30.1894 25.2961 30.4402C34.7823 30.6631 39.8446 38.4075 41.304 42.3911"
        stroke="white"
        strokeWidth="1.95652"
        strokeLinecap="round"
      />
    </svg>
  );
};
