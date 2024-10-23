import React, { useEffect, useState } from 'react';
import { CreateClassHeader } from 'src/components/Classes/CreateClass/CreateClassHeader';
import { useFormik } from 'formik';
import { classesCategories } from 'src/utils/classesConstants';
import { CreateClassStep1 } from 'src/components/Classes/CreateClass/createClassStep1';
import { stepCreateClassSchema } from 'src/utils';
import { CreateClassStep2 } from 'src/components/Classes/CreateClass/createClassStep2';
import {
  ClassCreateData,
  ClassTypeResponse,
  useCreateClassMutation,
  useUpdateClassMutation,
} from 'src/api/classesApi';
import { CreateClassStep3 } from 'src/components/Classes/CreateClass/createClassStep3';
import { CreateClassStep4 } from 'src/components/Classes/CreateClass/createClassStep4';

type CreateClassProps = {
  handleClose: () => void;
  data?: ClassTypeResponse;
};

export const CreateClass: React.FC<CreateClassProps> = ({ handleClose, data }) => {
  const [step, setStep] = useState<number>(0);
  const [handleCreateClass, { isSuccess, error, isLoading }] = useCreateClassMutation();
  const [handleUpdateClass, updateClassInfo] = useUpdateClassMutation();

  const formik = useFormik<ClassCreateData>({
    initialValues: {
      category: data ? data.category : classesCategories[0],
      prompt: data ? data.prompt : '',
      name: data ? data.name : '',
      description: data ? data.description : '',
      public: data ? data.public : false,
      input1: data ? data.input1 : '',
      input2: data ? data.input2 : '',
      input3: data ? data.input3 : '',
      input4: data ? data.input4 : '',
      placeholderInput1: data ? data.placeholderInput1 : '',
      placeholderInput2: data ? data.placeholderInput2 : '',
      placeholderInput3: data ? data.placeholderInput3 : '',
      placeholderInput4: data ? data.placeholderInput4 : '',
      iconNumber: data ? data.iconNumber : 1,
    } as ClassCreateData,
    validationSchema: stepCreateClassSchema[step],
    onSubmit: (val: ClassCreateData) => {
      if (step === 2) {
        data ? handleUpdateClass({ ...val, classId: data.id }) : handleCreateClass(val);
        return;
      }
      setStep(prevState => prevState + 1);
    },
  });
  useEffect(() => {
    if (isSuccess || updateClassInfo.isSuccess) {
      setStep(prevState => prevState + 1);
    }
  }, [isSuccess, updateClassInfo.isSuccess]);

  return (
    <div className="min-w-[610px] flex flex-col gap-10 ">
      <CreateClassHeader activeStep={step} />
      <div>
        {step === 0 && <CreateClassStep1 formik={formik} handleClose={handleClose} />}
        {step === 1 && <CreateClassStep2 formik={formik} handleClose={handleClose} />}
        {step === 2 && (
          <CreateClassStep3
            isLoading={isLoading}
            error={error}
            formik={formik}
            handleClose={handleClose}
          />
        )}
        {step === 3 && <CreateClassStep4 handleClose={handleClose} />}
      </div>
    </div>
  );
};
