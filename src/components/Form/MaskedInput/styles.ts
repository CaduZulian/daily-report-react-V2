import styled from 'styled-components';
import InputMask from 'react-input-mask';

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

export const Input = styled(InputMask)`
  width: 100%;
  height: 40px;
  padding: 0 1rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.palette.text.dark};
  border-radius: 8px;

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
