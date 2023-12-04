import { Modal } from '@/components';
import { EditUserModalProps } from './models';

export const EditUserModal = ({
  isOpen,
  onClose,
  user,
}: EditUserModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title='Editar usuário'>
      <div></div>
    </Modal>
  );
};
