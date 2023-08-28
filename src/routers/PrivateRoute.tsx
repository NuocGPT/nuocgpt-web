import { useEffect } from 'react';
import { useNavigate, useRoutes } from 'react-router-dom';
// import NotFound from '#/pages/404Page';
import Dashboard from '#/pages/Dashboard';
import PrivateLayout from '#/shared/components/layout/PrivateLayout';
import type { MyWindow } from '#/shared/utils/type';

function PrivateRoute() {
  const user = {};
  const navigate = useNavigate();

  const handleLogout = () => {
    /*
     * TODO
     * logout();
     */
    navigate('/login');
  };

  useEffect(() => {
    (window as unknown as MyWindow).pushLogin = () => navigate('login');
  }, []);

  const routes = useRoutes([{ element: <Dashboard />, path: '*' }]);

  return (
    <PrivateLayout logout={handleLogout} user={user}>
      {routes}
    </PrivateLayout>
  );
}

export default PrivateRoute;
