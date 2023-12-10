import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;

  border: 1px solid ${({ theme }) => theme.palette.border.light};
  border-radius: 0.5rem;

  @media screen and (max-width: 960px) {
    border: none;
  }

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: rgba(0, 0, 0, 0.2);
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  @media screen and (max-width: 960px) {
    gap: 4px;
  }
`;

export const TableStyled = styled.table`
  margin: 0;
  border: none;
  border-collapse: collapse;
`;

export const THeadStyled = styled.thead`
  border-bottom: 1px solid ${({ theme }) => theme.palette.border.light};

  td {
    strong {
      font-size: 1rem;
      font-weight: 600;
      line-height: 150%;
    }
  }
`;

export const TBodyStyled = styled.tbody``;

export const Row = styled.tr`
  + tr {
    border-top: 1px solid ${({ theme }) => theme.palette.border.light};
  }
`;

export const Column = styled.td`
  border: none;
  padding: 0.75rem 1rem;

  span {
    overflow: hidden;
    overflow-wrap: break-word;

    font-style: normal;
    font-weight: 400;
    font-size: 1rem;
    line-height: 137.5%;

    color: ${({ theme }) => theme.palette.text.darkBlue};
  }
`;

export const Cell = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  span {
    text-align: right;

    font-style: normal;
    font-weight: 400;
    font-size: 1rem;
    line-height: 150%;

    color: ${({ theme }) => theme.palette.text.darkBlue};
  }

  .title {
    text-align: left;

    font-style: normal;
    font-weight: 500;
    font-size: 1rem;
    line-height: 137.5%;

    color: ${({ theme }) => theme.palette.text.darkBlue};
  }
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  width: 100%;
  gap: 8px;

  background: ${({ theme }) => theme.palette.background.white};
  border: 1px solid ${({ theme }) => theme.palette.border.light};
  border-radius: 4px;

  transition: all 0.2s ease-in;

  :hover {
    cursor: pointer;
    background-color: ${({ theme }) => `${theme.palette.background.light}dd`};
  }
`;
