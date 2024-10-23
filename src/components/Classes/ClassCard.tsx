import React from 'react';
import { useNavigate } from 'react-router-dom';
import { iconsClasses } from 'src/utils/iconsConstants';
import moment from 'moment';
import { Trash } from 'src/assets/svg';

export type ClassCardTypes = {
  title: string;
  description: string;
  usedFor: string;
  id: string;
  iconNumber: number;
};

export const ClassCard: React.FC<ClassCardTypes> = ({
  title,
  description,
  usedFor,
  id,
  iconNumber,
}) => {
  const navigation = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigation(id)}
      className=" p-[25px]  bg-gradient-to-tl from-emerald-100 to-green-400 rounded-[40px] "
    >
      <div className="flex flex-col gap-4" style={{ position: 'relative' }}>
        <div className="flex justify-end">
          <div className="flex rounded-[15px] justify-center items-center p-4 bg-white">
            {iconsClasses.find(el => iconNumber === el.value).icon({})}
          </div>
        </div>
        <div className="flex flex-col gap-2.5">
          <h1 className="text-neutral-700 text-lg text-left font-medium font-['Lato']">
            {title}
          </h1>
          <p className="text-neutral-700 text-left text-sm font-normal font-['Lato']">
            {description}
          </p>
        </div>
        <div className="flex justify-end">
          <p className="opacity-70 text-neutral-700 text-xs font-normal font-['Lato']">
            {moment(usedFor).format(' HH:mm:ss  MMMM DD')}
          </p>
        </div>
      </div>
    </button>
  );
};
