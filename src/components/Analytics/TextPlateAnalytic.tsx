import React from 'react';

type TextPlateAnalyticType = {
  title: string;
  value: string;
  lastPeriod: string;
};

export const TextPlateAnalytic: React.FC<TextPlateAnalyticType> = ({
  lastPeriod,
  value,
  title,
}) => {
  return (
    <div className=" p-5 w-full bg-white rounded-[10px] border border-solid border-neutral-200">
      <div className="flex justify-between">
        <span className="text-neutral-700 text-lg font-semibold font-['Lato']">
          {title}
        </span>
        <span className="text-neutral-700 opacity-50 text-sm font-normal font-['Lato']">
          {lastPeriod}
        </span>
      </div>
      <div>
        <span className="text-neutral-700 text-6xl font-semibold font-['Lato']">
          {value}
        </span>
      </div>
    </div>
  );
};
