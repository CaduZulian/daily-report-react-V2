import { createContext, useContext, useLayoutEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { localStorageKeys } from '@/data';

import { firebaseAuth } from '@/services';
import { useUser } from '@/hooks';

import { ISignedUser } from '@/@types';
import { AuthProviderProps, IAuthContext } from './models';

const AuthContext = createContext({} as IAuthContext);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<ISignedUser>();

  const { usePostCreateUser } = useUser();

  const { createUser } = usePostCreateUser();

  useLayoutEffect(() => {
    const userStorage = localStorage.getItem(localStorageKeys.USER);

    if (userStorage) {
      const userLogged = JSON.parse(userStorage) as ISignedUser;

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

      await createUser({
        data: {
          userId: uid,
          metadata: {
            dailyHours: 8,
            lunchHours: 1,
            weeklyHours: 40,
            monthlyHours: 160,
          },
        },
      });

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
        email: result.user.email || '',
      });
    }
  };

  const signOut: IAuthContext['signOut'] = async () => {
    const auth = firebaseAuth.getAuth();
    await auth.signOut();

    localStorage.removeItem(localStorageKeys.USER);

    setUser(undefined);

    toast.success('Logout realizado com sucesso.');
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
