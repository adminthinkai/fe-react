import React from 'react';

import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { Paths } from 'src/enum';
import { useAppSelector } from 'src/hooks/storeHooks';

export const PublicLayout = () => {
  const location = useLocation();
  const { isAuth, token } = useAppSelector(state => state.app);

  return token ? <Navigate to={Paths.MAIN} replace state={location} /> : <Outlet />;
};
