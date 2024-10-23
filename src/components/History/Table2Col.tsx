import React from 'react';
import moment from 'moment';
import { CreatedClassesInTheLastSevenDay } from 'src/types/analyticTypes';
import { intervalFilter } from 'src/components/History/History';

type RenderItemProps = {
  topic: string;
  date: Date;
};
type Table2ColProps = {
  title: string;
  colName1: string;
  colName2: string;
  data?: CreatedClassesInTheLastSevenDay[];
  setInterval: React.Dispatch<React.SetStateAction<string>>;
  interval: string;
};

const RenderItemTable2Col: React.FC<RenderItemProps> = ({ date, topic }) => {
  const formattedDate = moment(date).format('LL').toString();

  return (
    <tr className="bg-white text border-b border-solid border-zinc-100 text-neutral-700 text-base align-middle font-normal font-['Lato']">
      <td className="w-1/2 text-center px-3 py-2">{topic}</td>
      <td className="w-1/2 text-center px-6 py-4 border-l border-solid border-zinc-100">
        {formattedDate}
      </td>
    </tr>
  );
};

export const Table2Col: React.FC<Table2ColProps> = ({
  title,
  colName1,
  colName2,
  data,
  setInterval,
  interval,
}) => {
  const onChangeInterval = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInterval(e.target.value);
  };

  return (
    <div className="flex flex-1 flex-col gap-3 py-8">
      <div className="flex justify-between items-center gap-3">
        <h1 className="text-neutral-700 text-lg font-semibold font-['Lato']">{title}</h1>
        <div className="text-neutral-700 opacity-50 text-sm font-normal font-['Lato'] leading-normal">
          <select onChange={onChangeInterval} value={interval}>
            {intervalFilter.map(el => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="relative rounded-[10px] flex flex-1 overflow-x-auto">
        <div className="w-full">
          <table className="w-full text-left rounded-[10px] text-surface border border-solid border-zinc-100 dark:text-black">
            <thead className="bg-zinc-100 text-neutral-700 text-lg font-semibold font-['Lato']">
              <tr className="border-b border-solid border-zinc-100">
                <th
                  scope="col"
                  className="w-[50%] text-center py-4 text-neutral-700 text-base font-semibold font-['Lato']"
                >
                  {colName1}
                </th>
                <th
                  scope="col"
                  className="w-[50%] text-center py-4 text-neutral-700 text-base font-semibold font-['Lato']"
                >
                  {colName2}
                </th>
              </tr>
            </thead>
          </table>
          <div className="h-96 overflow-y-auto">
            <table className="w-full text-left text-surface dark:text-black">
              <tbody>
                {data?.map(el => (
                  <RenderItemTable2Col
                    key={el.id}
                    date={new Date(el.creationDate)}
                    topic={el.name}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
