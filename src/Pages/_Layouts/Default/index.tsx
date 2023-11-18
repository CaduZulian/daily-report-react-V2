import { MainStyled } from './styles';

import { Header } from '@/components';

import { IDefaultLayoutProps } from './models';

export const DefaultLayout = ({ children }: IDefaultLayoutProps) => {
  return (
    <>
      <Header />

      <MainStyled>{children}</MainStyled>
    </>
  );
};
