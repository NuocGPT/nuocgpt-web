import { useEffect, useState } from 'react';
import { Loading } from '@enouvo/react-uikit';
import { useNavigate } from 'react-router-dom';
import { getIsAdmin, getToken } from '#/shared/utils/token';

interface Props {
  children: JSX.Element;
}

function AdminRoute({ children }: Props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const accessToken = getToken();
      const isAdmin = getIsAdmin();

      if (!accessToken) {
        navigate('/');
      }
      if (isAdmin !== 'admin') {
        navigate('/');
      }
      setLoading(false);
    })();
  }, [navigate]);

  if (loading) return <Loading />;
  return children;
}

export default AdminRoute;
