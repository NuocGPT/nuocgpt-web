import {
  LOCAL_STORAGE_IS_ADMIN,
  LOCAL_STORAGE_IS_PASSWORD,
  LOCAL_STORAGE_REFRESH_TOKEN_KEY,
  LOCAL_STORAGE_TOKEN_KEY,
} from './constant';

export const getToken = () => localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);

export const setToken = (accessToken: string) => {
  localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, accessToken);
};

export const clearToken = () => {
  localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
  localStorage.removeItem(LOCAL_STORAGE_IS_ADMIN);
};

export const getRefreshToken = () =>
  localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);

export const setRefreshToken = (refreshToken: string) => {
  localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, refreshToken);
};

export const setIsAdmin = (role: string) => {
  localStorage.setItem(LOCAL_STORAGE_IS_ADMIN, role);
};

export const getIsAdmin = () => localStorage.getItem(LOCAL_STORAGE_IS_ADMIN);

export const setPassword = (password: string) => {
  localStorage.setItem(LOCAL_STORAGE_IS_PASSWORD, password);
};

export const getPassword = () =>
  localStorage.getItem(LOCAL_STORAGE_IS_PASSWORD);

export const clearPassword = () => {
  localStorage.removeItem(LOCAL_STORAGE_IS_PASSWORD);
};

export const clearRefreshToken = () => {
  localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
};
