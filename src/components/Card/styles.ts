import styled from 'styled-components';

export const CardStyled = styled.section`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: fit-content;

  padding: 1.5rem;
  gap: 1.5rem;

  background-color: ${({ theme }) => theme.palette.background.white};

  border-radius: 0.5rem;

  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
`;
