import styled from 'styled-components';

export const StyledButton = styled.button<{ variant: 'primary' | 'secondary' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;

  background-color: ${({ theme, variant }) =>
    variant === 'primary'
      ? theme.palette.action.primary
      : theme.palette.background.lightGray};

  padding: 0.5rem 1rem;
  gap: 0.5rem;

  border: none;
  margin: 0;

  font-size: 1rem;
  line-height: 150%;
  white-space: nowrap;
  color: ${({ theme, variant }) =>
    variant === 'primary' ? theme.palette.text.light : theme.palette.text.dark};
  cursor: pointer;

  transition: all 0.2s ease-in;

  &:hover {
    opacity: 0.8;
  }
`;
