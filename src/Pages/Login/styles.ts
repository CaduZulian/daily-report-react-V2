import styled from 'styled-components';

export const ContainerStyled = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 1rem;

  h2: {
    font-size: 2rem;
    font-weight: 600;
    line-height: 140%;

    color: ${({ theme }) => theme.palette.text.dark};
  }
`;
