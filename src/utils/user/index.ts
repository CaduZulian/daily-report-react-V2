import { localStorageKeys } from '@/data';

interface ISignedUser {
  id: string;
  name: string;
  avatar: string;
}

export const getSignedUser = () => {
  const localStorageUser = localStorage.getItem(localStorageKeys.USER);

  if (!localStorageUser) return null;

  return JSON.parse(localStorageUser) as ISignedUser;
};
