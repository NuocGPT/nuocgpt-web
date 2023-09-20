import { useEffect, useState } from 'react';
import { Loading } from '@enouvo/react-uikit';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { QUERY } from '#/services/constants';
import { fetchMe } from '#/services/me';

interface Props {
  children: JSX.Element;
}

function PermissionRoute({ children }: Props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { data: user } = useQuery(QUERY.getMe, fetchMe, {
    onSuccess() {
      setLoading(false);
    },
  });
  useEffect(() => {
    if (!loading && !user?.roles?.includes('admin')) {
      navigate('/login', {
        replace: true,
      });
    }
  }, [navigate, loading, user?.roles]);

  if (loading) return <Loading />;
  return children;
}

export default PermissionRoute;
