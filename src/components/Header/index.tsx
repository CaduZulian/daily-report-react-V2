import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import {
  ButtonsGroupStyled,
  HeaderContainerStyled,
  LogoStyled,
  ProfileButtonStyled,
  ProfileMenuStyled,
} from './styles';

import LogoIcon from '@/assets/icons/logo.svg';

import { LinkButton } from '@/components';
import { ImportExportReportModal } from './components';

import { useAuth } from '@/context';

export const Header = () => {
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const profileButtonRef = useRef<HTMLButtonElement>(null);

  const { user, signOut } = useAuth();

  const [profileMenuIsOpen, setProfileMenuIsOpen] = useState(false);
  const [importExportReportModalIsOpen, setImportExportReportModalIsOpen] =
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
            <h1>Relatório diário</h1>
          </LogoStyled>
        </Link>

        <ButtonsGroupStyled>
          <LinkButton
            onClick={() =>
              setImportExportReportModalIsOpen((prevState) => !prevState)
            }
          >
            Importar/exportar base
          </LinkButton>

          <Link to='/bater-ponto'>
            <LinkButton tabIndex={-1}>Bater ponto</LinkButton>
          </Link>

          <ProfileButtonStyled
            ref={profileButtonRef}
            menuIsOpen={profileMenuIsOpen}
            onClick={() => setProfileMenuIsOpen((prevState) => !prevState)}
          >
            <img src={user?.avatar} alt='avatar' />
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
            <button
              onClick={() => setProfileMenuIsOpen((prevState) => !prevState)}
            >
              Minha conta
            </button>
          </Link>

          <button className='sign-out' onClick={() => signOut()}>
            Sair
          </button>
        </div>
      </ProfileMenuStyled>

      <ImportExportReportModal
        isOpen={importExportReportModalIsOpen}
        onClose={() =>
          setImportExportReportModalIsOpen((prevState) => !prevState)
        }
      />
    </HeaderContainerStyled>
  );
};
