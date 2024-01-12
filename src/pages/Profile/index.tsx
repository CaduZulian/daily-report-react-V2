import { useState } from 'react';
import {
  CardItemStyled,
  CardStyled,
  ContainerStyled,
  HeaderStyled,
} from './styles';

import { useAuth } from '@/context';

import { Button } from '@/components';
import { EditUserModal } from './components';

import { useUser } from '@/hooks';

export const Profile = () => {
  const { user } = useAuth();
  const { useGetUserById } = useUser();

  const getUserById = useGetUserById({
    userId: user?.id,
  });

  const [modalEditProfileIsOpen, setModalEditProfileIsOpen] = useState(false);

  return (
    <ContainerStyled>
      <HeaderStyled>
        <div className='userContainer'>
          <img src={user?.avatar} alt={user?.name} />

          <div className='userNameContainer'>
            <strong>{user?.name}</strong>

            <span>{user?.email}</span>
          </div>
        </div>

        <Button onClick={() => setModalEditProfileIsOpen(true)}>
          Editar perfil
        </Button>
      </HeaderStyled>

      <hr />

      <CardStyled>
        <h4>Dados do usuário</h4>

        <div className='container'>
          <CardItemStyled>
            <strong>Horas trabalhadas por dia</strong>
            <span>
              {getUserById?.data?.metadata.dailyHours
                ? getUserById?.data?.metadata.dailyHours > 1
                  ? `${getUserById?.data?.metadata.dailyHours} horas`
                  : `${getUserById?.data?.metadata.dailyHours} hora`
                : ''}
            </span>
          </CardItemStyled>

          <CardItemStyled>
            <strong>Horas de almoço</strong>
            <span>
              {getUserById?.data?.metadata.lunchHours
                ? getUserById?.data?.metadata.lunchHours > 1
                  ? `${getUserById?.data?.metadata.lunchHours} horas`
                  : `${getUserById?.data?.metadata.lunchHours} hora`
                : ''}
            </span>
          </CardItemStyled>

          <CardItemStyled>
            <strong>Horas trabalhadas por semana</strong>
            <span>
              {getUserById?.data?.metadata.weeklyHours
                ? getUserById?.data?.metadata.weeklyHours > 1
                  ? `${getUserById?.data?.metadata.weeklyHours} horas`
                  : `${getUserById?.data?.metadata.weeklyHours} hora`
                : ''}
            </span>
          </CardItemStyled>

          <CardItemStyled>
            <strong>Horas trabalhadas por mês</strong>
            <span>
              {getUserById?.data?.metadata.monthlyHours
                ? getUserById?.data?.metadata.monthlyHours > 1
                  ? `${getUserById?.data?.metadata.monthlyHours} horas`
                  : `${getUserById?.data?.metadata.monthlyHours} hora`
                : ''}
            </span>
          </CardItemStyled>
        </div>
      </CardStyled>

      <EditUserModal
        isOpen={modalEditProfileIsOpen}
        onClose={() => setModalEditProfileIsOpen(false)}
        user={getUserById?.data}
      />
    </ContainerStyled>
  );
};
