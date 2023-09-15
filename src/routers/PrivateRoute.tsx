import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Spin } from 'antd';
import { useNavigate, useRoutes } from 'react-router-dom';
import NotFoundPage from '#/pages/404';
import Chat from '#/pages/chat';
import NewConversation from '#/pages/new-conversation';
import UserFeedback from '#/pages/user-feedback';
import { QUERY } from '#/services/constants';
import { fetchMe } from '#/services/me';
import PrivateLayout from '#/shared/components/layout/PrivateLayout';
import { clearToken } from '#/shared/utils/token';
import type { MyWindow } from '#/shared/utils/type';
import AdminRoute from './AdminRoute';

function PrivateRoute() {
  const navigate = useNavigate();
  const { data: user } = useQuery(QUERY.getMe, fetchMe, {
    onSuccess(data) {
      localStorage.setItem('email', data?.email);
    },
    staleTime: 3000,
  });

  const handleLogout = () => {
    clearToken();
    navigate('/login');
  };

  useEffect(() => {
    (window as unknown as MyWindow).pushLogin = () => navigate('login');
  }, []);

  const routes = useRoutes([
    {
      element: (
        <AdminRoute>
          <UserFeedback />
        </AdminRoute>
      ),
      path: '/admin',
    },
    { element: <NewConversation />, path: '/new-conversation' },
    { element: <Chat />, path: '/c/:id' },
    { element: <Spin />, path: '/' },
    { element: <NotFoundPage />, path: '*' },
  ]);

  return (
    <PrivateLayout logout={handleLogout} user={user}>
      {routes}
    </PrivateLayout>
  );
}

export default PrivateRoute;
