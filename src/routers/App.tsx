import { loadable } from '@enouvo/react-uikit';
import { useRoutes } from 'react-router-dom';
import ForgotPassword from '#/pages/forgot-password';
import ResetPassword from '#/pages/reset-password';
import SignUp from '#/pages/sign-up';
import UserFeedback from '#/pages/user-feedback';
import VerifyOTPPage from '#/pages/verify-otp';
import AdminRoute from './AdminRoute';
import GuardRoute from './GuardRoute';
import PrivateRoute from './PrivateRoute';

const Login = loadable(import('../pages/sign-in'));

const App = () => {
  const routes = useRoutes([
    {
      element: (
        <GuardRoute>
          <Login />
        </GuardRoute>
      ),
      path: 'login',
    },
    {
      element: (
        <GuardRoute>
          <SignUp />
        </GuardRoute>
      ),
      path: 'sign-up',
    },
    {
      element: (
        <AdminRoute>
          <UserFeedback />
        </AdminRoute>
      ),
      path: '/admin',
    },
    {
      element: (
        <GuardRoute>
          <ForgotPassword />
        </GuardRoute>
      ),
      path: 'forgot-password',
    },
    {
      element: (
        <GuardRoute>
          <ResetPassword />
        </GuardRoute>
      ),
      path: 'reset-password',
    },
    {
      element: (
        <GuardRoute>
          <VerifyOTPPage />
        </GuardRoute>
      ),
      path: 'verify-otp',
    },
    {
      element: (
        <GuardRoute isPrivate>
          <PrivateRoute />
        </GuardRoute>
      ),
      path: '/*',
    },
  ]);

  return routes;
};

export default App;
