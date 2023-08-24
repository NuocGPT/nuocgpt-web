import {
  LOCAL_STORAGE_REFRESH_TOKEN_KEY,
  LOCAL_STORAGE_TOKEN_KEY,
} from './constant';

// export const getToken = () => localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);

export const getToken = () => 'a';

export const setToken = (accessToken: string) => {
  localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, accessToken);
};

export const clearToken = () => {
  localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
};

export const getRefreshToken = () =>
  localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);

export const setRefreshToken = (refreshToken: string) => {
  localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, refreshToken);
};

export const clearRefreshToken = () => {
  localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
};
