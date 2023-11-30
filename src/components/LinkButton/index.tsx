import { StyledButton } from './styles';

export const LinkButton = ({ children, ...rest }: any) => {
  return (
    <StyledButton {...rest}>
      <>{children}</>
    </StyledButton>
  );
};
