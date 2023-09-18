import { useEffect, useState } from 'react';
import { Loading } from '@enouvo/react-uikit';
import { useNavigate } from 'react-router-dom';
import { getPassword, getToken } from '#/shared/utils/token';

interface Props {
  isPrivate?: boolean;
  children: JSX.Element;
}

function GuardRoute({ isPrivate = false, children }: Props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const password = getPassword();
  useEffect(() => {
    (async () => {
      if (password) {
        setLoading(true);
        const accessToken = getToken();
        if (!accessToken && isPrivate) {
          navigate('/login', {
            replace: true,
          });
        }
        if (accessToken && !isPrivate) {
          navigate('/', {
            replace: true,
          });
        }
      } else {
        navigate('/secret');
      }
      setLoading(false);
    })();
  }, [navigate, isPrivate, password]);

  if (loading) return <Loading />;
  return children;
}

export default GuardRoute;
