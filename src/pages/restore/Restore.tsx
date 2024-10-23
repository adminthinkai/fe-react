import './styles.model.scss';
import { Paths } from 'src/enum';
import { RestoreForm } from 'src/pages/restore/RestoreForm';

export const Restore = () => {
  return (
    <div className="containerS">
      <div className="wrapper">
        <div className="gradient_wrapper flex justify-center flex-row">
          <div className="bg-cover  flex flex-row" />
          <span className="text-white ml-[-5vw] mt-20 text-6xl font-bold font-['Lato']">
            thinkAI
          </span>
        </div>
      </div>
      <div className="containerAuth  bg-white">
        <div className="authWrapper min-w-[580px] ">
          <div className="navigationWrapper">
            <div className="justify-center content-center">
              <a
                href={Paths.LOGIN}
                className="text-neutral-700 text-2xl font-normal font-['Lato']"
              >
                Log in
              </a>
              <div className="w-[41px] h-0.5 bg-green-400 rounded-[100px]" />
            </div>
            <div className="justify-center content-center">
              <a
                href={Paths.SIGNUP}
                className="text-neutral-700 text-2xl font-normal font-['Lato']"
              >
                Sign up
              </a>
              <div className="w-[41px] h-0.5 bg-green-400 rounded-[100px]" />
            </div>
          </div>
          <RestoreForm />
        </div>
      </div>
    </div>
  );
};
