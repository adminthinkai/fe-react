import React from 'react';
import { ButtonGreenSmall, Input } from 'src/components';
import { ButtonBordered } from 'src/components/ButtonBorderedSmall';
import { FormikProps } from 'formik';
import { ClassCreateData } from 'src/api/classesApi';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { SerializedError } from '@reduxjs/toolkit';

export type CreateClassStep1Props = {
  handleClose: () => void;
  formik: FormikProps<ClassCreateData>;
  error: FetchBaseQueryError | SerializedError | undefined;
  isLoading: boolean;
};

export const CreateClassStep3: React.FC<CreateClassStep1Props> = ({
  handleClose,
  formik,
  error,
  isLoading,
}) => {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-3.5">
        <span>Placeholder of Input 1 (Required)</span>
        <Input
          onChange={formik.handleChange}
          value={formik.values.placeholderInput1}
          name="placeholderInput1"
          type="text"
          placeholder="Enter Placeholder Input Name 1"
          bordered
        />
        {formik.errors.placeholderInput1 && formik.submitCount > 1 && (
          <span className="text-white text-base font-normal font-['Lato']">
            {formik.errors.placeholderInput1}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-3.5">
        <span>Placeholder of Input 2 (Optional)</span>
        <Input
          onChange={formik.handleChange}
          value={formik.values.placeholderInput2}
          name="placeholderInput2"
          type="text"
          placeholder="Enter Placeholder Input Name 2"
          bordered
        />
        {formik.errors.placeholderInput2 && formik.submitCount > 1 && (
          <span className="text-white text-base font-normal font-['Lato']">
            {formik.errors.placeholderInput2}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-3.5">
        <span>Placeholder of Input 3 (Optional)</span>
        <Input
          onChange={formik.handleChange}
          value={formik.values.placeholderInput3}
          name="placeholderInput3"
          type="text"
          placeholder="Enter Placeholder Input Name 3"
          bordered
        />
        {formik.errors.placeholderInput3 && formik.submitCount > 1 && (
          <span className="text-white text-base font-normal font-['Lato']">
            {formik.errors.placeholderInput3}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-3.5">
        <span>Placeholder of Input 4 (Optional)</span>
        <Input
          onChange={formik.handleChange}
          value={formik.values.placeholderInput4}
          name="placeholderInput4"
          type="text"
          placeholder="Enter Placeholder Input Name 4"
          bordered
        />
        {formik.errors.placeholderInput4 && formik.submitCount > 1 && (
          <span className="text-white text-base font-normal font-['Lato']">
            {formik.errors.placeholderInput4}
          </span>
        )}
      </div>
      {error && error.data && error.data.message && (
        <span className="text-white text-base font-normal font-['Lato']">
          {error.data.message}
        </span>
      )}
      <div className="flex gap-4 justify-end ali">
        <ButtonBordered onClick={handleClose}>
          <b>Cancel</b>
        </ButtonBordered>
        <ButtonGreenSmall isLoading={isLoading} onClick={formik.submitForm}>
          Next Step
        </ButtonGreenSmall>
      </div>
    </div>
  );
};
