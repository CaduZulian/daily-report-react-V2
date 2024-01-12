import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  gap: 1rem;
`;

export const CardItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const LineTitle = styled.strong`
  font-size: 1rem;
  font-weight: 600;

  color: ${({ theme }) => theme.palette.text.dark};
`;

export const LineValue = styled.span`
  font-size: 1rem;
  font-weight: 400;

  color: ${({ theme }) => theme.palette.text.dark};
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ListItem = styled.li`
  font-size: 1rem;
  font-weight: 400;

  color: ${({ theme }) => theme.palette.text.dark};
`;
