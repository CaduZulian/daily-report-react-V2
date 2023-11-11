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
    font-size: 16px;
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
  border-radius: 12px;
  background: ${({ theme }) => theme.palette.background.white};
  overflow-y: auto;

  padding: 24px 40px;

  @media only screen and (max-width: 1024px) {
    & {
      max-width: 95%;
      width: 95%;
      max-height: 95%;
      height: '95%';
    }
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  border: 0;
  background: transparent;

  svg {
    font-size: 25px;
  }
`;

export const ModalTitle = styled.h2`
  font-family: sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 125%;

  text-align: center;
  color: ${({ theme }) => theme.palette.text.dark};
  margin-bottom: 24px;
`;
