import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  padding: 1.25rem;
  gap: 1rem;

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
  border-radius: 0.25rem;

  padding: 1.25rem;
  gap: 1rem;
`;

export const Title = styled.span`
  text-align: center;
  font-size: 1.125rem;
  font-weight: bold;

  color: #666;
`;
