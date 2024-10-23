import * as React from 'react';
import { SVGProps } from 'react';

export const EmailAnswerSVG = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={60}
    height={60}
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6.223 23.147V15a6 6 0 0 1 6-6H49.41a6 6 0 0 1 6 6v28.7a6 6 0 0 1-6 6H37.999"
      stroke="#4B8E73"
    />
    <path
      d="M27.955 27.688 8.461 11.386a.55.55 0 0 1-.036-.811l.286-.286A4.4 4.4 0 0 1 11.822 9h38.139a4.4 4.4 0 0 1 1.968.465l.344.172a.55.55 0 0 1 .12.903L33.177 27.61a4 4 0 0 1-5.223.078Zm-16.725.962v6.468C22.546 33.594 37.781 51.44 31.687 46.87c-4.875-3.656-15.67-4.425-20.459-4.352v5.318a.55.55 0 0 1-.958.369l-8.928-9.878a.55.55 0 0 1 .012-.75l8.928-9.308a.55.55 0 0 1 .946.381Z"
      fill="#C6EBE0"
      stroke="#4B8E73"
    />
    <g clipPath="url(#a)">
      <path
        d="M48.688 37.737c0 .672.191.94.691.94 1.115 0 1.825-1.42 1.825-3.781 0-3.61-2.63-5.338-5.915-5.338-3.378 0-6.451 2.266-6.451 6.547 0 4.09 2.688 6.317 6.816 6.317 1.401 0 2.342-.153 3.781-.633l.31 1.285c-1.421.462-2.94.595-4.11.595-5.415 0-8.315-2.976-8.315-7.564 0-4.628 3.361-7.776 7.988-7.776 4.82 0 7.372 2.88 7.372 6.412 0 2.996-.94 5.28-3.897 5.28-1.344 0-2.227-.537-2.342-1.728-.346 1.324-1.267 1.728-2.516 1.728-1.67 0-3.072-1.287-3.072-3.878 0-2.611 1.23-4.224 3.438-4.224 1.17 0 1.9.46 2.225 1.19l.558-1.017h1.613zm-2.36-2.534c0-1.055-.789-1.498-1.441-1.498-.71 0-1.497.576-1.497 2.266 0 1.344.595 2.093 1.497 2.093.633 0 1.44-.403 1.44-1.517z"
        fill="#4B8E73"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M37 28h16v16H37z" />
      </clipPath>
    </defs>
  </svg>
);
