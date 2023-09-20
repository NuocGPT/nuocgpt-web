import {
  LOCAL_STORAGE_AVATAR,
  LOCAL_STORAGE_IS_PASSWORD,
  LOCAL_STORAGE_LANGUAGE,
  LOCAL_STORAGE_REFRESH_TOKEN_KEY,
  LOCAL_STORAGE_TOKEN_KEY,
} from './constant';

export const getToken = () => localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);

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

export const setAvatar = (avatar: string) => {
  localStorage.setItem(LOCAL_STORAGE_AVATAR, avatar);
};

export const setLanguage = (language: string) => {
  localStorage.setItem(LOCAL_STORAGE_LANGUAGE, language);
};

export const getAvatar = () => localStorage.getItem(LOCAL_STORAGE_AVATAR);
