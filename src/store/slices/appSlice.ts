import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AppInitStateType = {
  isAuth: boolean;
  token: string | null;
};

const initialState: AppInitStateType = {
  isAuth: false,
  token: localStorage.getItem('token') || null,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
  },
});
export const { setIsAuth, setToken } = appSlice.actions;
