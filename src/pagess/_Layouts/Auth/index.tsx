import { ContainerStyled, LeftSideStyled, RightSideStyled } from './styles';

import { IDefaultLayoutProps } from './models';

export const AuthLayout = ({ children }: IDefaultLayoutProps) => {
  return (
    <ContainerStyled>
      <LeftSideStyled>
        <h1>Relatório diário</h1>

        <span>O seu portal de relatórios diários de horas extras.</span>
      </LeftSideStyled>

      <RightSideStyled>{children}</RightSideStyled>
    </ContainerStyled>
  );
};
