import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const LabelContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;

  margin-bottom: 5px;
`;

export const Label = styled.label`
  font-size: 1rem;
  line-height: 150%;
  color: #212121;
`;

export const Required = styled.span`
  font-size: 12px;
  line-height: 150%;
  color: #9e9e9e;
`;

export const Input = styled.input<{ hasError?: boolean }>`
  width: 100%;
  height: 40px;
  padding: 0 1rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.palette.text.dark};
  border-radius: 8px;
  border: solid 1px
    ${({ hasError, theme }) =>
      hasError ? theme.palette.status.red : theme.palette.border.light};

  :focus-within {
    border: solid 1px #3fcfa9;
  }

  :disabled {
    background: #f3f5f7;
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
