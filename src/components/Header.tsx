import React from 'react';
import { useGetMeQuery } from 'src/api/usersApi';
import { BellSvg } from 'src/assets/svg';
import { useNavigate } from 'react-router-dom';
import {
  useDeleteNotificationMutation,
  useGetNotificationListQuery,
} from 'src/api/notificationApi';
import { Paths } from 'src/enum';

type HeaderProps = {
  notificationCount: number;
};

export const Header: React.FC<HeaderProps> = ({ notificationCount }) => {
  const { data } = useGetMeQuery({});
  const [isShowNotification, setShowNotification] = React.useState(false);
  const navigate = useNavigate();
  const notificationListQuery = useGetNotificationListQuery({});
  const [deleteNotification] = useDeleteNotificationMutation({});

  const navigationHandler = (classId: string, notifId: string) => {
    navigate(`${Paths.CLASSES}/${classId}`);
    setShowNotification(false);
    deleteNotification(notifId);
  };

  return (
    <div className="flex justify-end items-center pr-10 pt-4 pb-4 gap-10  border-b border-solid border-gray-200 ">
      <div className="flex gap-5 items-center ">
        {/* <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="12.5"
            cy="12.5"
            r="8.75"
            stroke="#363C39"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M26.25 26.25L18.75 18.75"
            stroke="#363C39"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg> */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowNotification(!isShowNotification);
            }}
            disabled={notificationCount === 0}
          >
            <BellSvg />
            <div className="absolute flex justify-center right-[-2px] top-0 items-center w-4 h-4 bg-[#119293] rounded-full">
              <p className="text-white text-center text-[12px] font-normal font-['Lato']">
                {notificationCount}
              </p>
            </div>
          </button>
          {isShowNotification && (
            <div className="absolute left-[-200px] flex   flex-col  rounded-[10px] bg-white  border border-solid border-neutral-200">
              {notificationListQuery.data &&
                notificationListQuery.data.rows.map((notification, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() =>
                      navigationHandler(notification.classId, notification.id)
                    }
                    style={{
                      borderBottom:
                        index !== notificationListQuery.data.rows.length - 1
                          ? '1px solid rgb(229,229,229)'
                          : 'none',
                    }}
                    className="p-2 hover:bg-gray-200 min-w-[200px] border-b-2 border-solid border-neutral-200"
                  >
                    {notification.text}
                  </button>
                ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-6 border border-indigo-600">
        <span className="text-neutral-700 text-base font-normal font-['Lato']">
          {data?.firstName} {data?.lastName}
        </span>
        <svg
          width="45"
          height="45"
          viewBox="0 0 45 45"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse cx="22.5" cy="21.6346" rx="22.5" ry="21.6346" fill="#D9D9D9" />
          <circle
            cx="22.6154"
            cy="20.6154"
            r="6.71538"
            stroke="white"
            strokeWidth="1.8"
          />
          <path
            d="M8 39C9.55748 35.3351 13.2727 27.7744 22.7636 28.0052C31.2 28.2103 35.7021 35.3351 37 39"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};
