import { StyledButton } from './styles';

export const Button = ({ children, variant = 'primary', ...rest }: any) => {
  return (
    <StyledButton variant={variant} {...rest}>
      {children}
    </StyledButton>
  );
};
