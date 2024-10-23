import React from 'react';
import { QuestionSvg } from 'src/assets/svg/QuestionSvg';
import { useAppSelector } from 'src/hooks/storeHooks';

type ButtonChatProps = {
  onChat: () => void;
  isLoading: boolean;
  color?: string;
};

export const ButtonChat: React.FC<ButtonChatProps> = ({
  onChat,
  isLoading,
  color = '#119293',
}) => {
  console.log(color);
  const { isLoadingChat } = useAppSelector(state => state.chat);

  return (
    <button
      className="relative w-[140px] h-[140px] flex flex-col items-center justify-center"
      onClick={onChat}
      disabled={isLoading}
      type="button"
    >
      <div
        style={{
          display: isLoadingChat ? 'flex' : 'none',
          opacity: isLoadingChat ? 1 : 0,
        }}
        className="absolute w-[140px] h-[140px] opacity-0 flex flex-col items-center justify-center transition-opacity ease-in-out delay-300"
      >
        <div className="w-[120px] h-[120px]  absolute bg-white rounded-full border-4 border-[#205072]" />
        <div
          style={{ backgroundColor: color }}
          className="w-[130px] h-[130px]  absolute opacity-20 rounded-full"
        />
        <div
          style={{ backgroundColor: color }}
          className="w-[140px] h-[140px]  absolute opacity-20 rounded-full"
        />
        <div
          style={{ backgroundColor: color }}
          className="w-[120px] h-[120px]  absolute opacity-30 rounded-full"
        />
        <div
          style={{ backgroundColor: color }}
          className="w-[110px] h-[110px]  absolute opacity-50 rounded-full"
        />
        <div
          style={{ backgroundColor: color }}
          className="w-[100px] h-[100px]  absolute  rounded-full"
        />
      </div>

      <div
        style={{ borderColor: color }}
        className="rounded-full   border-[5px] border-dashed  p-2  relative"
      >
        <div style={{ backgroundColor: color }} className="p-6   rounded-full relative">
          <QuestionSvg width={40} height={40} />
        </div>
      </div>
    </button>
  );
};
