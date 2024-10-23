import './styles.model.scss';
import { useFormik } from 'formik';
import { Paths } from 'src/enum';
import { useCallback, useEffect, useState } from 'react';
import OTPInput from 'react-otp-input';
import {
  useRestorePasswordMutation,
  useSendConfirmCodeRestoreMutation,
  useSendMeCodeRestoreMutation,
} from 'src/api/authAPI';
import { useNavigate } from 'react-router-dom';
import { stepValidationSchema } from 'src/utils/yap';
import { ButtonGreen, Input } from 'src/components';

export const RestoreForm = () => {
  const [step, setStep] = useState(1);
  const navigation = useNavigate();

  const [handleSendMeCode, sendMeCode] = useSendMeCodeRestoreMutation();
  const [handleVerifyCode, confirmCode] = useSendConfirmCodeRestoreMutation();
  const [handlerRestorePassword, restorePassword] = useRestorePasswordMutation();

  const nextStep = useCallback(() => setStep(step + 1), [step]);

  const formik = useFormik({
    initialValues: {
      email: '',
      code: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: stepValidationSchema.slice(0, 3)[step - 1],
    onSubmit: async val => {
      switch (step) {
        case 1:
          handleSendMeCode(val.email);
          break;
        case 2:
          handleVerifyCode({ email: val.email, verificationCode: +val.code });
          break;
        case 3:
          handlerRestorePassword({
            email: val.email,
            verificationCode: +val.code,
            password: val.password,
          });
          break;
        case 4:
          navigation(Paths.MAIN);
          break;
        default:
          break;
      }
    },
  });

  const onSendCode = () => handleSendMeCode(formik.values.email);
  useEffect(() => {
    if (sendMeCode.isSuccess && step === 1) {
      nextStep();
    } else if (confirmCode.isSuccess && step === 2) {
      nextStep();
    } else if (restorePassword.isSuccess && step === 3) {
      nextStep();
    }
  }, [
    step,
    sendMeCode.isSuccess,
    confirmCode.isSuccess,
    restorePassword.isSuccess,
    nextStep,
  ]);
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="loginForm">
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
              <h1 className="text-neutral-700 text-center text-3xl font-bold font-['Lato']">
                Restore Password
              </h1>
              <div className="flex flex-row gap-4 justify-center">
                <span className="font-normal text-lg text-zinc-900">
                  Have an account?
                </span>
                <a
                  href={Paths.LOGIN}
                  className="text-emerald-100 text-lg font-normal font-['Lato']"
                >
                  Sign in
                </a>
              </div>
              <div className="flex flex-col gap-7">
                <div className="flex flex-col gap-3.5">
                  <span>Email</span>
                  <Input
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                  />
                  {formik.errors.email && formik.touched.email && (
                    <span className="text-white text-base font-normal font-['Lato']">
                      {formik.errors.email}
                    </span>
                  )}
                </div>
              </div>
              {sendMeCode.isError && (
                <span
                  className={`text-white text-base ${sendMeCode.isError ? '' : 'hidden'} font-normal font-['Lato']`}
                >
                  {sendMeCode.error.data
                    ? sendMeCode.error.data.message
                    : 'Something went wrong'}
                </span>
              )}
              <ButtonGreen type="submit" disabled={formik.isSubmitting}>
                Continue
              </ButtonGreen>
            </form>
          </div>
        );
      case 2:
        return (
          <div className="loginForm">
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
              <h1 className="text-neutral-700 text-center text-3xl font-bold font-['Lato']">
                Enter confirmation code
              </h1>
              <span className="text-center text-neutral-700 text-lg font-normal font-['Lato']">
                Enter the confirmation code we sent
                <br /> to your email
              </span>
              <div className="flex flex-col gap-7">
                <div className="flex flex-col gap-3.5">
                  <OTPInput
                    value={formik.values.code}
                    onChange={e => {
                      formik.setFieldValue('code', e);
                    }}
                    numInputs={6}
                    containerStyle="flex w-[480px] gap-7 justify-center"
                    inputStyle="rounded text-5xl"
                    renderInput={props => <input {...props} />}
                  />
                </div>
              </div>
              <button
                onClick={onSendCode}
                className="text-emerald-100 text-center text-lg font-normal font-['Lato']"
              >
                Resend code
              </button>
              {formik.errors.code && formik.touched.code && formik.submitCount > 2 && (
                <span className="text-white text-base font-normal font-['Lato']">
                  {formik.errors.code}
                </span>
              )}
              {confirmCode.isError && (
                <span
                  className={`text-white text-base ${confirmCode.isError ? '' : 'hidden'} font-normal font-['Lato']`}
                >
                  {confirmCode.error.data
                    ? confirmCode.error.data.message
                    : 'Something went wrong'}
                </span>
              )}
              <ButtonGreen type="submit" disabled={formik.isSubmitting}>
                Continue
              </ButtonGreen>
            </form>
          </div>
        );
      case 3:
        return (
          <div className="loginForm">
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
              <h1 className="text-neutral-700 text-center text-3xl font-bold font-['Lato']">
                Enter password
              </h1>
              <div className="flex flex-col gap-7">
                <div className="flex flex-col gap-3.5">
                  <span>Password</span>
                  <Input
                    onChange={e => {
                      formik.handleChange(e);
                    }}
                    value={formik.values.password}
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    error={!!formik.errors.password}
                  />
                  {formik.errors.password &&
                    formik.touched.password &&
                    formik.submitCount > 3 && (
                      <span className="text-white text-base font-normal font-['Lato']">
                        {formik.errors.password}
                      </span>
                    )}
                </div>
                <div className="flex flex-col gap-3.5">
                  <span>Confirm password</span>
                  <Input
                    onChange={e => {
                      formik.handleChange(e);
                    }}
                    value={formik.values.confirmPassword}
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                    error={!!formik.errors.confirmPassword}
                  />
                  {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                    <span className="text-white text-base font-normal font-['Lato']">
                      {formik.errors.confirmPassword}
                    </span>
                  )}
                </div>
                {restorePassword.isError && (
                  <span
                    className={`text-white text-base ${restorePassword.isError ? '' : 'hidden'} font-normal font-['Lato']`}
                  >
                    {restorePassword.error.data
                      ? restorePassword.error.data.message
                      : 'Something went wrong'}
                  </span>
                )}
              </div>

              <ButtonGreen type="submit" disabled={formik.isSubmitting}>
                Continue
              </ButtonGreen>
            </form>
          </div>
        );
      case 4:
        return (
          <div className="loginForm justify-center align-middle gap-4">
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
              <div className="flex justify-center">
                <svg
                  width="120"
                  height="120"
                  viewBox="0 0 120 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M98.2134 77.2494C100.571 78.0225 101.875 80.5714 100.887 82.8473C97.532 90.5736 92.2088 97.3175 85.4159 102.385C77.4188 108.351 67.7748 111.702 57.8015 111.981C47.8282 112.26 38.0119 109.453 29.6939 103.943C21.3759 98.4336 14.9618 90.4903 11.3278 81.1984C7.69384 71.9065 7.0173 61.7192 9.39062 52.0284C11.7639 42.3375 17.0713 33.6158 24.5877 27.0546C32.1042 20.4935 41.463 16.413 51.3856 15.3706C59.814 14.4852 68.3 15.8285 76.0061 19.229C78.2761 20.2307 79.0475 22.9878 77.84 25.1552C76.6324 27.3227 73.9036 28.0746 71.613 27.1211C65.5419 24.5938 58.9115 23.6145 52.3243 24.3065C44.242 25.1556 36.6188 28.4793 30.4964 33.8236C24.374 39.1679 20.0509 46.2721 18.1178 54.1657C16.1846 62.0593 16.7357 70.3572 19.6957 77.9258C22.6557 85.4944 27.8803 91.9646 34.6556 96.4523C41.431 100.94 49.4267 103.227 57.5503 102.999C65.674 102.772 73.5294 100.042 80.0434 95.1831C85.3523 91.2226 89.5592 86.005 92.3049 80.0296C93.3409 77.775 95.8558 76.4762 98.2134 77.2494Z"
                    fill="white"
                  />
                  <path
                    d="M42.2344 58.209L60.5497 76.5243C60.6506 76.6252 60.8142 76.6252 60.9151 76.5243L100.371 37.0684"
                    stroke="white"
                    strokeWidth="9.04348"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span className="text-center text-neutral-700  text-2xl font-semibold font-['Lato']">
                Your account was successfully changed{' '}
              </span>
              <ButtonGreen type="submit" disabled={formik.isSubmitting}>
                Continue
              </ButtonGreen>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return <div>{renderStep()}</div>;
};
