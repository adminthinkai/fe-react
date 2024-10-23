import {
  FetchArgs,
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { RootState } from 'src/hooks/storeHooks';
import { setIsAuth, setToken } from 'src/store/slices/appSlice';

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: 'https://thinkai-api.rc.pixelartsoft.com/',

  prepareHeaders: (headers, { getState }) => {
    const { token } = (getState() as RootState).app;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        // const refreshResult = await baseQuery('/refresh', api, extraOptions);
        // if (refreshResult.data) {
        //   // api.dispatch(tokenReceived(refreshResult.data));
        //   // retry the initial query
        //   result = await baseQuery(args, api, extraOptions);
        // } else {
        //   api.dispatch(setIsAuth(false));
        //   api.dispatch(setToken(null));
        //   localStorage.clear();
        //   // api.dispatch(loggedOut());
        // }
      } catch (e) {
        api.dispatch(setIsAuth(false));
        api.dispatch(setToken(null));
        localStorage.clear();
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
  tagTypes: [
    'User',
    'UserList',
    'Branding',
    'ClassesList',
    'ClassById',
    'Analytics',
    'Documents',
    'Chat',
    'Notifications',
    'HistoryById',
  ],
});
