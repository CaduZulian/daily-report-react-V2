import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';

import { Container, Content, CloseButton, ModalTitle } from './styles';

import { FiX } from 'react-icons/fi';

import { ModalProps } from './models';

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  cancellable = true,
  ...rest
}: ModalProps) => {
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
        open={isOpen}
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
        <Fade in={isOpen}>
          <Content className={rest.className ? rest.className : 'modal-md'}>
            {cancellable && (
              <CloseButton type='button' onClick={() => onClose()}>
                <FiX />
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
