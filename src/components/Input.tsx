import React, { useState } from 'react';
import { EyeOffSVG, EyeOnSVG, MailSVG } from 'src/assets/svg';

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  type: string;
  error?: boolean;
  bordered?: boolean;
};

export const Input: React.FC<InputProps> = ({ error, bordered, ...props }) => {
  const [isShowPass, setShowPass] = useState<boolean>(false);

  return (
    <div
      className={`w-full  pl-4  ${bordered ? 'border border-solid border-gray-200' : ''} bg-white rounded-[100px] ${error ? 'border border-red-600' : ''} overflow-hidden justify-start items-center gap-[15px] inline-flex`}
      {...props}
    >
      {props.type === 'email' && <MailSVG width={20} height={20} opacity={0.5} />}
      {props.type === 'password' && (
        <>
          {isShowPass ? (
            <EyeOnSVG
              onClick={() => setShowPass(false)}
              width={20}
              height={20}
              opacity={0.5}
            />
          ) : (
            <EyeOffSVG
              onClick={() => setShowPass(true)}
              width={20}
              height={20}
              opacity={0.5}
            />
          )}
        </>
      )}
      <input
        className="flex focus:outline-none p-4  flex-1 h-full"
        {...props}
        type={isShowPass ? 'text' : props.type}
      />
    </div>
  );
};
