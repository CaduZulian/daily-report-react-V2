import Modal from '@mui/material/Modal';
import styled from 'styled-components';

export const Container = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: pre-wrap;

  .modal-fullscreen {
    width: 100%;
    height: 100%;
  }

  .modal-fit {
    width: fit-content;
    max-height: 80%;
  }

  .modal-md {
    width: 40%;
    max-height: 80%;
  }

  .modal-lg {
    width: 60%;
    max-height: 90%;
  }

  .label-alone {
    display: block;
    font-size: 1rem;
    color: ${({ theme }) => theme.palette.lightGray};
    margin: 20px 0;
    font-weight: 700;
  }

  @media only screen and (max-width: 1024px) {
    .modal-md,
    .modal-lg {
      width: 95%;
      max-height: 95%;
    }

    .modal-fullscreen {
      border-radius: 0;
      max-width: 100%;
      width: 100%;
      max-height: 100%;
      height: 100%;
    }
  }
`;

export const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0.75rem;
  background: ${({ theme }) => theme.palette.background.white};
  overflow-y: auto;

  padding: 1.5rem;
  gap: 1.5rem;

  @media only screen and (max-width: 1024px) {
    & {
      max-width: 95%;
      width: 95%;
      max-height: 95%;
    }
  }
`;

export const CloseButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;

  top: 1.5rem;
  right: 1.5rem;
  width: 2rem;
  height: 2rem;

  border: 0;
  background: transparent;

  border-radius: 50%;

  transition: all 0.2s ease-in;

  svg {
    width: 1.5rem;
    height: 1.5rem;
    color: ${({ theme }) => theme.palette.text.dark};
  }

  &:hover {
    background-color: ${({ theme }) => theme.palette.background.lightGray};
  }
`;

export const ModalTitle = styled.h3`
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 150%;

  text-align: center;
  color: ${({ theme }) => theme.palette.text.dark};
`;
