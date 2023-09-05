import { getToken } from '#/shared/utils/token';

const authHeader = () => {
  const token = getToken();
  if (token) {
    return {
      Authorization: `Bearer ${token}`,
    };
  }
};

export const getHeaders = () => ({
  'Content-Type': 'application/json',
  ...authHeader(),
});
