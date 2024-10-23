import React from 'react';
import { UserSvg } from 'src/assets/svg/UserSVG';
import moment from 'moment/moment';

export const UserMessage = ({ message, time }: { message: string; time: string }) => {
  return (
    <div className="mb-2 flex flex-row-reverse gap-2 justify-start items-start w-full ">
      <UserSvg />
      <div className="flex flex-col gap-2">
        <p className="text-neutral-700 opacity-50 text-xs text-end font-normal font-['Lato']">
          {moment(time).format('YYYY-MM-DD HH:mm:ss')}
        </p>
        <p className="bg-[#F5F5F5] text-neutral-700 text-base font-normal font-['Lato'] rounded-lg rounded-tr-none  py-4 px-5 inline-block">
          {message}
        </p>
      </div>
    </div>
  );
};
