import '../pages/login/styles.model.scss';
import { useFormik } from 'formik';
import { SignInSchema } from 'src/utils/yap';
import { Paths } from 'src/enum';
import { useLoginMutation } from 'src/api/authAPI';
import { LoginFormData } from 'src/types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from 'src/components/Input';
import { ButtonGreen } from 'src/components/ButtonGreen';

export const LoginForm = () => {
  const [handle, { isSuccess, isError, isLoading, error }] = useLoginMutation();
  const navigation = useNavigate();
  const { handleSubmit, values, isSubmitting, errors, handleChange, touched } =
    useFormik<LoginFormData>({
      initialValues: {
        email: '',
        password: '',
      },
      onSubmit: (val: LoginFormData) => {
        handle(val);
      },
      validationSchema: SignInSchema,
    });

  useEffect(() => {
    if (isSuccess) {
      navigation(Paths.MAIN, { replace: true });
    }
  }, [isSuccess, navigation]);

  return (
    <div className="loginForm">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h1 className="text-neutral-700 text-center text-3xl font-bold font-['Lato']">
          Welcome back to thinkAI
        </h1>
        <div className="flex flex-row gap-4 justify-center">
          <span className="font-normal text-lg text-zinc-900">
            Don’t have an account?
          </span>
          <a
            href={Paths.SIGNUP}
            className="text-emerald-100 text-lg font-normal font-['Lato']"
          >
            Sign up
          </a>
        </div>
        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-3.5">
            <span>Email</span>
            <Input
              onChange={handleChange}
              value={values.email}
              name="email"
              type="email"
              placeholder="Enter your email"
              error={!!errors.email}
            />
            {errors.email && touched.email && (
              <span className="text-white text-base font-normal font-['Lato']">
                {errors.email}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-3.5">
            <span>Password</span>
            <Input
              onChange={handleChange}
              name="password"
              type="password"
              placeholder="Enter your password"
              error={!!errors.password}
            />
            {errors.password && touched.password && (
              <span className="text-white text-base font-normal font-['Lato']">
                {errors.password}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-4">
            <input name="isRemember" id="check" type="checkbox" />
            <label htmlFor="check">
              <span className="RememberMe text-neutral-700 text-base font-normal font-['Lato']">
                Remember me
              </span>
            </label>
          </div>
          <a
            href={Paths.RESTORE}
            className="RestorePassword text-emerald-100 text-base font-normal font-['Lato']"
          >
            Restore Password?
          </a>
        </div>
        {isError && (
          <span
            className={`text-white text-base ${isError ? '' : 'hidden'} font-normal font-['Lato']`}
          >
            {error.data.message}
          </span>
        )}
        <ButtonGreen type="submit" disabled={isLoading && isSubmitting}>
          Continue
        </ButtonGreen>
      </form>
    </div>
  );
};
