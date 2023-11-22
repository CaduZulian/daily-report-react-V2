import { ISignedUser } from '@/@types';

export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface IAuthContext {
  user?: ISignedUser;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}
