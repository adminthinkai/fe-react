import React from 'react';
import { QuestionSvg } from 'src/assets/svg/QuestionSvg';
import moment from 'moment';
import Markdown from 'marked-react';

export const BotMessage = ({ message, time }: { message: string; time: string }) => {
  return (
    <div className="mb-2  flex flex-row gap-2 justify-start items-start w-full ">
      <div className="rounded-full  border-[5px] border-dashed border-cyan-800 p-2 ">
        <div className="p-2.5 bg-teal-600 rounded-full">
          <QuestionSvg width={20} height={20} />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-neutral-700 opacity-50 text-xs  font-normal font-['Lato']">
          {moment(time).format('YYYY-MM-DD HH:mm:ss')}
        </p>
        <div className="bg-green-50 text-neutral-700 text-base font-normal font-['Lato'] rounded-lg rounded-tl-none  py-4 px-5 inline-block">
          <Markdown>{message}</Markdown>
        </div>
      </div>
    </div>
  );
};
