import { IUser } from '@/@types';
import { editUserSchema } from '../validation';
import * as Yup from 'yup';

export interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: IUser;
}

export type IEditUserForm = Yup.InferType<typeof editUserSchema>;
