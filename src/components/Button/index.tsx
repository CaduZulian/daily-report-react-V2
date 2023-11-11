import { StyledButton } from './styles';

export const Button = ({ children, ...rest }: any) => {
  return (
    <StyledButton {...rest}>
      <>{children}</>
    </StyledButton>
  );
};
