import { STORAGE_KEYS } from "./consts";

export const getItem = (key: string) => {
  return localStorage.getItem(key) || null;
};
export const removeItem = (key: string) => {
  return localStorage.removeItem(key);
};

export const setItem = (key: string, value: any) => {
  return localStorage.setItem(key, value);
};

export const clearData = () => localStorage.clear();

export const clearUserDetails = () => {
  removeItem(STORAGE_KEYS.CLIENT_TOKEN_STORAGE_KEY);
};

export const storeUserToken = (token: string) => {
  return setItem(STORAGE_KEYS.CLIENT_TOKEN_STORAGE_KEY, token);
};

export const fetchUserToken = () => {
  return getItem(STORAGE_KEYS.CLIENT_TOKEN_STORAGE_KEY);
};
