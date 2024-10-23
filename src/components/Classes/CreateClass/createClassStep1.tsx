import React, { ChangeEvent } from 'react';
import { FormikProps } from 'formik';
import Switch from 'react-switch';
import { BasicModal, ButtonGreenSmall, Input } from 'src/components';
import { SelectText } from 'src/components/RoundedSelect';
import { ButtonBordered } from 'src/components/ButtonBorderedSmall';
import { classesCategories } from 'src/utils/classesConstants';
import { ClassCreateData } from 'src/api/classesApi';
import { iconsClasses } from 'src/utils/iconsConstants';

export type CreateClassStep1Props = {
  handleClose: () => void;
  formik: FormikProps<ClassCreateData>;
};

export const CreateClassStep1: React.FC<CreateClassStep1Props> = ({
  handleClose,
  formik,
}) => {
  const [isOpenIcon, setIsOpenIcon] = React.useState(false);
  const [currentIcon, setCurrentIcon] = React.useState(formik.values.iconNumber);

  const handleChangeSelector = async (event: ChangeEvent<HTMLSelectElement>) => {
    await formik.setFieldValue('category', event.target.value);
  };

  const handleChangeIsPublic = async () => {
    await formik.setFieldValue('public', !formik.values.public);
  };

  const renderError = (field: keyof ClassCreateData) => (
    <span
      style={{
        visibility:
          formik.errors[field] && formik.submitCount >= 1 ? 'visible' : 'hidden',
        height: '1em',
      }}
      className="text-white text-base font-normal font-['Lato']"
    >
      {formik.errors[field]}
    </span>
  );

  return (
    <div className="flex flex-col gap-3.5">
      <div className="flex flex-col">
        <span className="pb-3.5">Class Name</span>
        <Input
          onChange={formik.handleChange}
          value={formik.values.name}
          name="name"
          type="text"
          placeholder="Enter Class Name"
          bordered
        />
        {renderError('name')}
      </div>
      <div className="flex flex-col">
        <span className="pb-3.5">Short Description</span>
        <Input
          onChange={formik.handleChange}
          value={formik.values.description}
          type="text"
          name="description"
          placeholder="Enter Short Description"
          bordered
        />
        {renderError('description')}
      </div>
      <div className="flex flex-col">
        <span className="pb-3.5">Prompt</span>
        <Input
          onChange={formik.handleChange}
          value={formik.values.prompt}
          name="prompt"
          type="text"
          placeholder="Enter Prompt"
          bordered
        />
        {renderError('prompt')}
      </div>
      <div className="flex flex-col mb-4">
        <span className="pb-3.5">Category</span>
        <SelectText
          selectItem={formik.values.category}
          onChangeSelect={handleChangeSelector}
          items={classesCategories.map(el => ({
            label: el,
            value: el,
          }))}
        />
      </div>
      <div className="flex justify-between gap-3.5 mb-4">
        <span>Public</span>
        <Switch
          onChange={handleChangeIsPublic}
          name="isPublic"
          checked={formik.values.public}
        />
      </div>
      <div className="flex justify-between items-center">
        <button onClick={() => setIsOpenIcon(true)} type="button">
          {iconsClasses.find(el => el.value === formik.values.iconNumber).icon({})}
        </button>
        <div className="flex gap-4 justify-end">
          <ButtonBordered onClick={handleClose}>
            <b>Cancel</b>
          </ButtonBordered>
          <ButtonGreenSmall onClick={formik.submitForm}>Next step</ButtonGreenSmall>
        </div>
      </div>
      <BasicModal isOpen={isOpenIcon} onClose={() => setIsOpenIcon(false)}>
        <div className="flex flex-col gap-4">
          <h3
            className={"text-neutral-700 opacity-80 text-base font-medium font-['Lato']"}
          >
            Choose your icon
          </h3>
          <div className="flex  columns-2 gap-4">
            {iconsClasses.map(el => (
              <button
                type="button"
                onClick={() => setCurrentIcon(el.value)}
                className={`  ${el.value === currentIcon ? 'bg-gray-300' : 'bg-white'} p-2 rounded`}
              >
                {el.icon({ width: 60, height: 60 })}
              </button>
            ))}
          </div>
          <div className="flex gap-4 justify-end">
            <ButtonBordered onClick={() => setIsOpenIcon(false)}>
              <b>Cancel</b>
            </ButtonBordered>
            <ButtonGreenSmall
              onClick={async () => {
                await formik.setFieldValue('iconNumber', currentIcon);
                setIsOpenIcon(false);
              }}
            >
              Save
            </ButtonGreenSmall>
          </div>
        </div>
      </BasicModal>
    </div>
  );
};
