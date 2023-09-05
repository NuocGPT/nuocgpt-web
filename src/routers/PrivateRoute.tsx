import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useRoutes } from 'react-router-dom';
import NotFoundPage from '#/pages/404Page';
import Dashboard from '#/pages/Dashboard';
import NewConversation from '#/pages/NewConversation';
import { QUERY } from '#/services/constants';
import { fetchMe } from '#/services/me';
import PrivateLayout from '#/shared/components/layout/PrivateLayout';
import type { MyWindow } from '#/shared/utils/type';

function PrivateRoute() {
  const navigate = useNavigate();
  const { data: user } = useQuery(QUERY.getMe, fetchMe, {
    onSuccess(data) {
      localStorage.setItem('email', data?.email);
    },
  });

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

  const routes = useRoutes([
    { element: <NewConversation />, path: '/new-conversation' },
    { element: <Dashboard />, path: '/c/:id' },
    { element: <NotFoundPage />, path: '*' },
  ]);

  return (
    <PrivateLayout logout={handleLogout} user={user}>
      {routes}
    </PrivateLayout>
  );
}

export default PrivateRoute;
