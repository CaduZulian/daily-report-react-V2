export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface IUser {
  id: string;
  name: string;
  avatar: string;
}

export interface IAuthContext {
  user?: IUser;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}
