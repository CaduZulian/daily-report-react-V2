import { Button } from '@/components';
import { ContainerStyled } from './styles';
import { FaGoogle } from 'react-icons/fa';
import { useAuth } from '@/context';

export const Login = () => {
  const { signInWithGoogle } = useAuth();

  return (
    <ContainerStyled>
      <h2>Login</h2>

      <Button
        style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}
        onClick={() => signInWithGoogle()}
      >
        <FaGoogle />
        Entrar com o Google
      </Button>
    </ContainerStyled>
  );
};
