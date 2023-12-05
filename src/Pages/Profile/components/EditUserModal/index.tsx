import { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { EditUserButtonsGroupStyled, EditUserFormStyled } from './styles';

import { Button, MaskedInput, Modal } from '@/components';

import { useUser } from '@/hooks';

import { EditUserModalProps, IEditUserForm } from './models';

import { editUserSchema } from './validation';

export const EditUserModal = ({
  isOpen,
  onClose,
  user,
}: EditUserModalProps) => {
  const editUserForm = useForm<IEditUserForm>({
    resolver: yupResolver(editUserSchema),
  });

  const { usePutUpdateUser } = useUser();

  const putUpdateUser = usePutUpdateUser();

  const handleSubmit = async (data: IEditUserForm) => {
    if (!user) return;

    const response = await putUpdateUser.updateUser({
      id: user.id,
      data: {
        metadata: {
          dailyHours: Number(data.dailyHours),
          weeklyHours: Number(data.weeklyHours),
          monthlyHours: Number(data.monthlyHours),
          lunchHours: Number(data.lunchHours),
        },
      },
    });

    if (response) {
      onClose();
    }
  };

  useEffect(() => {
    if (!isOpen) {
      editUserForm.reset();
    } else if (user) {
      editUserForm.reset({
        dailyHours: String(user.metadata.dailyHours),
        weeklyHours: String(user.metadata.weeklyHours),
        monthlyHours: String(user.metadata.monthlyHours),
        lunchHours: String(user.metadata.lunchHours),
      });
    }
  }, [user, isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title='Editar perfil'>
      <FormProvider {...editUserForm}>
        <EditUserFormStyled onSubmit={editUserForm.handleSubmit(handleSubmit)}>
          <MaskedInput mask='999' name='dailyHours' label='Horas diárias' />

          <MaskedInput mask='999' name='weeklyHours' label='Horas semanais' />

          <MaskedInput mask='999' name='monthlyHours' label='Horas mensais' />

          <MaskedInput mask='999' name='lunchHours' label='Horas de almoço' />

          <EditUserButtonsGroupStyled>
            <Button>Confirmar</Button>

            <Button type='button' variant='secondary' onClick={onClose}>
              Cancelar
            </Button>
          </EditUserButtonsGroupStyled>
        </EditUserFormStyled>
      </FormProvider>
    </Modal>
  );
};
