import './styles.model.scss';
import { Paths } from 'src/enum';
import { SignUpForm } from 'src/pages/signUp/SignUpForm';
import { useLocation } from 'react-router-dom';

export const SignUp = () => {
  const { pathname } = useLocation();
  return (
    <div className="containerS ">
      <div className="wrapper">
        <div className="gradient_wrapper flex justify-center flex-row">
          <div className="bg-cover  flex flex-row" />
          <span
            style={{ position: 'absolute', left: 130 }}
            className="text-white ml-[-5vw] mt-20 text-6xl font-bold font-['Lato']"
          >
            thinkAI
          </span>
        </div>
      </div>
      <div className="containerAuth  bg-white">
        <div className="authWrapper min-w-[580px]">
          <div className="navigationWrapper">
            <div className="flex flex-col items-center">
              <a
                href={Paths.LOGIN}
                className="text-neutral-700 opacity-50 text-2xl font-normal font-['Lato']"
              >
                Log in
              </a>
              <div className="flex w-[41px] invisible h-0.5  bg-green-400 rounded-[100px]" />
            </div>
            <div className="flex flex-col items-center">
              <a
                href={Paths.SIGNUP}
                className="text-neutral-700  text-2xl font-normal font-['Lato']"
              >
                Sign up
              </a>
              <div className="w-[41px]  h-0.5 bg-green-400 rounded-[100px]" />
            </div>
          </div>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};
