import styled from 'styled-components';

export const ContainerStyled = styled.main`
  display: flex;
  width: 100vw;
  height: 100vh;

  background: ${({ theme }) => theme.palette.background.lightGray};
`;

export const LeftSideStyled = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 50%;
  height: 100vh;

  gap: 1rem;

  background: ${({ theme }) => theme.palette.background.darkBlue};

  h1 {
    font-size: 2rem;
    font-weight: 600;
    line-height: 140%;

    color: ${({ theme }) => theme.palette.text.light};
  }

  span {
    font-size: 1.25rem;
    font-weight: 400;
    line-height: 150%;

    color: ${({ theme }) => theme.palette.text.lightGray};
  }
`;

export const RightSideStyled = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 50%;
  height: 100vh;

  background: ${({ theme }) => theme.palette.background.lightGray};

  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: rgba(0, 0, 0, 0.2);
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;
