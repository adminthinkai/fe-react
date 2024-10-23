import * as React from 'react';
import { SVGProps } from 'react';

export const ListBoardSVG = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={60}
    height={60}
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      x={9.5}
      y={7.5}
      width={41}
      height={49}
      rx={3.5}
      fill="#C6EBE0"
      stroke="#4B8E73"
    />
    <rect
      x={13.5}
      y={10.5}
      width={33}
      height={43}
      rx={1.5}
      fill="#fff"
      stroke="#4B8E73"
    />
    <rect
      x={22.5}
      y={5.5}
      width={15}
      height={6}
      rx={0.5}
      fill="#C6EBE0"
      stroke="#4B8E73"
    />
    <mask id="a" fill="#fff">
      <path d="M25 3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2H25z" />
    </mask>
    <path d="M25 3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2H25z" fill="#C6EBE0" />
    <path
      d="M24 3a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2zm11 2H25zM24 5V3a2 2 0 0 1 2-2v4zm10-4a2 2 0 0 1 2 2v2h-2z"
      fill="#4B8E73"
      mask="url(#a)"
    />
    <path d="m24.145 33.913 22.47-23.144 2.511 2.438-22.47 23.144z" fill="#4B8E73" />
    <path
      d="m46.617 10.769 1.55-1.597a1 1 0 0 1 1.415-.02l1.076 1.044a1 1 0 0 1 .02 1.414l-1.55 1.597zM22.99 36.612l1.156-2.699 2.51 2.438-2.662 1.236-1.738.785z"
      fill="#999F9D"
    />
    <path d="m22.777 37.08.69-1.576 1.617 1.569-1.554.74-1.276.56z" fill="#4B8E73" />
    <path
      d="M24 39h-1a2 2 0 0 0 0 4h14a2 2 0 0 1 0 4h-4"
      stroke="#4B8E73"
      strokeWidth={0.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
