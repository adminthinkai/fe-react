import React, { useEffect } from 'react';
import { ButtonBordered } from 'src/components/ButtonBordered';
import { ButtonGreenSmall } from 'src/components/ButtonGreenSmall';
import { useFormik } from 'formik';
import { changePassSchema } from 'src/utils/yap';
import { useChangePasswordMutation } from 'src/api/authAPI';
import { useGetMeQuery } from 'src/api/usersApi';
import { Input } from 'src/components/Input';

type ChangePassFormProps = {
  cancelClick: () => void;
};

export const ChangePassForm: React.FC<ChangePassFormProps> = ({ cancelClick }) => {
  const [handleChangePass, { isLoading, isSuccess, isError, error }] =
    useChangePasswordMutation();
  const { data } = useGetMeQuery({});
  const { handleSubmit, errors, touched, handleChange } = useFormik({
    initialValues: {
      currentPassword: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: changePassSchema,
    onSubmit: values => {
      if (data) {
        handleChangePass({
          email: data.email,
          password: values.currentPassword,
          newPassword: values.password,
        });
      }
    },
  });

  const onCancelHandler = () => {
    cancelClick();
  };

  useEffect(() => {
    if (isSuccess) {
      cancelClick();
    }
  }, [isSuccess]);

  return (
    <div className="xl:min-w-[610px] ">
      <div className="flex justify-between">
        <h1 className="text-neutral-700 text-2xl font-bold font-['Lato'] pb-8">
          Change Password
        </h1>
        <button type="button" onClick={onCancelHandler}>
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.75 8.75L21.25 21.25M8.75 21.25L21.25 8.75"
              stroke="#363C39"
              strokeOpacity="0.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3 pb-7">
          <div>
            <h3 className="text-neutral-700 opacity-80 text-base font-medium font-['Lato']">
              Current Password
            </h3>
          </div>
          <Input
            name="currentPassword"
            onChange={handleChange}
            type="password"
            error={!!errors.currentPassword}
            bordered
          />
          {errors.currentPassword && touched.currentPassword && (
            <span className="text-white text-base font-normal font-['Lato']">
              {errors.currentPassword}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-3 pb-7">
          <h3 className="text-neutral-700 opacity-80 text-base font-medium font-['Lato']">
            New Password
          </h3>
          <Input
            name="password"
            onChange={handleChange}
            type="password"
            error={!!errors.password}
            bordered
          />
          {errors.password && touched.password && (
            <span className="text-white text-base font-normal font-['Lato']">
              {errors.password}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-3 pb-7">
          <h3 className="text-neutral-700 opacity-80 text-base font-medium font-['Lato']">
            Confirm Password
          </h3>
          <Input
            name="confirmPassword"
            onChange={handleChange}
            type="password"
            error={!!errors.confirmPassword}
            bordered
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <span className="text-white text-base font-normal font-['Lato']">
              {errors.confirmPassword}
            </span>
          )}
          {isError && error.data && (
            <span className="text-white text-base font-normal font-['Lato']">
              {error.data.message}
            </span>
          )}
        </div>
        <div className="flex flex-1 justify-end gap-4">
          <ButtonBordered onClick={onCancelHandler}>Cancel</ButtonBordered>
          <ButtonGreenSmall isLoading={isLoading} disabled={isLoading} type="submit">
            Change Password
          </ButtonGreenSmall>
        </div>
      </form>
    </div>
  );
};
