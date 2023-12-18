import { CardProps } from './models';
import { CardStyled } from './styles';

export const Card = ({ children, ...rest }: CardProps) => (
  <CardStyled {...rest}>{children}</CardStyled>
);
