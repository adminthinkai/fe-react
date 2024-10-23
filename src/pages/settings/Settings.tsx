import React, { useEffect, useState } from 'react';

import { ButtonGreenSmall } from 'src/components/ButtonGreenSmall';
import { useLogOutMutation } from 'src/api/authAPI';
import { useNavigate } from 'react-router-dom';
import { Paths } from 'src/enum';
import { BasicModal } from 'src/components/BasicModal';
import { ChangePassForm } from 'src/components/ChangePassForm';
import { useDeleteUserMutation, useGetMeQuery } from 'src/api/usersApi';
import { useDispatch } from 'react-redux';
import { setIsAuth, setToken } from 'src/store/slices/appSlice';
import { ButtonBordered } from 'src/components';

export const Settings = () => {
  const [handleLogOut, { isSuccess }] = useLogOutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useGetMeQuery({});

  const [isOpenChangePass, setIsOpenChangePass] = useState<boolean>(false);
  const [handleDeleteUser, updateUserInfo] = useDeleteUserMutation();
  const [isDeleteModal, setDeleteModal] = useState(false);
  const onOpenChangePass = () => {
    setIsOpenChangePass(true);
  };
  const onCloseChangePass = () => {
    setIsOpenChangePass(false);
  };

  const onLogOut = () => {
    dispatch(setIsAuth(false));
    dispatch(setToken(null));
    handleLogOut({});
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(Paths.LOGIN);
    }
  }, [isSuccess, navigate]);

  return (
    <div className="pt-8  pl-12 pr-12">
      <div className="flex flex-col gap-2.5 pb-12">
        <h1 className="text-neutral-700 text-3xl font-bold  ">Settings</h1>
        <p className="eutral-700 opacity-70 text-lg font-normal ">
          Manage your account details bellow
        </p>
      </div>
      <BasicModal
        isOpen={isDeleteModal}
        onClose={() => {
          setDeleteModal(false);
        }}
      >
        <div style={{ width: 340, height: 120 }}>
          <div className="flex flex-col">
            <span className="pb-3.5">Are you sure you want to delete your account?</span>
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: 30,
              width: '88%',
            }}
          >
            <div className="flex gap-4  justify-center">
              <ButtonBordered onClick={() => setDeleteModal(false)}>
                <b>Cancel</b>
              </ButtonBordered>
              <ButtonGreenSmall
                onClick={() => {
                  handleDeleteUser();
                  setDeleteModal(false);
                  handleLogOut();
                }}
              >
                Yes
              </ButtonGreenSmall>
            </div>
          </div>
        </div>
      </BasicModal>
      <div className=" flex align-middle pt-2.5 pb-2.5  border-t border-solid border-gray-200">
        <div className="flex flex-1 pt-5 pb-5 text-neutral-700 text-2xl font-semibold font-['Lato']">
          Name
        </div>
        <div className="flex flex-1 pt-5 pb-5 text-neutral-700 text-2xl font-normal font-['Lato']">
          {data && data.firstName} {data && data.lastName}
        </div>
      </div>
      <div className=" flex align-middle pt-2.5 pb-2.5  border-t border-solid border-gray-200">
        <div className="flex flex-1 pt-5 pb-5 text-neutral-700 text-2xl font-semibold font-['Lato']">
          Email
        </div>
        <div className="flex flex-1 pt-5 pb-5 text-neutral-700 text-2xl font-normal font-['Lato']">
          {data && data.email}
        </div>
        <div className="pt-5 pb-5"></div>
      </div>
      <div className=" flex align-middle pt-2.5 pb-2.5  border-t border-solid border-gray-200">
        <div className="flex flex-1 pt-5 pb-5 text-neutral-700 text-2xl font-semibold font-['Lato']">
          Password
        </div>
        <div className="flex flex-1 pt-5 pb-5 text-neutral-700 text-2xl font-normal font-['Lato']">
          *******
        </div>
        <button type="button" onClick={onOpenChangePass} className="pt-5 pb-5">
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18.4464 3.27585C19.5441 2.17819 21.0328 1.56152 22.5852 1.56152C24.1375 1.56152 25.6263 2.17819 26.7239 3.27585C27.8216 4.37351 28.4383 5.86227 28.4383 7.4146C28.4383 8.96693 27.8216 10.4557 26.7239 11.5533L14.8664 23.4109C14.1889 24.0884 13.7914 24.4858 13.3464 24.8321C12.8239 25.2408 12.2589 25.5909 11.6589 25.8759C11.1514 26.1171 10.6164 26.2958 9.70892 26.5984L5.54392 27.9859L4.54142 28.3209C4.14271 28.454 3.7148 28.4734 3.30568 28.3769C2.89655 28.2804 2.5224 28.0718 2.22517 27.7746C1.92794 27.4774 1.71939 27.1032 1.62291 26.6941C1.52642 26.285 1.54582 25.8571 1.67892 25.4584L3.40142 20.2921C3.70392 19.3834 3.88267 18.8483 4.12392 18.3396C4.41017 17.7408 4.75892 17.1758 5.16767 16.6521C5.51267 16.2096 5.91142 15.8109 6.58892 15.1334L18.4464 3.27585ZM5.50017 26.0258L9.05142 24.8408C10.0402 24.5108 10.4602 24.3696 10.8514 24.1833C11.3264 23.9559 11.7764 23.6784 12.1927 23.3546C12.5339 23.0871 12.8489 22.7759 13.5864 22.0384L23.0489 12.5758C21.7516 12.1161 20.5739 11.3712 19.6027 10.3959C18.6282 9.42444 17.8841 8.24677 17.4252 6.9496L7.96267 16.4121C7.22517 17.1483 6.91267 17.4621 6.64642 17.8046C6.32273 18.2206 6.04487 18.6703 5.81767 19.1458C5.63142 19.5371 5.49017 19.9571 5.16017 20.9459L3.97517 24.4996L5.50017 26.0258ZM18.9439 5.42835C18.9877 5.6471 19.0589 5.9446 19.1802 6.29085C19.5457 7.33722 20.1441 8.28692 20.9302 9.06835C21.7112 9.85425 22.6605 10.4526 23.7064 10.8183C24.0539 10.9396 24.3514 11.0108 24.5702 11.0546L25.3977 10.2271C26.1393 9.48028 26.5547 8.46997 26.5528 7.41748C26.551 6.365 26.1321 5.35615 25.3878 4.61193C24.6436 3.8677 23.6348 3.44879 22.5823 3.44695C21.5298 3.44511 20.5195 3.86049 19.7727 4.6021L18.9439 5.42835Z"
              fill="#363C39"
              fillOpacity="0.5"
            />
          </svg>
        </button>
      </div>
      <div className=" flex align-middle pt-2.5 pb-2.5  border-t border-solid border-gray-200">
        <div className="flex flex-1 pt-5 pb-5 text-neutral-700 text-2xl font-semibold font-['Lato']">
          Log out
        </div>

        <button onClick={onLogOut} className="pt-5 pb-5">
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.25 3.75H6.25C5.58696 3.75 4.95107 4.01339 4.48223 4.48223C4.01339 4.95107 3.75 5.58696 3.75 6.25L3.75 23.75C3.75 24.413 4.01339 25.0489 4.48223 25.5178C4.95107 25.9866 5.58696 26.25 6.25 26.25H11.25M20 8.75L26.25 15M26.25 15L20 21.25M26.25 15L11.25 15"
              stroke="#363C39"
              strokeOpacity="0.5"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className=" flex align-middle pt-2.5 pb-2.5 border-b border-t border-solid border-gray-200">
        <div className="flex flex-1  items-center pt-5 pb-5 text-neutral-700 text-2xl font-semibold font-['Lato']">
          Delete Account
        </div>
        <div className="pt-5 pb-5" onClick={() => setDeleteModal(true)}>
          <ButtonGreenSmall>Delete</ButtonGreenSmall>
        </div>
      </div>
      <BasicModal onClose={onCloseChangePass} isOpen={isOpenChangePass}>
        <ChangePassForm cancelClick={onCloseChangePass} />
      </BasicModal>
    </div>
  );
};
