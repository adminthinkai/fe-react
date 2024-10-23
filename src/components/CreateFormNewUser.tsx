import React, { ChangeEvent, useEffect } from 'react';
import { useFormik } from 'formik';
import { UserRole } from 'src/enum/userRole';
import { Input } from 'src/components/Input';
import { SelectText } from 'src/components/RoundedSelect';
import { ButtonGreenSmall } from 'src/components/ButtonGreenSmall';
import { ButtonBordered } from 'src/components/ButtonBorderedSmall';
import { InviteUserCredType, useInviteUserMutation } from 'src/api/authAPI';
import { chooseRoleSelector } from 'src/utils/selectorConstants';

type CreateFormNewUserPropsType = {
  onCloseModal: () => void;
};

export const CreateFormNewUser: React.FC<CreateFormNewUserPropsType> = ({
  onCloseModal,
}) => {
  const [handleInviteUser, { isLoading, isSuccess, error }] = useInviteUserMutation();

  const formik = useFormik<InviteUserCredType>({
    initialValues: {
      role: UserRole.USER,
      firstName: '',
      lastName: '',
      email: '',
    },

    onSubmit: (val: InviteUserCredType) => {
      handleInviteUser(val);
    },
  });
  useEffect(() => {
    if (isSuccess) {
      onCloseModal();
    }
  }, [isSuccess, onCloseModal]);
  const setRole = (e: ChangeEvent<HTMLSelectElement>) => {
    formik.setFieldValue('role', e.target.value);
  };

  console.log(error);

  return (
    <div className="w-[610px] ">
      <form className="flex flex-col gap-6 min-w-[610]  " onSubmit={formik.submitForm}>
        <div>
          <h1 className="text-neutral-700 text-2xl font-bold font-['Lato']">
            Add Standard user
          </h1>
        </div>
        <div>
          <div className="flex flex-col gap-7">
            <span>First Name</span>
            <SelectText
              selectItem={formik.values.role}
              onChangeSelect={setRole}
              items={chooseRoleSelector}
            />
            <div className="flex flex-col gap-3.5">
              <span>First Name</span>
              <Input
                onChange={formik.handleChange}
                value={formik.values.firstName}
                name="firstName"
                type="text"
                placeholder="Enter your first name"
                bordered
              />
              {formik.errors.firstName && formik.submitCount > 1 && (
                <span className="text-red text-base font-normal font-['Lato']">
                  {formik.errors.firstName}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-3.5">
              <span>Last Name</span>
              <Input
                onChange={formik.handleChange}
                value={formik.values.lastName}
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                bordered
              />
              {formik.errors.lastName && formik.submitCount > 1 && (
                <span className="text-red text-base font-normal font-['Lato']">
                  {formik.errors.lastName}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-3.5">
              <span>Email</span>
              <Input
                onChange={formik.handleChange}
                value={formik.values.email}
                name="email"
                type="email"
                placeholder="Enter your email"
                bordered
              />
              {formik.errors.email && formik.submitCount > 1 && (
                <span className="text-red text-base font-normal font-['Lato']">
                  {formik.errors.email}
                </span>
              )}
            </div>
            {error && error.data && error.data.message && (
              <span className="text-red-500 text-base font-normal font-['Lato']">
                {error.data.message}
              </span>
            )}
            <div className="flex gap-4 justify-end">
              <ButtonBordered onClick={onCloseModal}>Cancel</ButtonBordered>
              <ButtonGreenSmall isLoading={isLoading} onClick={formik.submitForm}>
                Add User
              </ButtonGreenSmall>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
