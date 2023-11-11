import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;

  height: fit-content;
  background-color: ${({ theme }) => theme.palette.main.blue};

  padding: 1rem;

  div.container {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;

    // for ultra wide monitors
    max-width: 2000px;
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  cursor: pointer;

  img {
    height: 2.5rem;
  }

  span {
    font-weight: 500;
    font-family: sans-serif;
    font-size: 1.5rem;

    color: ${({ theme }) => theme.palette.text.light};
  }
`;

export const ButtonsGroup = styled.div`
  display: flex;

  gap: 1rem;
`;
