import { IUser } from '@/@types';

export type IGetUserByIdParams =
  | {
      id?: string;
      userId?: undefined;
    }
  | {
      userId?: string;
      id?: undefined;
    };

export interface IGetUserByIdResponse {
  data?: IUser;
}

export interface IPostCreateUserParams {
  data: Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>;
}

export interface IPostCreateUserResponse {
  createUser: (params: IPostCreateUserParams) => Promise<IUser | undefined>;
}

export interface IPutUpdateUserParams {
  id: string;
  data: Partial<Omit<IUser, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>;
}

export interface IPutUpdateUserResponse {
  updateUser: (params: IPutUpdateUserParams) => Promise<IUser | undefined>;
}
