import styled from 'styled-components';

export const CheckBoxContainer = styled.div<{
  check: boolean;
  disabled: boolean;
}>`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  width: fit-content;

  cursor: ${({ disabled }) => (disabled ? 'block' : 'pointer')};

  > div.checkbox {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 16px;
    height: 16px;

    border-radius: 50%;
    background: ${({ theme, check }) =>
      check
        ? theme.palette.background.darkGreen
        : theme.palette.text.lightGray};

    > svg {
      width: 50%;
      color: #ffffff;
    }
  }

  > p.check-text {
    margin-left: 0.5rem;

    font-family: sans-serif;
    font-size: 1rem;
    line-height: 140%;

    color: ${({ theme }) => theme.palette.text.dark};
  }
`;
