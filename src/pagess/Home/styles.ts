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

export const Title = styled.h4`
  text-align: center;
  font-size: 1.125rem;
  font-weight: bold;

  color: #666;
`;
