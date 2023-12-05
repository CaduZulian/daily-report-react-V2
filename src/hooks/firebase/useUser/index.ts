import { useState, useEffect } from 'react';
import {
  collection,
  doc,
  updateDoc,
  onSnapshot,
  query,
  where,
  getDoc,
  setDoc,
  getDocs,
} from 'firebase/firestore';
import { v4 } from 'uuid';
import { toast } from 'react-toastify';

import { firebaseDatabase } from '@/services/firebaseService';

import {
  IGetUserByIdParams,
  IGetUserByIdResponse,
  IPostCreateUserParams,
  IPostCreateUserResponse,
  IPutUpdateUserParams,
  IPutUpdateUserResponse,
} from './models';
import { IUser } from '@/@types';

export const useUser = () => {
  const collectionRef = collection(firebaseDatabase, 'users');

  const useGetUserById = (params: IGetUserByIdParams) => {
    const [user, setUser] = useState<IUser>();

    useEffect(() => {
      if (params?.id) {
        const docRef = doc(collectionRef, params.id);

        onSnapshot(docRef, (doc) => {
          setUser(doc.data() as IUser);
        });
      } else if (params?.userId) {
        const queryUser = query(
          collectionRef,
          where('userId', '==', params.userId),
        );

        onSnapshot(queryUser, (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setUser(doc.data() as IUser);
          });
        });
      } else {
        setUser(undefined);
      }
    }, [JSON.stringify(params)]);

    const response: IGetUserByIdResponse = {
      data: user,
    };

    return response;
  };

  const usePostCreateUser = () => {
    const createUser = async (params: IPostCreateUserParams) => {
      const findUserQuery = query(
        collectionRef,
        where('userId', '==', params.data.userId),
      );

      const findUser = await getDocs(findUserQuery);

      if (!findUser.docs.length) {
        const id = v4();

        await setDoc(doc(collectionRef, id), {
          ...params.data,
          id,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        const response = await getDoc(doc(collectionRef, params.data.userId));

        return response.data() as IUser;
      }
    };

    const response: IPostCreateUserResponse = {
      createUser,
    };

    return response;
  };

  const usePutUpdateUser = () => {
    const updateUser = async (params: IPutUpdateUserParams) => {
      const { id, ...rest } = params;

      const findUser = doc(collectionRef, id);

      const user = await getDoc(findUser);

      if (!user.exists()) {
        toast.error('Erro ao atualizar usuário: Usuário não existe!');
        throw new Error('User does not exists');
      }

      const docRef = doc(collectionRef, id);

      await updateDoc(docRef, {
        ...rest.data,
        updatedAt: new Date(),
      });

      const response = await getDoc(docRef);

      toast.success('Usuário atualizado com sucesso!');

      return response.data() as IUser;
    };

    const response: IPutUpdateUserResponse = {
      updateUser,
    };

    return response;
  };

  return {
    useGetUserById,
    usePostCreateUser,
    usePutUpdateUser,
  };
};
