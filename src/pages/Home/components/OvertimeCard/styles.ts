import styled from 'styled-components';

export const ChartsGroup = styled.div`
  display: flex;

  gap: 1rem;
`;

export const CardsGroup = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  gap: 0.5rem;
  margin-top: 1rem;
`;

export const WorkedHoursCard = styled.span`
  display: flex;

  background-color: ${({ theme }) => theme.palette.background.darkBlue};
  color: ${({ theme }) => theme.palette.text.light};

  padding: 0.5rem;
  border-radius: 2rem;

  font-size: 1rem;
  font-weight: 600;
`;

export const ExpectedHoursCard = styled.span`
  display: flex;

  color: ${({ theme }) => theme.palette.background.darkBlue};

  padding: 0.5rem;
  border-radius: 2rem;

  font-size: 1rem;
  font-weight: 600;
`;
