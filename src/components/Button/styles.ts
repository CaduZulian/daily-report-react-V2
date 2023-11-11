import styled from 'styled-components';

export const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;
  height: 2.5rem;

  background-color: ${({ theme }) => theme.palette.background.darkGreen};

  border: none;
  padding: 0 1rem;
  margin: 0;
  white-space: nowrap;
  font-size: 1rem;
  color: ${({ theme }) => theme.palette.text.light};
  cursor: pointer;

  transition: all 0.2s ease-in;

  :hover {
    background-color: ${({ theme }) => theme.palette.hover.darkGreen};
  }
`;
