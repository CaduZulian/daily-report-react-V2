import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  gap: 0.25rem;
`;

export const LabelContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
`;

export const Label = styled.label`
  font-size: 1rem;
  line-height: 150%;
  color: ${({ theme }) => theme.palette.text.dark};
`;

export const Required = styled.span`
  font-size: 0.75rem;
  line-height: 150%;
  color: ${({ theme }) => theme.palette.text.gray};
`;

export const Input = styled.input<{ hasError?: boolean }>`
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

  /* Chrome, Safari, Edge, Opera */
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  [type='number'] {
    -moz-appearance: textfield;
  }
`;

export const ErrorMessage = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.palette.status.red};
`;
