import React from 'react';
import { useGetMeQuery } from 'src/api/usersApi';
import { Paths, UserRole } from 'src/enum';
import { Navigate } from 'react-router-dom';

type RouteProps = {
  roles: UserRole[];
  children?: React.ReactNode;
};

export const SeparateRoute = ({ roles, children }: RouteProps) => {
  const { data } = useGetMeQuery({});
  if (roles && data && !roles.includes(data?.role)) {
    return <Navigate to={Paths.CLASSES} />;
  }
  return children;
};
