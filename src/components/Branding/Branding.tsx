import React from 'react';
import { BasicModal } from 'src/components';
import { EditName } from 'src/components/Branding/EditName';
import { useGetBrandingQuery } from 'src/api/brandingApi';
import { ChangeLogo } from 'src/components/Branding/ChangeLogo';
import { ChangeColor } from 'src/components/Branding/ChangeColor';
import { ChangeColorLogin } from 'src/components/Branding/ChangeColorLogin';
import { LinearProgress } from '@mui/material';

export const Branding = () => {
  const [isShowName, setIsShowName] = React.useState<boolean>(false);
  const [isShowLogos, setIsShowLogos] = React.useState<boolean>(false);
  const [isShowColor, setIsShowColor] = React.useState<boolean>(false);
  const [isShowLogStyle, setIsShowLogStyle] = React.useState<boolean>(false);

  const { data } = useGetBrandingQuery({});

  if (!data) {
    return <LinearProgress color="secondary" />;
  }
  return (
    <div className="px-12 py-8">
      <div className="flex flex-col gap-3 mb-10">
        <h1 className="text-neutral-700 text-3xl font-bold font-['Lato']">Branding</h1>
        <h3 className="text-neutral-700 opacity-70 text-lg font-normal font-['Lato']">
          Update your application’s branding bellow.
        </h3>
        <div className="flex flex-col mt-7 gap-3">
          <button
            onClick={() => setIsShowName(true)}
            type="button"
            className=" flex-col rounded-[10px] border px-5 py-[25px] border-solid border-neutral-200 hover:border-green-400 active:border-green-400  justify-start items-start gap-[5px] inline-flex "
          >
            <h4 className="text-neutral-700 text-lg font-semibold font-['Lato']">Name</h4>
            <div className="flex gap-1">
              <p className="ext-neutral-700 opacity-50 text-base font-normal font-['Lato']">
                Your application’s name is
              </p>
              <p className="text-neutral-700 text-base font-normal font-['Lato']">
                {data && data.name}
              </p>
            </div>
          </button>
          <button
            onClick={() => setIsShowLogos(true)}
            type="button"
            className=" flex-col rounded-[10px] border px-5 py-[25px] border-solid border-neutral-200 hover:border-green-400 active:border-green-400  justify-start items-start gap-[5px] inline-flex "
          >
            <h4 className="text-neutral-700 text-lg font-semibold font-['Lato']">
              Logos
            </h4>
            <div className="flex gap-1">
              <p className="text-neutral-700 opacity-50 text-base font-normal font-['Lato']">
                Update the different versions of your logo used in the application
              </p>
            </div>
          </button>
          <button
            onClick={() => setIsShowColor(true)}
            type="button"
            className=" flex-col rounded-[10px] border px-5 py-[25px] border-solid border-neutral-200 hover:border-green-400 active:border-green-400  justify-start items-start gap-[5px] inline-flex "
          >
            <h4 className="text-neutral-700 text-lg font-semibold font-['Lato']">
              Color
            </h4>
            <div className="flex gap-1">
              <p className="text-neutral-700 opacity-50 text-base font-normal font-['Lato']">
                Your application primary color is
              </p>
              <div
                style={{ background: data.primaryColor }}
                className="w-4 h-4 rounded-sm"
              />
              <p className="text-neutral-700 text-base font-normal font-['Lato']">
                {data && data.primaryColor}
              </p>
            </div>
          </button>
          <button
            onClick={() => setIsShowLogStyle(true)}
            type="button"
            className=" flex-col rounded-[10px] border px-5 py-[25px] border-solid border-neutral-200 hover:border-green-400 active:border-green-400  justify-start items-start gap-[5px] inline-flex "
          >
            <h4 className="text-neutral-700 text-lg font-semibold font-['Lato']">
              Log in page style{' '}
            </h4>
            <div className="flex gap-1">
              <p className="ext-neutral-700 opacity-50 text-base font-normal font-['Lato']">
                Customize the background style and colors of your side bar
              </p>
            </div>
          </button>
        </div>
        <BasicModal isOpen={isShowName} onClose={() => setIsShowName(false)}>
          <EditName
            id={data.id}
            handleCansel={() => setIsShowName(false)}
            initName={data.name}
          />
        </BasicModal>
        <BasicModal isOpen={isShowLogos} onClose={() => setIsShowLogos(false)}>
          <ChangeLogo
            id={data ? data.id : ''}
            handleCansel={() => setIsShowLogos(false)}
          />
        </BasicModal>
        <BasicModal isOpen={isShowColor} onClose={() => setIsShowColor(false)}>
          <ChangeColor
            id={data ? data.id : ''}
            primaryColor={data ? data.primaryColor : '#000'}
            handleCansel={() => setIsShowColor(false)}
          />
        </BasicModal>
        <BasicModal isOpen={isShowLogStyle} onClose={() => setIsShowLogStyle(false)}>
          <ChangeColorLogin
            id={data ? data.id : ''}
            secondColor={data ? data.backgroundColorSecond : '#000'}
            firstColor={data ? data.backgroundColorFirst : '#000'}
            handleCansel={() => setIsShowLogStyle(false)}
          />
        </BasicModal>
      </div>
    </div>
  );
};
