import React, { useState } from 'react';
import moment from 'moment/moment';
import { LatestContents } from 'src/api/analyticsApi';
import Markdown from 'marked-react';
import { BasicModal, ButtonBordered } from 'src/components';

type RenderItemProps = {
  classTitle: string;
  description: string;
  date: string;
  creator: string;
  content: string;
  onOpenContent: (text: string) => void;
};

type AnalyticsTableContentGenProps = {
  data: LatestContents;
};

const RenderItem: React.FC<RenderItemProps> = ({
  creator,
  date,
  description,
  classTitle,
  content,
  onOpenContent,
}) => {
  const formatedDate = moment(date).format('LL').toString();

  return (
    <tr className=" bg-white text border-b border-solid border-zinc-100 text-neutral-700 text-base align-middle font-normal font-['Lato']">
      <td className="px-6  py-4">{classTitle}</td>
      <td className="px-6  py-4">{description}</td>
      <td className="px-6 py-4">{creator}</td>
      <td className="px-6 py-4">{formatedDate}</td>
      <td className="px-6 py-4">
        <ButtonBordered onClick={() => onOpenContent(content)}>
          Show content
        </ButtonBordered>
      </td>
    </tr>
  );
};

export const AnalyticsTableContentGen: React.FC<AnalyticsTableContentGenProps> = ({
  data,
}) => {
  const [isShowContent, setShowContent] = useState(false);
  const [textContent, setTextContent] = useState('');

  const onClose = () => {
    setShowContent(false);
    setTextContent('');
  };

  const onOpen = (text: string) => {
    setShowContent(true);
    setTextContent(text);
  };

  return (
    <div className="flex flex-col gap-3 py-8">
      <div className="flex flex-col gap-3 ">
        <h1 className="text-neutral-700 text-lg font-semibold font-['Lato']">
          Last Requests of Users in GPTChat
        </h1>
      </div>
      <div>
        <div className="relative h-96 rounded-[10px] flex flex-1 overflow-x-auto">
          <table className="w-full text-left rounded-[10px] text-surface border border-solid border-zinc-100  dark:text-black">
            <thead className="text-neutral-700  bg-zinc-100 text-lg font-semibold font-['Lato'] px-6 py-4">
              <tr className="border-b border-solid border-zinc-100">
                <th scope="col" className="px-6 py-3">
                  Class
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>

                <th scope="col" className="px-6 py-3">
                  Creator
                </th>
                <th scope="col" className="px-6 py-3">
                  Creation Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Content
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map(el => (
                <RenderItem
                  date={el.creationDate}
                  content={el.content}
                  creator={`${el.creator?.firstName} ${el.creator?.lastName}`}
                  description={el.class.description}
                  classTitle={el.class.name}
                  onOpenContent={onOpen}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <BasicModal isOpen={isShowContent} onClose={onClose}>
        <Markdown>{textContent}</Markdown>
      </BasicModal>
    </div>
  );
};
