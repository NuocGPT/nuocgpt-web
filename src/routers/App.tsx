import { loadable } from '@enouvo/react-uikit';
import { useRoutes } from 'react-router-dom';
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
