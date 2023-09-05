import { loadable } from '@enouvo/react-uikit';
import { useRoutes } from 'react-router-dom';
import ForgotPassword from '#/pages/ForgotPassword';
import ResetPassword from '#/pages/ResetPassword';
import SignUp from '#/pages/SignUp';
import VerifyOTPPage from '#/pages/VerifyOTP';
import GuardRoute from './GuardRoute';
import PrivateRoute from './PrivateRoute';

const Login = loadable(import('../pages/Login'));

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
  ]);

  return routes;
};

export default App;
