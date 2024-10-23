import React from 'react';

type CreateClassHeaderPropsType = {
  activeStep: number;
};

export const CreateClassHeader: React.FC<CreateClassHeaderPropsType> = ({
  activeStep,
}) => {
  return (
    <div>
      <div className="flex flex-col gap-1 ">
        <h1 className="text-neutral-700 text-lg font-bold font-['Lato']">Create Class</h1>
        <h3 className="text-neutral-700 opacity-70 text-sm font-normal font-['Lato']">
          Create and customize a class however you need it.
        </h3>
      </div>
      <div className="mt-7">
        <div className="flex justify-between items-center gap-3">
          <div
            style={{
              opacity: activeStep >= 0 ? 1 : 0.5,
            }}
            className="flex justify-center items-center gap-3"
          >
            <div
              style={{
                borderColor: activeStep >= 0 ? '#56C596' : '',
                opacity: activeStep >= 0 ? 1 : 0.5,
                background: activeStep >= 0 ? '#56C596' : '',
              }}
              className=" w-10 h-10 flex justify-center items-center border border-solid rounded-full"
            >
              <div
                style={{ color: activeStep >= 0 ? '#fff' : '#000' }}
                className="text-neutral-700 text-lg font-bold font-['Lato'] m-2 "
              >
                1
              </div>
            </div>
            <h3 className="text-neutral-700 text-nowrap text-base font-semibold font-['Lato']">
              Step 1
            </h3>
          </div>
          <div
            style={{
              borderColor: activeStep >= 1 ? '#56C596' : '',
              opacity: activeStep >= 1 ? 1 : 0.3,
            }}
            className="flex h-0 w-full items-center gap-3  border border-solid rounded-full"
          />

          <div
            style={{
              opacity: activeStep >= 1 ? 1 : 0.5,
            }}
            className="flex justify-center items-center gap-3"
          >
            <div
              style={{
                borderColor: activeStep >= 1 ? '#56C596' : '',
                opacity: activeStep >= 1 ? 1 : 0.5,
                background: activeStep > 1 ? '#56C596' : '',
              }}
              className=" w-10 h-10 flex justify-center items-center border border-solid rounded-full"
            >
              <div
                style={{ color: activeStep > 1 ? '#fff' : '#000' }}
                className="text-neutral-700 text-lg font-bold font-['Lato'] m-2 "
              >
                2
              </div>
            </div>
            <h3 className="text-neutral-700 text-nowrap text-base font-semibold font-['Lato']">
              Step 2
            </h3>
          </div>
          <div
            style={{
              borderColor: activeStep >= 1 ? '#56C596' : '',
              opacity: activeStep >= 1 ? 1 : 0.3,
            }}
            className="flex h-0 w-full items-center gap-3 border border-solid rounded-full"
          />

          <div
            style={{
              opacity: activeStep >= 2 ? 1 : 0.5,
            }}
            className="flex justify-center items-center gap-3"
          >
            <div
              style={{
                borderColor: activeStep >= 2 ? '#56C596' : '',
                opacity: activeStep >= 2 ? 1 : 0.5,
                background: activeStep > 2 ? '#56C596' : '',
              }}
              className=" w-10 h-10 flex justify-center items-center border border-solid rounded-full"
            >
              <div
                style={{ color: activeStep > 2 ? '#fff' : '#000' }}
                className="text-neutral-700 text-lg font-bold font-['Lato'] m-2 "
              >
                3
              </div>
            </div>
            <h3 className="text-neutral-700  text-nowrap text-base font-semibold font-['Lato']">
              Step 3
            </h3>
          </div>
          <div
            style={{
              borderColor: activeStep >= 1 ? '#56C596' : '',
              opacity: activeStep >= 1 ? 1 : 0.3,
            }}
            className="flex h-0 w-full items-center gap-3 border border-solid rounded-full"
          />

          <div
            style={{
              opacity: activeStep >= 3 ? 1 : 0.5,
            }}
            className="flex justify-center items-center gap-3"
          >
            <div
              style={{
                borderColor: activeStep >= 3 ? '#56C596' : '',
                opacity: activeStep >= 3 ? 1 : 0.5,
                background: activeStep >= 3 ? '#56C596' : '',
              }}
              className=" w-10 h-10 flex justify-center items-center border border-solid rounded-full"
            >
              <div
                style={{ color: activeStep >= 3 ? '#fff' : '#000' }}
                className=" text-lg font-bold font-['Lato'] m-2 "
              >
                4
              </div>
            </div>
            <h3 className="text-neutral-700 text-nowrap text-base font-semibold font-['Lato']">
              Step 4
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};
