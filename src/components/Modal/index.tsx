import React from 'react';

import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';

import { Container, Content, CloseButton, ModalTitle } from './styles';

import { GrClose } from 'react-icons/gr';

interface IModal extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactElement;
  cancellable?: boolean;
  className?: string;
}

export const Modal: React.FC<IModal> = ({
  open,
  onClose,
  title,
  children,
  cancellable = true,
  ...rest
}) => {
  const handleClose = (_: any, reason: string) => {
    if (
      !cancellable &&
      (reason === 'backdropClick' || reason === 'escapeKeyDown')
    ) {
      return false;
    }

    onClose();
  };

  return (
    <>
      <Container
        {...rest}
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{
          backdrop: Backdrop,
        }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Content className={rest.className ? rest.className : 'modal-md'}>
            {cancellable && (
              <CloseButton type='button' onClick={() => onClose()}>
                <GrClose />
              </CloseButton>
            )}

            {title && <ModalTitle>{title}</ModalTitle>}

            {children && children}
          </Content>
        </Fade>
      </Container>
    </>
  );
};

export default Modal;
