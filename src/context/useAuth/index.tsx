import { createContext, useContext, useLayoutEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { AuthProviderProps, IAuthContext, IUser } from './models';

import { localStorageKeys } from '@/data';

import { firebaseAuth } from '@/services';

const AuthContext = createContext({} as IAuthContext);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<IUser>();

  useLayoutEffect(() => {
    const userStorage = localStorage.getItem(localStorageKeys.USER);

    if (userStorage) {
      const userLogged = JSON.parse(userStorage) as IUser;

      setUser(userLogged);
    }
  }, []);

  const signInWithGoogle: IAuthContext['signInWithGoogle'] = async () => {
    const auth = firebaseAuth.getAuth();
    const provider = new firebaseAuth.GoogleAuthProvider();

    auth.useDeviceLanguage();

    const result = await firebaseAuth.signInWithPopup(auth, provider);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user;

      if (!displayName || !photoURL) {
        toast.error('Faltam informações da conta Google.');

        throw new Error('Missing information from Google Account.');
      }

      const user = {
        id: uid,
        name: displayName,
        avatar: photoURL,
      };

      localStorage.setItem(localStorageKeys.USER, JSON.stringify(user));

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
    }
  };

  const signOut: IAuthContext['signOut'] = async () => {
    const auth = firebaseAuth.getAuth();
    await auth.signOut();

    localStorage.removeItem(localStorageKeys.USER);

    setUser(undefined);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
