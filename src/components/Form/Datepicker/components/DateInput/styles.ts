import ReactInputMask from 'react-input-mask';
import styled from 'styled-components';

export const Container = styled.div<{ hasError?: boolean }>`
  display: flex;
  flex-direction: row;

  width: 100%;
  height: 2.5rem;
  border-radius: 0.5rem;
`;

export const Input = styled(ReactInputMask)<{ hasError?: boolean }>`
  width: 100%;
  height: 2.5rem;

  padding: 0 1rem;

  font-size: 1rem;
  color: ${({ theme }) => theme.palette.text.dark};

  border-radius: 0.5rem;
  border: solid 1px
    ${({ hasError, theme }) =>
      hasError ? theme.palette.status.red : theme.palette.border.light};

  &:focus-within {
    border: solid 1px ${({ theme }) => theme.palette.main.primary};
  }

  :disabled {
    background: ${({ theme }) => theme.palette.background.light};
  }

  ::placeholder {
    color: ${({ theme }) => theme.palette.textLight};
  }
`;
