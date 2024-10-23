import React, { useCallback, useEffect, useState } from 'react';
import { UserMessage } from 'src/components/Chat/UserMessage';
import { BotMessage } from 'src/components/Chat/BotMessage';
import { SendArrowSvg } from 'src/assets/svg';
import { ResizeSvg } from 'src/assets/svg/ResizeSVG';
import {
  useChatClearMutation,
  useChatSendMessageMutation,
  useGetChatMessagesQuery,
} from 'src/api/chatApi';
import { useAppDispatch, useAppSelector } from 'src/hooks/storeHooks';
import { addMessage, resetState } from 'src/store/slices/chatSlice';
import { CircularProgress } from '@mui/material';
import { ButtonBordered } from 'src/components';
import { QuestionSvg } from 'src/assets/svg/QuestionSvg';
import { useGetMeQuery } from 'src/api/usersApi';
import { useGetBrandingQuery } from 'src/api/brandingApi';

type ChatProps = {
  isShow: boolean;
  onClose: () => void;
  onResize: () => void;
};

export const Chat: React.FC<ChatProps> = ({ isShow, onClose, onResize }) => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const { messages } = useAppSelector(state => state.chat);
  const [chatClear] = useChatClearMutation();

  const chat = useGetChatMessagesQuery({ page });

  const [sendChatMessage, { isLoading, isError }] = useChatSendMessageMutation();

  const [message, setMessage] = useState('');
  const onMessageHandle = e => {
    setMessage(e.target.value);
  };

  const sendMessage = async (text: string) => {
    if (text.trim()) {
      dispatch(
        addMessage({
          message: text,
          role: 'user',
          creationDate: new Date().toDateString(),
        }),
      );
      setMessage('');
      await sendChatMessage({ message: text });
    }
  };

  const onClearChat = () => {
    chatClear({});
  };
  useEffect(() => {
    const listener = async (event: KeyboardEvent) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        event.preventDefault();
        if (!isLoading) {
          await sendMessage(message);
        }
      }
    };
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, [isLoading, message, sendMessage]);

  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, [dispatch]);
  const { data } = useGetBrandingQuery({});

  return (
    <div
      style={{ display: isShow ? 'block' : 'none' }}
      id="chat-container"
      className=" bottom-16 right-4 w-96 z-[99999] "
    >
      <div className="bg-white shadow-md rounded-[20px] max-w-lg w-full">
        <div className="p-4 border-b bg-[#119293] text-white rounded-t-[20px] flex justify-between items-center">
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <div className="flex flex-col gap-3 items-end">
            <div className="flex gap-3">
              <p className="text-lg font-semibold">
                {`Welcome back to ${data?.name ? data?.name : 'thinkAI'} Chatbot`}
              </p>
              <button
                type="button"
                onClick={onResize}
                className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400"
              >
                <ResizeSvg />
              </button>
              <button
                type="button"
                onClick={onClose}
                id="close-chat"
                className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <button
              type="button"
              className="flex  w-[100px] h-[30px] p-[15px] bg-cyan-800  rounded-[100px]  justify-center items-center gap-[15px]  "
              onClick={onClearChat}
            >
              <p className="text-white text-sm font-semibold font-['Lato']">New Chat</p>
            </button>
          </div>
        </div>

        <div className="p-4 h-[55vh] overflow-y-auto flex flex-col-reverse">
          <div
            className={`${isError || chat.isError ? 'visible' : 'hidden'} flex justify-center items-center text-red-500`}
          >
            ERROR
          </div>
          {isLoading && (
            <div
              className={
                'className="mb-2  flex flex-row gap-2 justify-start items-center w-full "'
              }
            >
              <div className="rounded-full  border-[5px] border-dashed border-cyan-800 p-2 ">
                <div className="p-2.5 bg-teal-600 rounded-full">
                  <QuestionSvg width={20} height={20} />
                </div>
              </div>
              <div className="flex justify-center items-center">
                <p
                  className={
                    "text-neutral-700 opacity-50 text-xs font-normal font-['Lato']"
                  }
                >
                  typing...
                </p>
              </div>
            </div>
          )}
          {messages.map(row => {
            if (row.role === 'assistant') {
              return <BotMessage time={row.creationDate} message={row.message} />;
            }
            return <UserMessage time={row.creationDate} message={row.message} />;
          })}
          {chat.data &&
            chat.data.rows.length < chat.data?.count &&
            chat.data.rows.length && (
              <div className="flex justify-center items-center">
                {chat.isFetching ? (
                  <CircularProgress />
                ) : (
                  <ButtonBordered onClick={() => setPage(page + 1)}>
                    show more
                  </ButtonBordered>
                )}
              </div>
            )}
        </div>
        <div className="p-4 border-t flex">
          <input
            value={message}
            onChange={onMessageHandle}
            id="user-input"
            type="text"
            autoComplete="off"
            placeholder="Type a message"
            className="w-full px-3 py-2 border-t border-l border-b rounded-l-[20px] focus:outline-none "
          />
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="submit"
            onClick={() => sendMessage(message)}
            className=" text-white px-4 py-2 border-t border-r border-b rounded-r-[20px]"
            disabled={isLoading}
          >
            <SendArrowSvg />
          </button>
        </div>
      </div>
    </div>
  );
};
