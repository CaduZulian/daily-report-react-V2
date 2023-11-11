import { useState } from 'react';
import { Link } from 'react-router-dom';

import { ButtonsGroup, HeaderContainer, Logo } from './styles';

// components
import { Button } from '../Button';
import { ModalDownloadReport } from './components/ModalDownloadReport';

// icons
import LogoIcon from '../../assets/icons/logo.png';

export const Header = () => {
  const [modalDownloadReportIsOpen, setModalDownloadReportIsOpen] =
    useState(false);

  return (
    <HeaderContainer>
      <div className='container'>
        <Link to='/home'>
          <Logo>
            <img src={LogoIcon} alt='logo' />
            <span>Relatório diário</span>
          </Logo>
        </Link>

        <ButtonsGroup>
          <Button onClick={() => setModalDownloadReportIsOpen(true)}>
            Baixar relatório
          </Button>

          <Link to='/bater-ponto'>
            <Button tabIndex={-1}>Bater ponto</Button>
          </Link>
        </ButtonsGroup>
      </div>

      <ModalDownloadReport
        open={modalDownloadReportIsOpen}
        onClose={() => setModalDownloadReportIsOpen(false)}
      />
    </HeaderContainer>
  );
};
