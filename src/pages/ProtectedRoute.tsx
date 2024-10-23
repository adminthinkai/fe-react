import { Navigate, useLocation } from 'react-router-dom';
import { Paths } from 'src/enum';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/hooks/storeHooks';

export const ProtectedRoute = ({ children }: any) => {
  const location = useLocation();
  const { isAuth, token } = useAppSelector(state => state.app);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isAuth) {
      /*
      dispatch(getMe(token));
*/
    }
  }, [dispatch]);

  return token ? (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>{children}</>
  ) : (
    <Navigate to={Paths.LOGIN} replace state={location} />
  );
};
