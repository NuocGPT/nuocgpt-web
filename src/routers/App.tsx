import { loadable } from '@enouvo/react-uikit';
import { useRoutes } from 'react-router-dom';
import ForgotPassword from '#/pages/forgot-password';
import ResetPassword from '#/pages/reset-password';
import SignUp from '#/pages/sign-up';
import VerifyOTPPage from '#/pages/verify-otp';
import SetPassword from '#/shared/components/Authentication/SetPassword';
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
    {
      element: (
        <GuardRoute>
          <SetPassword />
        </GuardRoute>
      ),
      path: 'secret',
    },
  ]);

  return routes;
};

export default App;
