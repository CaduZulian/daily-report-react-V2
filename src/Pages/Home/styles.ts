import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  padding: 2rem;
  gap: 2rem;

  // for ultra wide monitors
  max-width: 2000px;
`;

export const Row = styled.div`
  display: flex;

  gap: 1rem;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;

  gap: 1rem;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;

  background-color: ${({ theme }) => theme.palette.background.white};
  border-radius: 0.5rem;

  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);

  padding: 1.5rem;
  gap: 1.5rem;
`;

export const Title = styled.h4`
  text-align: center;
  font-size: 1.125rem;
  font-weight: bold;

  color: #666;
`;
