import { api } from 'src/api/api';
import { setIsAuth, setToken } from 'src/store/slices/appSlice';
import { LoginFormData } from 'src/types';

export type SignUpCred = {
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  verificationCode: number;
};
export type InviteUserCredType = {
  role: string;
  email: string;
  firstName: string;
  lastName: string;
};
export type VerifyCodeCredType = {
  verificationCode: number;
  email: string;
};
export type RestorePassword = {
  verificationCode: number;
  email: string;
  password: string;
};

export type ChangePasswordType = {
  email: string;
  password: string;
  newPassword: string;
};

export const loginApi = api.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: (credentials: LoginFormData) => ({
        url: '/auth/sign-in',
        method: 'PATCH',
        body: {
          password: credentials.password,
          email: credentials.email,
        },
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem('token', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);

          dispatch(setToken(data.accessToken));
          dispatch(setIsAuth(true));
        } catch (error) {
          console.error('Login error: ', error);
        }
      },
      invalidatesTags: ['User'],
    }),
    sendConfirmCodeSignUp: builder.mutation({
      query: (credentials: VerifyCodeCredType) => ({
        url: '/auth/verify-verification-code-sign-up',
        method: 'POST',
        body: {
          verificationCode: credentials.verificationCode,
          email: credentials.email,
        },
      }),
    }),
    sendConfirmCodeRestore: builder.mutation({
      query: (credentials: VerifyCodeCredType) => ({
        url: '/auth/verify-verification-code-restore-password',
        method: 'POST',
        body: {
          verificationCode: credentials.verificationCode,
          email: credentials.email,
        },
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
        } catch (error) {
          console.error('send confirm code error: ', error);
        }
      },
    }),
    register: builder.mutation({
      query: (credentials: SignUpCred) => ({
        url: '/auth/sign-up',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem('token', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);

          dispatch(setToken(data.accessToken));
          dispatch(setIsAuth(true));
        } catch (error) {
          console.error('Register error: ', error);
        }
      },
      invalidatesTags: ['User'],
    }),
    sendMeCodeSignUp: builder.mutation({
      query: (email: string) => ({
        url: '/auth/send-verification-code-sign-up',
        method: 'POST',
        body: {
          email,
        },
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
        } catch (error) {
          console.error('send me code error: ', error);
        }
      },
    }),
    sendMeCodeRestore: builder.mutation({
      query: (email: string) => ({
        url: '/auth/send-verification-code-restore-password',
        method: 'POST',
        body: {
          email,
        },
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
        } catch (error) {
          console.error('send me code error: ', error);
        }
      },
    }),
    restorePassword: builder.mutation({
      query: (credentials: RestorePassword) => ({
        url: '/auth/forgot-password',
        method: 'PATCH',
        body: {
          verificationCode: credentials.verificationCode,
          email: credentials.email,
          password: credentials.password,
        },
      }),
      async onQueryStarted(args, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
        } catch (error) {
          console.error('send restore password error: ', error);
        }
      },
    }),
    logOut: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'DELETE',
      }),
      async onQueryStarted() {
        try {
          localStorage.clear();
        } catch (error) {
          console.error('send restore password error: ', error);
        }
      },
      invalidatesTags: ['User'],
    }),
    changePassword: builder.mutation({
      query: (credentials: ChangePasswordType) => ({
        url: '/auth/change-password',
        method: 'PATCH',
        body: credentials,
      }),
      async onQueryStarted() {
        try {
          localStorage.clear();
        } catch (error) {
          console.error('send restore password error: ', error);
        }
      },
    }),
    inviteUser: builder.mutation({
      query: (credentials: InviteUserCredType) => ({
        url: '/auth/send-invitation',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
        } catch (error) {
          console.error('Login error: ', error);
        }
      },
      invalidatesTags: ['UserList'],
    }),
  }),

  overrideExisting: true,
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRestorePasswordMutation,
  useLogOutMutation,
  useChangePasswordMutation,
  useSendMeCodeSignUpMutation,
  useSendMeCodeRestoreMutation,
  useSendConfirmCodeRestoreMutation,
  useSendConfirmCodeSignUpMutation,
  useInviteUserMutation,
} = loginApi;
