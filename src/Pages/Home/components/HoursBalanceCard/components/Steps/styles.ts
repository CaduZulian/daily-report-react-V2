import styled from 'styled-components';

export const ButtonsGroup = styled.div`
  display: flex;
  position: relative;
  align-items: center;

  gap: 0.5rem;
`;

export const BackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
`;

export const BackgroundButtons = styled.div`
  padding: 0.5rem;
  border-radius: 2rem;
  height: 100%;

  z-index: 1;

  background-color: ${({ theme }) => theme.palette.background.darkBlue};
  color: transparent;

  transition: all 0.2s ease-in;
`;

export const StepButtons = styled.button<{ active: boolean }>`
  display: flex;

  z-index: 2;
  transition: all 0.2s ease-in;

  padding: 0.5rem;
  border-radius: 2rem;

  font-size: 1rem;
  font-weight: 600;

  background-color: transparent;
  color: ${({ theme, active }) =>
    active ? theme.palette.text.light : theme.palette.background.darkBlue};
`;
