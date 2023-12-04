import styled from 'styled-components';
import InputMask from 'react-input-mask';

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
  color: #212121;
`;

export const Required = styled.span`
  font-size: 0.75rem;
  line-height: 150%;
  color: #9e9e9e;
`;

export const Input = styled(InputMask)`
  width: 100%;
  height: 2.5rem;
  padding: 0 1rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.palette.text.dark};
  border-radius: 0.5rem;

  :focus-within {
    border: solid 1px #3fcfa9;
  }

  :disabled {
    background: #f3f5f7;
  }

  ::placeholder {
    color: ${({ theme }) => theme.palette.textLight};
  }
`;

export const ErrorMessage = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.palette.error.main};
`;
