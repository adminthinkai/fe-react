import {
  createBrowserRouter,
  Navigate,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';
import { SignUp } from 'src/pages/signUp/SignUp';
import { Paths, UserRole } from 'src/enum';
import { Restore } from 'src/pages/restore/Restore';
import { PublicLayout } from 'src/components/PublicLayout';
import { PrivateLayout } from 'src/components/PrivateLayout';
import { UsersList } from 'src/components';
import { Branding } from 'src/components/Branding';
import { Classes } from 'src/components/Classes/Classes';
import { Class } from 'src/components/Classes/Class';
import { Analytics } from 'src/components/Analytics';
import { Documentation } from 'src/components/Document/Documentation';
import { History } from 'src/components/History/History';
import { SeparateRoute } from 'src/hoc/SeparateRoute';
import { InviteAdmin } from 'src/components/InviteAdmin/InviteAdmin';
import { Login } from './login';
import { Settings } from './settings/Settings';

const publicRoutes: RouteObject[] = [
  { path: Paths.LOGIN, element: <Login /> },
  { path: Paths.SIGNUP, element: <SignUp /> },
  { path: Paths.RESTORE, element: <Restore /> },
];

const privateRoutes: RouteObject[] = [
  { path: '*', element: <Navigate to={Paths.CLASSES} /> },

  {
    path: `${Paths.USERS}`,
    element: (
      <SeparateRoute roles={[UserRole.ADMIN, UserRole.SUPERADMIN]}>
        <UsersList />
      </SeparateRoute>
    ),
  },
  {
    path: `${Paths.CLASSES}`,
    element: (
      <SeparateRoute roles={[UserRole.ADMIN, UserRole.USER, UserRole.SUPERADMIN]}>
        <Classes />
      </SeparateRoute>
    ),
  },
  {
    path: `${Paths.HISTORY}`,
    element: (
      <SeparateRoute roles={[UserRole.ADMIN, UserRole.USER, UserRole.SUPERADMIN]}>
        <History />
      </SeparateRoute>
    ),
  },
  {
    path: `${Paths.CLASSES}/:id`,
    element: (
      <SeparateRoute roles={[UserRole.ADMIN, UserRole.USER, UserRole.SUPERADMIN]}>
        <Class />
      </SeparateRoute>
    ),
  },
  {
    path: `${Paths.SETTINGS}`,
    element: (
      <SeparateRoute roles={[UserRole.ADMIN, UserRole.USER, UserRole.SUPERADMIN]}>
        <Settings />
      </SeparateRoute>
    ),
  },
  {
    path: `${Paths.BRANDING}`,
    element: (
      <SeparateRoute roles={[UserRole.ADMIN, UserRole.SUPERADMIN]}>
        <Branding />
      </SeparateRoute>
    ),
  },
  {
    path: `${Paths.ANALYTICS}`,
    element: (
      <SeparateRoute roles={[UserRole.ADMIN, UserRole.SUPERADMIN]}>
        <Analytics />
      </SeparateRoute>
    ),
  },
  {
    path: `${Paths.DOCUMENTATIONS}`,
    element: (
      <SeparateRoute roles={[UserRole.ADMIN, UserRole.SUPERADMIN]}>
        <Documentation />
      </SeparateRoute>
    ),
  },
  {
    path: `${Paths.SUPER_INVITE}`,
    element: (
      <SeparateRoute roles={[UserRole.ADMIN, UserRole.SUPERADMIN]}>
        <InviteAdmin />
      </SeparateRoute>
    ),
  },
];

const router = createBrowserRouter([
  { element: <PublicLayout />, children: publicRoutes },
  {
    element: <PrivateLayout />,
    children: privateRoutes,
  },
]);

export const Root = () => {
  return <RouterProvider router={router} />;
};
