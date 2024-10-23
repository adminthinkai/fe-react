import React from 'react';
import { ButtonBordered } from 'src/components/ButtonBorderedSmall';
import { DoneSvg } from 'src/assets/svg/DoneSVG';

export type CreateClassStep4Props = {
  handleClose: () => void;
};

export const CreateClassStep4: React.FC<CreateClassStep4Props> = ({ handleClose }) => {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col justify-center gap-16">
        <div className="flex flex-col items-center gap-16">
          <DoneSvg />
          <div className=" flex flex-col items-center gap-4">
            <h2 className="text-neutral-700 text-2xl font-bold font-['Lato']">
              Thank you
            </h2>
            <p className="text-neutral-700 opacity-70 text-base font-normal font-['Lato']">
              The Class was created successfully
            </p>
          </div>
        </div>
        <div className="flex gap-4 justify-center ali">
          <ButtonBordered onClick={handleClose}>Close</ButtonBordered>
        </div>
      </div>
    </div>
  );
};
