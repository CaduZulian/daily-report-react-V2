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

export const ErrorMessage = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.palette.status.red};
`;
