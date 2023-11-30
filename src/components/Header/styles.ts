import styled from 'styled-components';

export const HeaderContainerStyled = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  width: 100%;
  height: fit-content;
  background-color: ${({ theme }) => theme.palette.main.primary};

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  div.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;

    width: 100%;

    // for ultra wide monitors
    max-width: 2000px;
  }
`;

export const LogoStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  cursor: pointer;

  img {
    height: 2.5rem;
  }

  h1 {
    font-weight: 600;
    font-size: 2rem;
    line-height: 150%;

    color: ${({ theme }) => theme.palette.text.light};
  }
`;

export const ButtonsGroupStyled = styled.div`
  display: flex;
  align-items: center;

  gap: 1.5rem;
`;

export const ProfileButtonStyled = styled.button<{ menuIsOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;

  height: fit-content;
  width: fit-content;

  border-radius: 50%;

  cursor: pointer;

  transition: all 0.2s ease-in;

  img {
    height: 2.5rem;
    width: 2.5rem;

    border-radius: 50%;
  }

  &:hover {
    filter: opacity(0.85);
  }
`;

export const ProfileMenuStyled = styled.div<{ open: boolean }>`
  display: ${({ open }) => (open ? 'flex' : 'none')};
  flex-direction: column;
  align-items: flex-end;

  z-index: 9;

  position: absolute;
  top: 4.5rem;
  right: 2rem;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  background-color: ${({ theme }) => theme.palette.background.light};
  border-radius: 0.5rem;

  padding: 1rem;
  gap: 1rem;

  transition: all 0.2s ease-in;

  > ::after {
    content: '';

    position: absolute;
    top: -0.25rem;
    right: calc(2rem / 2);

    width: 0.5rem;
    height: 0.5rem;

    background-color: ${({ theme }) => theme.palette.background.light};

    transform: rotate(45deg);
  }

  hr {
    width: 100%;

    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.palette.border.light};
  }

  .profile-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    span {
      font-weight: 500;
      font-size: 1rem;

      color: ${({ theme }) => theme.palette.text.dark};
    }

    img {
      height: 2rem;
      width: 2rem;

      border-radius: 50%;
    }
  }

  .profile-actions {
    display: flex;
    flex-direction: column;

    gap: 0.5rem;

    width: 100%;

    button {
      font-size: 0.875rem;

      padding: 0.5rem 1rem;
      width: 100%;

      background-color: ${({ theme }) => theme.palette.background.lightGray};
      color: ${({ theme }) => theme.palette.text.dark};

      border-radius: 0.5rem;

      transition: all 0.2s ease-in;

      &.sign-out {
        background-color: ${({ theme }) => theme.palette.status.red};
        color: ${({ theme }) => theme.palette.text.light};
      }

      &:hover {
        filter: opacity(0.7);
      }
    }
  }
`;
