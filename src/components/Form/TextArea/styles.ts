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

export const TextArea = styled.textarea<{ hasError: boolean }>`
  width: 100%;
  min-height: 80px;
  padding: 1rem;

  font-size: 1rem;
  font-style: normal;
  font-weight: 400;

  color: ${({ theme }) => theme.palette.text.dark};
  border: solid 1px
    ${({ theme, hasError }) =>
      hasError ? theme.palette.status.red : theme.palette.border.light};
  border-radius: 8px;

  resize: vertical;

  :focus-within {
    border: solid 1px #3fcfa9;
  }

  :disabled {
    background: #f3f5f7;
  }

  ::placeholder {
    color: ${({ theme }) => theme.palette.text.light};
  }
`;

export const ErrorMessage = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.palette.status.red};
`;
