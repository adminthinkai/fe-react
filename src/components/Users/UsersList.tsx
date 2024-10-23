import React, { ChangeEvent, useEffect, useState } from 'react';
import { ButtonGreenSmall } from 'src/components/ButtonGreenSmall';
import { SelectText } from 'src/components/RoundedSelect';
import { useGetUsersListQuery, useUpdateUserMutation } from 'src/api/usersApi';
import { BasicModal, Input } from 'src/components';
import { CreateFormNewUser } from 'src/components/CreateFormNewUser';
import { filterUsers, filterUsersRole } from 'src/utils/selectorConstants';
import { UserRole } from 'src/enum/userRole';
import { UserTableItem } from 'src/components/Users/UserTableItem';
import { useDebounce } from 'src/hooks/useDebounce';

export const UsersList = () => {
  const [isNewShow, setIsNew] = useState(false);
  const [page, setPage] = useState(1);
  const [searchName, setSearchName] = useState('');
  const [sortDirection, setSortDirection] = useState<'DESC' | 'ASC'>('DESC');
  const [filter, setFilter] = useState<string>(filterUsers[0].value);
  const [filterUserRole, setFilterUserRole] = useState<UserRole | string>(
    filterUsersRole[0].value,
  );

  const debounceSearchValue = useDebounce(searchName, 300, () => {
    setPage(1);
  });

  const [updateUser, infoUpdateUser] = useUpdateUserMutation();

  const { data, isFetching, currentData } = useGetUsersListQuery({
    page,
    size: 10,
    filter,
    role: filterUserRole,
    keySearchValue: debounceSearchValue,
    sortDirection,
  });

  const onNewUserHandler = () => {
    setIsNew(true);
  };

  const userHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setPage(1);
    setFilterUserRole(e.target.value);
  };

  const filterHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setPage(1);
    setFilter(e.target.value);
  };
  const onChangeSearchByName = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  };
  const onRestoreUser = (userId: string) => {
    updateUser({ userId, status: 'ACTIVE' });
    setPage(1);
  };
  const onBlockUser = (userId: string) => {
    updateUser({ userId, status: 'BLOCKED' });
    setPage(1);
  };

  useEffect(() => {}, []);

  useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (scrolledToBottom && !isFetching && data && data.rows.length < data.count) {
        setPage(page + 1);
      }
    };

    document.addEventListener('scroll', onScroll);

    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, [page, isFetching, data]);

  const onSortBy = (filterType: string) => {
    setPage(1);
    if (sortDirection === 'ASC') {
      setSortDirection('DESC');
    } else if (sortDirection === 'DESC') {
      setSortDirection('ASC');
    }
    setFilter(filterType);
  };

  return (
    <div className="px-12 py-8">
      <div className="flex flex-col gap-3 mb-10">
        <h1 className="text-neutral-700 text-3xl font-bold font-['Lato']">Users</h1>
        <div className="flex flex-row justify-between">
          <h3 className="text-neutral-700 opacity-70 text-lg font-normal font-['Lato']">
            View and manage users on your platform.
          </h3>
          <div className="flex gap-3">
            <SelectText
              selectItem={filter}
              onChangeSelect={filterHandler}
              items={filterUsers}
            />
            <SelectText
              selectItem={filterUserRole}
              onChangeSelect={userHandler}
              items={filterUsersRole}
            />
            <ButtonGreenSmall onClick={onNewUserHandler} type="button">
              New
            </ButtonGreenSmall>
          </div>
        </div>
        <div>
          <Input
            style={{ width: 300 }}
            type="text"
            placeholder="Search by name "
            value={searchName}
            onChange={onChangeSearchByName}
            bordered
          />
        </div>
      </div>
      <div>
        <div className="relative max-h-[70vh] overflow-x-auto">
          <table className="w-full text-left text-surface dark:text-black">
            <thead className="text-neutral-700 border-b border-solid border-gray-200 text-lg font-semibold font-['Lato'] px-6 py-4">
              <tr className="border-b border-solid border-gray-200">
                <th
                  scope="col"
                  className="px-6 py-3 border-b border-solid border-gray-200"
                >
                  Pic
                </th>
                <th scope="col" className="px-6 py-3">
                  <button type="button" onClick={() => onSortBy(filterUsers[2].value)}>
                    Name
                  </button>
                </th>
                <th scope="col" className="px-6 py-3">
                  <button type="button" onClick={() => onSortBy(filterUsers[1].value)}>
                    Email
                  </button>
                </th>
                <th scope="col" className="px-6 py-3">
                  <button type="button" onClick={() => onSortBy(filterUsers[4].value)}>
                    Last Active
                  </button>
                </th>
                <th scope="col" className="px-6 py-3">
                  <button type="button" onClick={() => onSortBy('role')}>
                    Role
                  </button>
                </th>
                <th scope="col" className="px-6 py-3">
                  Manage
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData &&
                currentData.rows.map(el => (
                  <UserTableItem
                    onBlocked={onBlockUser}
                    onRestore={onRestoreUser}
                    isLoading={
                      infoUpdateUser.isLoading &&
                      infoUpdateUser.originalArgs?.userId === el.id
                    }
                    key={el.id}
                    user={el}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <BasicModal isOpen={isNewShow} onClose={() => setIsNew(false)}>
        <CreateFormNewUser onCloseModal={() => setIsNew(false)} />
      </BasicModal>
    </div>
  );
};
