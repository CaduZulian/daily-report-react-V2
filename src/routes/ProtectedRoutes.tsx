import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/useAuth';

export const ProtectedRoute = ({
  hasSigned,
  children,
}: {
  children: React.ReactNode;
  hasSigned: boolean;
}) => {
  const { user } = useAuth();

  if (hasSigned) {
    if (!user) {
      // user is not authenticated
      return <Navigate to='/auth/login' />;
    }
  } else {
    if (user) {
      return <Navigate to='/home' />;
    }
  }

  return children;
};
