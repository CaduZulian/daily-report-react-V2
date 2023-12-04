import { IUser } from '@/@types';

export interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: IUser;
}
