import React from 'react';
import { ButtonGreenSmall, Input } from 'src/components';
import { ButtonBordered } from 'src/components/ButtonBorderedSmall';
import { FormikProps } from 'formik';
import { ClassCreateData } from 'src/api/classesApi';

export type CreateClassStep1Props = {
  handleClose: () => void;
  formik: FormikProps<ClassCreateData>;
};

export const CreateClassStep2: React.FC<CreateClassStep1Props> = ({
  handleClose,
  formik,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-col gap-3.5">
        <span>Name of Input 1 (Required)</span>
        <Input
          onChange={formik.handleChange}
          value={formik.values.input1}
          name="input1"
          type="text"
          placeholder="Enter Input Name 1"
          bordered
        />
        <span
          style={{
            visibility:
              formik.errors.input1 && formik.submitCount >= 1 ? 'visible' : 'hidden',
            height: '1em',
          }}
          className="text-white text-base font-normal font-['Lato']"
        >
          {formik.errors.input1}
        </span>
      </div>
      <div className="flex flex-col gap-3.5">
        <span>Name of Input 2 (Optional)</span>
        <Input
          onChange={formik.handleChange}
          value={formik.values.input2}
          name="input2"
          type="text"
          placeholder="Enter Input Name 2"
          bordered
        />
        <span
          style={{
            visibility:
              formik.errors.input2 && formik.submitCount >= 1 ? 'visible' : 'hidden',
            height: '1em',
          }}
          className="text-white text-base font-normal font-['Lato']"
        >
          {formik.errors.input2}
        </span>
      </div>
      <div className="flex flex-col gap-3.5">
        <span>Name of Input 3 (Optional)</span>
        <Input
          onChange={formik.handleChange}
          value={formik.values.input3}
          name="input3"
          type="text"
          placeholder="Enter Input Name 3"
          bordered
        />
        <span
          style={{
            visibility:
              formik.errors.input3 && formik.submitCount >= 1 ? 'visible' : 'hidden',
            height: '1em',
          }}
          className="text-white text-base font-normal font-['Lato']"
        >
          {formik.errors.input3}
        </span>
      </div>
      <div className="flex flex-col gap-3.5">
        <span>Name of Input 4 (Optional)</span>
        <Input
          onChange={formik.handleChange}
          value={formik.values.input4}
          name="input4"
          type="text"
          placeholder="Enter Input Name 4"
          bordered
        />
        <span
          style={{
            visibility:
              formik.errors.input4 && formik.submitCount >= 1 ? 'visible' : 'hidden',
            height: '1em',
          }}
          className="text-white text-base font-normal font-['Lato']"
        >
          {formik.errors.input4}
        </span>
      </div>
      <div className="flex gap-4 justify-end ali">
        <ButtonBordered onClick={handleClose}>
          <b>Cancel</b>
        </ButtonBordered>
        <ButtonGreenSmall onClick={formik.submitForm}>Next step</ButtonGreenSmall>
      </div>
    </div>
  );
};
