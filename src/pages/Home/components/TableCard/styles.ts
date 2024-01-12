import styled from 'styled-components';

export const FormStyled = styled.form`
  display: flex;
  align-items: flex-end;

  width: 100%;

  gap: 1rem;
`;

export const TableActionsContainerStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;

  width: 100%;
`;

export const TableActionsButtonStyled = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 1.5rem;
  height: 1.5rem;

  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.palette.background.lightGray};
  border-radius: 0.25rem;

  transition: all 0.2s ease-in;

  svg {
    width: 1rem;
    height: 1rem;
  }

  &:hover {
    background-color: ${({ theme }) => theme.palette.background.lightGray};
  }
`;
