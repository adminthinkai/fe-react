import React, { useState } from 'react';
import moment from 'moment/moment';
import { UsersLastRequests } from 'src/api/analyticsApi';
import { BasicModal, ButtonBordered } from 'src/components';
import Markdown from 'marked-react';

type RenderItemProps = {
  name: string;
  email: string;
  message: string;
  date: string;
  onOpenContent: (text: string) => void;
};

type AnalyticsUsersRequest = {
  data: UsersLastRequests;
};

const RenderItem: React.FC<RenderItemProps> = ({
  name,
  date,
  message,
  email,
  onOpenContent,
}) => {
  const formatedDate = moment(date).format('LL').toString();

  return (
    <tr className=" bg-white text border-b border-solid border-zinc-100 text-neutral-700 text-base align-middle font-normal font-['Lato']">
      <td className="px-6  py-4">{name}</td>
      <td className="px-6  py-4">{email}</td>
      <td className="px-6 py-4">{formatedDate}</td>
      <td className="px-6 py-4">
        <ButtonBordered onClick={() => onOpenContent(message)}>
          Show content
        </ButtonBordered>
      </td>
    </tr>
  );
};

export const AnalyticsTable: React.FC<AnalyticsUsersRequest> = ({ data }) => {
  const [isShowContent, setShowContent] = useState(false);
  const [textContent, setTextContent] = useState('');

  console.log(data);

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
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Creation Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Message
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map(el => {
                return el.user ? (
                  <RenderItem
                    date={el.creationDate}
                    name={`${el.user.firstName} ${el.user.lastName}`}
                    email={el.user.email}
                    message={el.message}
                    onOpenContent={onOpen}
                  />
                ) : null;
              })}
            </tbody>
          </table>
        </div>
        <BasicModal isOpen={isShowContent} onClose={onClose}>
          <Markdown>{textContent}</Markdown>
        </BasicModal>
      </div>
    </div>
  );
};
