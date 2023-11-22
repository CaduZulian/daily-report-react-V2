import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/useAuth';
import { useMemo } from 'react';
import { getSignedUser } from '@/utils';

export const ProtectedRoute = ({
  hasSigned,
  children,
}: {
  children: React.ReactNode;
  hasSigned: boolean;
}) => {
  const { user } = useAuth();

  const signedUser = useMemo(() => {
    return user || getSignedUser();
  }, [JSON.stringify(user)]);

  if (hasSigned) {
    if (!signedUser) {
      // user is not authenticated
      return <Navigate to='/auth/login' />;
    }
  } else {
    if (signedUser) {
      return <Navigate to='/home' />;
    }
  }

  return children;
};
