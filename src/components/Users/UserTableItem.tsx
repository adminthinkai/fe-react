import React from 'react';
import { NoPhotoSVG } from 'src/assets/svg';
import { UserRole } from 'src/enum/userRole';
import { UserRoleNames } from 'src/utils';
import moment from 'moment';
import { UserType } from 'src/api/usersApi';
import { LinearProgress } from '@mui/material';

type UserTableItemProps = {
  user: UserType;
  onBlocked: (userId: string) => void;
  onRestore: (userId: string) => void;
  isLoading: boolean;
};

export const UserTableItem: React.FC<UserTableItemProps> = ({
  user,
  onRestore,
  onBlocked,
  isLoading,
}) => {
  const { lastActivity } = user;
  const formatedDate = moment(Date.parse(lastActivity)).format('LL').toString();

  return (
    <tr className=" bg-white text border-b border-solid border-gray-200 text-neutral-700 text-base align-middle font-normal font-['Lato']">
      <td className="px-6 py-4">
        <NoPhotoSVG />
      </td>
      <td className="px-6  py-4">
        {user.firstName} {user.lastName}
      </td>
      <td className="px-6  py-4">{user.email}</td>
      <td className="px-6 py-4">{formatedDate}</td>
      <td className="px-6 py-4">
        {user.role === UserRole.USER ? (
          <div className="w-[140px] h-[37px] py-2.5 bg-green-100 rounded-[100px] justify-center items-center gap-2.5 inline-flex">
            <div className="text-teal-800 text-sm font-normal font-['Lato']">
              {UserRoleNames[user.role]}
            </div>
          </div>
        ) : (
          <div className="w-[140px] h-[37px] py-2.5 bg-sky-200 rounded-[100px] justify-center items-center gap-2.5 inline-flex">
            <div className="text-cyan-800 text-sm font-normal font-['Lato']">
              {UserRoleNames[user.role]}
            </div>
          </div>
        )}
      </td>
      <td>
        {user.status === 'BLOCKED' ? (
          <button
            style={{ color: 'green' }}
            type="button"
            onClick={() => onRestore(user.id)}
          >
            Restore user
          </button>
        ) : (
          <button
            type="button"
            style={{ color: 'red' }}
            onClick={() => onBlocked(user.id)}
          >
            Block user
          </button>
        )}
        {isLoading && <LinearProgress />}
      </td>
    </tr>
  );
};
