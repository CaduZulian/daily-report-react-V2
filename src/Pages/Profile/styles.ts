import styled from 'styled-components';
import { Card } from '@/components';

export const ContainerStyled = styled.section`
  display: flex;
  flex-direction: column;

  width: 100%;

  padding: 2rem;
  gap: 2rem;

  // for ultra wide monitors
  max-width: 2000px;

  hr {
    width: 100%;

    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.palette.text.lightGray};
  }
`;

export const HeaderStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  gap: 1rem;

  .userContainer {
    display: flex;
    align-items: center;

    gap: 1rem;

    img {
      width: 4.5rem;
      height: 4.5rem;

      border-radius: 50%;
    }

    .userNameContainer {
      display: flex;
      flex-direction: column;

      gap: 0.25rem;

      strong {
        font-size: 1.5rem;
        font-weight: 600;

        color: ${({ theme }) => theme.palette.text.dark};
      }

      span {
        font-size: 1rem;
        font-weight: 400;

        color: ${({ theme }) => theme.palette.text.darkGray};
      }
    }
  }
`;

export const CardStyled = styled(Card)`
  h4 {
    font-size: 1.25rem;
    font-weight: 600;
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;

    gap: 1rem;
  }
`;

export const CardItemStyled = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  gap: 0.5rem;

  strong {
    font-size: 1rem;
    font-weight: 600;
  }

  span {
    font-size: 1rem;
    font-weight: 400;
  }
`;
