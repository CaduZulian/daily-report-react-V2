import styled from 'styled-components';

export const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.5rem;

  border: none;
  margin: 0;

  font-size: 1rem;
  line-height: 150%;
  white-space: nowrap;
  color: ${({ theme }) => theme.palette.text.light};
  cursor: pointer;

  transition: all 0.2s ease-in;

  &:hover {
    color: ${({ theme }) => theme.palette.text.dark};
  }
`;
