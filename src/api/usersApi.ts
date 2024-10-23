import { api } from 'src/api/api';
import { UserRole } from 'src/enum/userRole';

export type UserType = {
  creationDate: string;
  email: string;
  firstName: string;
  country: string | null;
  lastName: string;
  id: string;
  lastActivity: string;
  lastUpdateDate: string;
  role: UserRole;
  status: string;
};

type UserUpdate = {
  email?: string;
  firstName?: string;
  lastName?: string;
  status?: string;
  country?: string;
  userId: string;
};

export const usersApi = api.injectEndpoints({
  endpoints: builder => ({
    getMe: builder.query<UserType, any>({
      query: () => ({
        url: '/user/get-me',
        method: 'GET',
      }),
      async onQueryStarted(args, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
        } catch (error) {
          console.error('send : ', error);
        }
      },
      providesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query: (data: UserUpdate) => ({
        url: '/user/update-user',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['User', 'UserList'],
    }),
    deleteUser: builder.mutation({
      query: () => ({
        url: '/user/delete-user',
        method: 'DELETE',
      }),
    }),
    getUsersList: builder.query<
      { rows: UserType[]; count: number },
      {
        page: number;
        size: number;
        filter: string;
        role: UserRole | string;
        keySearchValue: string;
        sortDirection: 'DESC' | 'ASC';
      }
    >({
      query: ({ page, size, filter, role, keySearchValue, sortDirection }) => ({
        url: `/user/get-users-list?sortField=${filter}&sortDirection=${sortDirection}&page=${page}&size=${size}&role=${role}&keySearchValue=${keySearchValue}`,
        method: 'GET',
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (data, newData, otherArgs) => {
        if (otherArgs.arg.page === 1) {
          data.rows = [...newData.rows];
          return;
        }
        if (data.count > data.rows.length) {
          data.rows = [...data.rows, ...newData.rows];
        }
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        return currentArg !== previousArg;
      },
      providesTags: ['UserList'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetMeQuery,
  useGetUsersListQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
