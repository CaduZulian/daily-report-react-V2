import styled from 'styled-components';

export const MainStyled = styled.main`
  display: flex;
  width: 100vw;
  height: calc(100vh - 72px);
  background: ${({ theme }) => theme.palette.background.lightGray};

  justify-content: center;

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
