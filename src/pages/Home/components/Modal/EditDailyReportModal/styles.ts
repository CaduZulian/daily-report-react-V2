import styled from 'styled-components';

export const EditDailyReportFormStyled = styled.form`
  display: flex;
  flex-direction: column;

  gap: 1rem;

  width: 100%;
`;

export const EditDailyReportInputGroupStyled = styled.div`
  display: flex;
  flex-direction: column;

  gap: 0.5rem;

  width: 100%;

  .title {
    display: flex;
    justify-content: space-between;

    h4 {
      font-size: 1.25rem;
      font-weight: 400;
      line-height: 150%;
      color: ${({ theme }) => theme.palette.text.dark};
    }

    button {
      display: flex;
      align-items: center;

      font-size: 1rem;
      font-weight: 400;
      line-height: 150%;
      color: ${({ theme }) => theme.palette.text.dark};

      padding: 0.25rem 0.5rem;
      gap: 0.5rem;

      border: 1px solid ${({ theme }) => theme.palette.border.light};
      border-radius: 0.5rem;

      transition: all 0.2s ease-in;

      svg {
        font-size: 1.5rem;
      }

      &:hover {
        background-color: ${({ theme }) => theme.palette.background.lightGray};
      }
    }
  }

  .input-group {
    display: flex;
    gap: 0.75rem;

    button {
      display: flex;
      align-items: center;
      width: fit-content;
      height: fit-content;

      margin-top: 1.75rem;

      color: ${({ theme }) => theme.palette.status.red};

      padding: 0.5rem;

      border: 1px solid ${({ theme }) => theme.palette.status.red};
      border-radius: 0.5rem;

      transition: all 0.2s ease-in;

      svg {
        font-size: 1.5rem;
      }

      &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }

      &:hover {
        background-color: ${({ theme }) => theme.palette.status.lightRed};
      }
    }
  }
`;

export const EditDailyReportButtonsGroupStyled = styled.div`
  display: flex;
  flex-direction: column;

  gap: 1rem;

  margin-top: 0.5rem;

  width: 100%;

  button {
    width: 100%;
  }
`;
