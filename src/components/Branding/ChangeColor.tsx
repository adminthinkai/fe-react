import React, { useEffect, useState } from 'react';
import { ButtonBordered } from 'src/components/ButtonBorderedSmall';
import { BasicModal, ButtonGreenSmall } from 'src/components';
import { ArrowDownSVG } from 'src/assets/svg/ArrowDownSVG';
import { SketchPicker } from 'react-color';
import { useChangeBrandingMutation } from 'src/api/brandingApi';

export type ChangeColorPropsType = {
  handleCansel: () => void;
  primaryColor: string;
  id: string;
};

export const ChangeColor: React.FC<ChangeColorPropsType> = ({
  handleCansel,
  primaryColor,
  id,
}) => {
  const [color, setColor] = useState<string>(primaryColor);
  const [colorTemp, setColorTemp] = useState<string>(primaryColor);
  const [isShowPicker, setIsShowPicker] = useState<boolean>(false);

  const [handlerChangeBrand, { error, isSuccess }] = useChangeBrandingMutation();

  const onSaveColor = () => {
    handlerChangeBrand({ id, primaryColor: color });
  };
  const setColorHandler = (e: any) => {
    setColorTemp(e.hex);
  };

  useEffect(() => {
    if (isSuccess) {
      handleCansel();
    }
  }, [isSuccess]);

  return (
    <div>
      <div className="flex flex-col gap-2.5">
        <h1 className="text-neutral-700 text-2xl font-bold font-['Lato']">
          Update app primary color
        </h1>
        <p className=" text-wrap text-neutral-700 opacity-70 text-base font-normal font-['Lato']">
          This color is used as the primary color in your outgoing emails and in some
          places throughout your application.
          <br />
          <br />
          Please use our Canvas chrome extension to update the primary, secondary, and
          tertiary colors in your app styles.
        </p>
      </div>
      <div className="mt-7 flex flex-col gap-5">
        <div className="flex flex-1 flex-row gap-7">
          <button
            onClick={() => setIsShowPicker(true)}
            type="button"
            className="flex flex-col flex-1  gap-5"
          >
            <h3 className=" text-neutral-700 opacity-70 text-base font-normal font-['Lato']">
              App primary color
            </h3>
            <div className="w-full flex items-center relative gap-2.5 box-border overflow-hidden p-2.5  rounded-[10px] border border-solid border-neutral-200">
              <div
                style={{ backgroundColor: color }}
                className="flex  w-[50px] h-[30px]"
              />
              <ArrowDownSVG />
              <p>{color.toString()}</p>
            </div>
          </button>
        </div>
        <div className="flex mt-5 gap-4 justify-end">
          <ButtonBordered onClick={handleCansel}>Cancel</ButtonBordered>
          <ButtonGreenSmall onClick={onSaveColor}>Save changes</ButtonGreenSmall>
        </div>
      </div>
      <BasicModal isOpen={isShowPicker} onClose={() => setIsShowPicker(false)}>
        <div>
          <div />
          <div>
            <SketchPicker color={colorTemp} onChangeComplete={setColorHandler} />
            <div className="flex justify-between pt-5 text-neutral-700 opacity-70 text-sm font-normal font-['Lato']">
              <button type="button" onClick={() => setIsShowPicker(false)}>
                Cancel
              </button>
              <button
                onClick={() => {
                  setColor(colorTemp);
                  setIsShowPicker(false);
                }}
                type="button"
              >
                Select
              </button>
            </div>
          </div>
        </div>
      </BasicModal>
    </div>
  );
};
