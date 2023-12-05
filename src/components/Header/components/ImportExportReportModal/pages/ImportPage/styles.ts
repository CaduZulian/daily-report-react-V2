import styled from 'styled-components';

export const ImportPageContainerStyled = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`;

export const ImportPageFormStyled = styled.form`
  display: flex;
  flex-direction: column;

  gap: 1rem;

  width: 100%;

  span {
    font-size: 1rem;
    font-weight: 400;
    line-height: 150%;

    color: ${({ theme }) => theme.palette.text.dark};

    a {
      text-decoration: none;
      font-weight: 500;

      color: ${({ theme }) => theme.palette.main.primary};
    }
  }
`;

export const ImportPageButtonsGroupStyled = styled.div`
  display: flex;
  flex-direction: column;

  gap: 1rem;
  margin-top: 0.5rem;

  width: 100%;

  button {
    width: 100%;
  }
`;
