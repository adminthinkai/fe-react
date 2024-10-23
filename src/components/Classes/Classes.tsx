import React, { useState } from 'react';
import { ClassTypeItem } from 'src/components/Classes/ClassTypeItem';
import { classesCategories } from 'src/utils/classesConstants';
import { BasicModal, ButtonGreenSmall } from 'src/components';
import { CreateClass } from 'src/components/Classes/CreateClass/CreateClass';
import { ClassCard } from 'src/components/Classes/ClassCard';
import { useGetClassesListQuery } from 'src/api/classesApi';

export const Classes = () => {
  const [classCategory, setClassCategory] = useState<(typeof classesCategories)[number]>(
    classesCategories[0],
  );
  const [isShowCreate, setIsShowCreate] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const { data } = useGetClassesListQuery({ page, size: 10, category: classCategory });

  return (
    <div className="px-12 py-8">
      <div className="flex flex-col gap-3 mb-10">
        <h1 className="text-neutral-700 text-3xl font-bold font-['Lato']">Classes</h1>
        <div className="flex flex-row justify-between">
          <h3 className="text-neutral-700 opacity-70 text-lg font-normal font-['Lato']">
            Use our existing classes or create new ones for any service you need.
          </h3>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-6 ">
          {classesCategories.map((el, index) => (
            <ClassTypeItem
              title={el}
              isActive={el === classCategory}
              onPress={() => setClassCategory(el)}
              key={index}
            />
          ))}
        </div>
        <ButtonGreenSmall onClick={() => setIsShowCreate(true)}>
          Create Class
        </ButtonGreenSmall>
      </div>
      <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 py-8 {/*h-[70vh] overscroll-y-none  overflow-y-scroll*/}">
        {data &&
          data.rows.map(el => {
            return (
              <ClassCard
                title={el.name}
                usedFor={el.lastUpdateDate}
                description={el.description}
                id={el.id}
                iconNumber={el.iconNumber}
                key={el.id}
              />
            );
          })}
      </div>
      <BasicModal isOpen={isShowCreate} onClose={() => setIsShowCreate(false)}>
        <CreateClass handleClose={() => setIsShowCreate(false)} />
      </BasicModal>
    </div>
  );
};
