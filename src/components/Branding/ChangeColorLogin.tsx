import React, { ChangeEvent, useEffect, useState } from 'react';
import { ButtonBordered } from 'src/components/ButtonBorderedSmall';
import { BasicModal, ButtonGreenSmall } from 'src/components';
import { ArrowDownSVG } from 'src/assets/svg/ArrowDownSVG';
import { SketchPicker } from 'react-color';
import { SelectText } from 'src/components/RoundedSelect';
import { StylesBranding } from 'src/enum';
import { chooseColorTypeSelector } from 'src/utils/selectorConstants';
import { useChangeBrandingMutation } from 'src/api/brandingApi';

export type ChangeColorPropsType = {
  handleCansel: () => void;
  secondColor: string;
  firstColor: string;
  id: string;
};

export const ChangeColorLogin: React.FC<ChangeColorPropsType> = ({
  handleCansel,
  secondColor,
  firstColor,
  id,
}) => {
  const [colorSecond, setColorSecond] = useState<string>(secondColor);
  const [colorFirst, setColorFirst] = useState<string>(firstColor);
  const [colorTempFirst, setColorTempFirst] = useState<string>(secondColor);
  const [colorTempSec, setColorTempSec] = useState<string>(secondColor);
  const [isShowPickerFirst, setIsShowPickerFirst] = useState<boolean>(false);
  const [isShowPickerSec, setIsShowPickerSec] = useState<boolean>(false);
  const [colorType, setColorType] = useState<StylesBranding>(StylesBranding.GRADIENT);

  const [handlerChangeBrand, { isSuccess }] = useChangeBrandingMutation();

  const handleSubmit = () => {
    handlerChangeBrand({
      id,
      backgroundColorFirst: colorFirst,
      backgroundColorSecond: colorSecond,
      backgroundColorType: colorType,
    });
  };

  const setColorHandlerFirst = (e: any) => {
    setColorTempFirst(e.hex);
  };
  const setColorHandlerSec = (e: any) => {
    setColorTempSec(e.hex);
  };

  const handleTypeColor = (event: ChangeEvent<HTMLSelectElement>) => {
    // @ts-ignore
    setColorType(event.target.value);
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
        <div className="flex flex-1 flex-col gap-7">
          <div className="flex flex-col flex-1  gap-5">
            <h3 className=" text-neutral-700 opacity-70 text-base font-normal font-['Lato']">
              App primary color
            </h3>
            <SelectText
              selectItem={colorType}
              onChangeSelect={handleTypeColor}
              items={chooseColorTypeSelector}
            />
          </div>
          <div className="flex flex-col flex-1  gap-5">
            <h3 className=" text-neutral-700 opacity-70 text-base font-normal font-['Lato']">
              App primary color
            </h3>

            <div
              style={{
                background:
                  colorType === StylesBranding.GRADIENT
                    ? `linear-gradient(90deg,${colorFirst} , ${colorSecond})`
                    : colorFirst,
              }}
              className="w-full  flex gap-2.5  box-border overflow-hidden p-2.5  rounded-[10px] border border-solid border-neutral-200"
            >
              <button
                onClick={() => setIsShowPickerFirst(true)}
                type="button"
                className=" bg-white rounded-[5px] p-1"
              >
                <div className="flex  items-center relative gap-2.5">
                  <div
                    style={{ backgroundColor: colorFirst }}
                    className="flex  w-[50px] h-[30px]"
                  />
                  <ArrowDownSVG />
                </div>
              </button>
              {colorType === StylesBranding.GRADIENT && (
                <button
                  type="button"
                  onClick={() => setIsShowPickerSec(true)}
                  className=" bg-white rounded-[5px] p-1"
                >
                  <div className="flex  items-center relative gap-2.5">
                    <div
                      style={{ backgroundColor: colorSecond }}
                      className="flex  w-[50px] h-[30px]"
                    />
                    <ArrowDownSVG />
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="flex mt-5 gap-4 justify-end">
          <ButtonBordered onClick={handleCansel}>Cancel</ButtonBordered>
          <ButtonGreenSmall onClick={handleSubmit}>Save changes</ButtonGreenSmall>
        </div>
      </div>
      <BasicModal isOpen={isShowPickerFirst} onClose={() => setIsShowPickerFirst(false)}>
        <div>
          <div />
          <div>
            <SketchPicker
              color={colorTempFirst}
              onChangeComplete={setColorHandlerFirst}
            />
            <div className="flex justify-between pt-5 text-neutral-700 opacity-70 text-sm font-normal font-['Lato']">
              <button type="button" onClick={() => setIsShowPickerFirst(false)}>
                Cancel
              </button>
              <button
                onClick={() => {
                  setColorFirst(colorTempFirst);
                  setIsShowPickerFirst(false);
                }}
                type="button"
              >
                Select
              </button>
            </div>
          </div>
        </div>
      </BasicModal>
      <BasicModal isOpen={isShowPickerSec} onClose={() => setIsShowPickerSec(false)}>
        <div>
          <div />
          <div>
            <SketchPicker color={colorTempSec} onChangeComplete={setColorHandlerSec} />
            <div className="flex justify-between pt-5 text-neutral-700 opacity-70 text-sm font-normal font-['Lato']">
              <button type="button" onClick={() => setIsShowPickerSec(false)}>
                Cancel
              </button>
              <button
                onClick={() => {
                  setColorSecond(colorTempSec);
                  setIsShowPickerSec(false);
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
