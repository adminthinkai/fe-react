import { configureStore } from '@reduxjs/toolkit';
import { appSlice } from 'src/store/slices/appSlice';
import { loginApi } from 'src/api/authAPI';
import { api } from 'src/api/api';
import { chatSlice } from 'src/store/slices/chatSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    app: appSlice.reducer,
    chat: chatSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(loginApi.middleware),
});
