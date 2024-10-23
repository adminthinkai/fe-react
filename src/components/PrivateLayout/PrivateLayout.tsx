import React, { useEffect, useMemo, useState } from 'react';

import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAppSelector } from 'src/hooks/storeHooks';
import { Paths, StylesBranding } from 'src/enum';
import { useGetBrandingQuery } from 'src/api/brandingApi';
import {
  BasicModal,
  ButtonBordered,
  ButtonGreenSmall,
  Input,
  NavigationMenu,
} from 'src/components';
import { CircularProgress } from '@mui/material';
import { QuestionSvg } from 'src/assets/svg/QuestionSvg';
import { Chat } from 'src/components/Chat/Chat';
import { ChatModal } from 'src/components/Chat/ChatModal';
import { useCreateChatMutation } from 'src/api/chatApi';
import { LocationType } from 'src/types';
import { useGetMeQuery, useUpdateUserMutation } from 'src/api/usersApi';
import { ButtonChat } from 'src/components/ButtonChat';
import { useGetUnreadNotificationCountQuery } from 'src/api/notificationApi';
import { Header } from '../Header';
import { useSendHelpMutation } from 'src/api/classesApi';

export const PrivateLayout = () => {
  const location = useLocation();
  const [isGetHelpModal, setHelpModal] = useState<boolean>(false);
  const { token } = useAppSelector(state => state.app);
  const { data, isFetching } = useGetBrandingQuery({});
  const me = useGetMeQuery({});
  const [updateUser, {}] = useUpdateUserMutation({});
  const [isShowChat, setShowChat] = useState(false);
  const [isShotModalChat, setIsShowModalChat] = useState(false);
  const [createChat, createChatInfo] = useCreateChatMutation();
  const unreadNotify = useGetUnreadNotificationCountQuery({});
  const allowedLocationChat = [Paths.DOCUMENTATIONS, `${Paths.CLASSES}/`];
  const [helpMessage, setHelpMessage] = useState('');

  const background = useMemo(() => {
    if (data) {
      return data.backgroundColorType === StylesBranding.GRADIENT
        ? `linear-gradient(${data.backgroundColorFirst}, ${data.backgroundColorSecond})`
        : data.backgroundColorFirst;
    }
    return `linear-gradient('#205072, '#329D9C')`;
  }, [data]);

  useEffect(() => {
    if (me?.data?.id) {
      (async () => {
        const response = await fetch('https://ipapi.co/json');
        const text = await response.text();
        const { country_name }: LocationType = JSON.parse(text);
        if (country_name && country_name !== me.data?.country) {
          updateUser({ country: country_name, userId: me.data?.id || '' });
        }
      })();
    }
  }, [me.data?.country, me.data?.id, updateUser]);

  useEffect(() => {
    unreadNotify.refetch();
  }, [location]);

  const onResize = () => {
    setShowChat(false);
    setIsShowModalChat(true);
  };
  const onResizeModal = () => {
    setIsShowModalChat(false);
    setShowChat(true);
  };

  const onChat = () => {
    if (isShowChat) {
      setShowChat(false);
    } else {
      createChat({}).then(() => {
        setShowChat(true);
      });
    }
  };

  /*  if (!data) {
    return (
      <div className="flex flex-1 h-[100vh] justify-center items-center ">
        <CircularProgress size={100} color="secondary" />
      </div>
    );
  } */

  const [handleSendHelpRequest, updateSendHelpRequest] = useSendHelpMutation();

  const handleSendEamil = () => {
    setHelpModal(false);
    handleSendHelpRequest(helpMessage);
    setHelpMessage('');
  };

  return token ? (
    <div className="flex flex-1 ">
      <BasicModal
        isOpen={isGetHelpModal}
        onClose={() => {
          setHelpModal(false);
        }}
      >
        <div style={{ width: 400, height: 200 }}>
          <div className="flex flex-col">
            <span className="pb-3.5">Enter your message</span>
            <Input
              onChange={e => setHelpMessage(e.target.value)}
              value={helpMessage}
              type="text"
              name="description"
              placeholder="Message..."
              bordered
            />
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: 30,
              width: '88%',
            }}
          >
            <div className="flex gap-4  justify-center">
              <ButtonBordered onClick={() => setHelpModal(false)}>
                <b>Cancel</b>
              </ButtonBordered>
              <ButtonGreenSmall
                onClick={() => {
                  handleSendEamil();
                }}
              >
                Send
              </ButtonGreenSmall>
            </div>
          </div>
        </div>
      </BasicModal>
      <div
        style={{
          background,
        }}
        className={`flex flex-1 min-h-[100vh] bg-gradient-to-b from-cyan-800 to-teal-500 `}
      >
        <div className="flex gap-11 flex-col max-w-[20vw] align-middle pt-14 pb-14">
          <div className=" flex justify-center align-middle">
            <span className="text-white items-center text-[40px] px-3 text-center font-bold font-['Lato'] text-wrap">
              {data && data.logo ? (
                <div>
                  <img
                    style={{
                      borderRadius: 50,
                      width: '100%',
                      height: '100%',
                    }}
                    src={data.logo.url}
                    width={260}
                    height={260}
                    alt="LOGO"
                  />
                  <div className="text-white text-[40px] font-bold font-['Lato']">
                    {data && data.name ? data.name : 'LOGO'}
                  </div>
                </div>
              ) : (
                <div className="text-white text-[40px] font-bold font-['Lato']">
                  {data && data.name ? data.name : 'LOGO'}
                </div>
              )}
            </span>
          </div>
          <NavigationMenu branding={data} />
          <div
            className=" flex flex-1  justify-center items-end"
            onClick={() => setHelpModal(true)}
          >
            <ButtonBordered style={{ borderColor: '#fff', color: '#fff' }}>
              Get Help
            </ButtonBordered>
          </div>
        </div>
        <div className="flex flex-1 flex-col bg-white rounded-tl-[50px] rounded-bl-[50px]">
          <Header notificationCount={unreadNotify.data || 0} />
          <Outlet />
        </div>
      </div>
      <div className="fixed flex flex-col justify-end items-end gap-5 bottom-[17px] right-[32px] z-20 ">
        {isShowChat && (
          <Chat
            onResize={onResize}
            isShow={isShowChat}
            onClose={() => setShowChat(false)}
          />
        )}
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        {!allowedLocationChat.some(item => location.pathname.startsWith(item)) && (
          <ButtonChat
            color={data ? data.backgroundColorFirst : '#fff'}
            onChat={onChat}
            isLoading={createChatInfo.isLoading}
          />
        )}
      </div>
      {isShotModalChat && (
        <ChatModal
          onResize={onResizeModal}
          isOpen={isShotModalChat}
          onClose={() => {
            setIsShowModalChat(false);
          }}
        />
      )}
    </div>
  ) : (
    <Navigate to={Paths.LOGIN} replace state={location} />
  );
};
