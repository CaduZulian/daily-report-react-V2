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

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  position: relative;

  background-color: ${({ theme }) => theme.palette.background.white};
  border-radius: 0.5rem;

  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);

  padding: 1.5rem;
  gap: 1.5rem;

  [data-tooltip] {
    position: absolute;
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
    width: 200px;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 4px 8px;
    border-radius: 4px;
    background: #080a14;
    color: #ffffff;
    z-index: 99;
  }

  [data-tooltip]:hover:before,
  [data-tooltip]:hover:after {
    display: block;
    opacity: 1;
  }

  [data-tooltip][data-flow='bottom']::before {
    top: 100%;
    border-top-width: 0;
    border-bottom-color: #080a14;
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

  [data-tooltip='']::after,
  [data-tooltip='']::before {
    display: none !important;
  }
`;

export const CardItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  width: 100%;

  gap: 1rem;
`;

export const ButtonsGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;

  button {
    width: fit-content;
  }
`;

export const Helper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;

  right: 1.5rem;
  top: 1.5rem;

  img {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export const Title = styled.span`
  text-align: center;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  font-weight: 500;

  color: ${({ theme }) => theme.palette.text.dark};
`;

export const LineTitle = styled.span`
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
