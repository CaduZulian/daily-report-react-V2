import styled, { css } from 'styled-components';

export const Container = styled.div<{ maxHeight?: number }>`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;

  ${({ maxHeight }) =>
    maxHeight !== undefined
      ? css`
          max-height: ${maxHeight + 'px'};
          overflow-y: auto;
        `
      : css`
          height: fit-content;
        `}

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
border: none;
  border-collapse: collapse;
  margin: 0;
`;

export const THeadStyled = styled.thead`
  height: 40px;
  padding: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.border.light};
`;

export const TBodyStyled = styled.tbody`
  tr {
    transition: all 0.2s ease-in;

    :hover {
      background-color: ${({ theme }) => `${theme.palette.background.light}dd`};
    }
  }
`;

export const Row = styled.tr`
  height: 30px;

  + tr {
    border-top: 1px solid ${({ theme }) => theme.palette.border.light};
  }

  .actions {
    display: flex;
    height: 29px;
    width: 100%;

    gap: 8px;

    button {
      height: 29px;
      width: 29px;
    }

    /* ToolTip */
    [data-tooltip] {
      position: relative;
      cursor: pointer;
    }
    [data-tooltip]:before,
    [data-tooltip]:after {
      line-height: 1;
      font-size: 0.9em;
      pointer-events: none;
      position: absolute;
      box-sizing: border-box;
      display: none;
      opacity: 0;
    }
    [data-tooltip]:before {
      content: '';
      border: 5px solid transparent;
      z-index: 100;
    }
    [data-tooltip]:after {
      content: attr(data-tooltip);
      text-align: center;
      min-width: 3em;
      max-width: 21em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 2px 8px;
      border-radius: 4px;
      background: #111111;
      color: #ffffff;
      z-index: 99;
    }
    [data-tooltip]:hover:before,
    [data-tooltip]:hover:after {
      display: block;
      opacity: 1;
    }
    [data-tooltip]:not([data-flow])::before,
    [data-tooltip][data-flow='top']::before {
      bottom: 100%;
      border-bottom-width: 0;
      border-top-color: #111111;
    }
    [data-tooltip]:not([data-flow])::after,
    [data-tooltip][data-flow='top']::after {
      bottom: calc(100% + 5px);
    }
    [data-tooltip]:not([data-flow])::before,
    [tooltip]:not([data-flow])::after,
    [data-tooltip][data-flow='top']::before,
    [data-tooltip][data-flow='top']::after {
      left: 50%;
      -webkit-transform: translate(-50%, -4px);
      transform: translate(-50%, -4px);
    }
    [data-tooltip][data-flow='bottom']::before {
      top: 100%;
      border-top-width: 0;
      border-bottom-color: #111111;
    }
    [data-tooltip][data-flow='bottom']::after {
      top: calc(100% + 5px);
    }
    [data-tooltip][data-flow='bottom']::before,
    [data-tooltip][data-flow='bottom']::after {
      left: 50%;
      -webkit-transform: translate(-50%, 8px);
      transform: translate(-50%, 8px);
    }
    [data-tooltip][data-flow='left']::before {
      top: 50%;
      border-right-width: 0;
      border-left-color: #111111;
      left: calc(0em - 5px);
      -webkit-transform: translate(-8px, -50%);
      transform: translate(-8px, -50%);
    }
    [data-tooltip][data-flow='left']::after {
      top: 50%;
      right: calc(100% + 5px);
      -webkit-transform: translate(-8px, -50%);
      transform: translate(-8px, -50%);
    }
    [data-tooltip][data-flow='right']::before {
      top: 50%;
      border-left-width: 0;
      border-right-color: #111111;
      right: calc(0em - 5px);
      -webkit-transform: translate(8px, -50%);
      transform: translate(8px, -50%);
    }
    [data-tooltip][data-flow='right']::after {
      top: 50%;
      left: calc(100% + 5px);
      -webkit-transform: translate(8px, -50%);
      transform: translate(8px, -50%);
    }
    [data-tooltip='']::after,
    [data-tooltip='']::before {
      display: none !important;
    }
  }
`;

export const Column = styled.td`
  border: none;
  padding: 0 10px;

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
    line-height: 137.5%;

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
