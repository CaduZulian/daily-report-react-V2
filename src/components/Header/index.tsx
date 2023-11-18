import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';

import {
  ButtonsGroupStyled,
  HeaderContainerStyled,
  LogoStyled,
  ProfileButtonStyled,
  ProfileMenuStyled,
} from './styles';

import { Button } from '../Button';
import { ModalDownloadReport } from './components/ModalDownloadReport';

import LogoIcon from '@/assets/icons/logo.png';

import { useAuth } from '@/context';

export const Header = () => {
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const profileButtonRef = useRef<HTMLButtonElement>(null);

  const { user, signOut } = useAuth();

  const [profileMenuIsOpen, setProfileMenuIsOpen] = useState(false);
  const [modalDownloadReportIsOpen, setModalDownloadReportIsOpen] =
    useState(false);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(event.target as Node)
      ) {
        setProfileMenuIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <HeaderContainerStyled>
      <div className='container'>
        <Link to='/home'>
          <LogoStyled>
            <img src={LogoIcon} alt='logo' />
            <span>Relatório diário</span>
          </LogoStyled>
        </Link>

        <ButtonsGroupStyled>
          <Button onClick={() => setModalDownloadReportIsOpen(true)}>
            Baixar relatório
          </Button>

          <Link to='/bater-ponto'>
            <Button tabIndex={-1}>Bater ponto</Button>
          </Link>

          <ProfileButtonStyled
            ref={profileButtonRef}
            menuIsOpen={profileMenuIsOpen}
            onClick={() => setProfileMenuIsOpen((prevState) => !prevState)}
          >
            <img src={user?.avatar} alt='avatar' />

            <div className='close-menu'>
              <IoClose />
            </div>
          </ProfileButtonStyled>
        </ButtonsGroupStyled>
      </div>

      <ProfileMenuStyled ref={profileMenuRef} open={profileMenuIsOpen}>
        <div className='profile-info'>
          <img src={user?.avatar} alt='avatar' />

          <span>{user?.name}</span>
        </div>

        <hr />

        <div className='profile-actions'>
          <Link to='/perfil'>
            <button>Minha conta</button>
          </Link>

          <button className='sign-out' onClick={() => signOut()}>
            Sair
          </button>
        </div>
      </ProfileMenuStyled>

      <ModalDownloadReport
        open={modalDownloadReportIsOpen}
        onClose={() => setModalDownloadReportIsOpen(false)}
      />
    </HeaderContainerStyled>
  );
};
