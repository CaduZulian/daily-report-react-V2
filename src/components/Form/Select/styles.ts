import styled, { css } from 'styled-components';
import Select from 'react-select';

export const Container = styled.div`
  width: 100%;
`;

export const LabelContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;

  margin-bottom: 5px;
`;

export const Label = styled.label`
  font-size: 1rem;
  line-height: 150%;
  color: #212121;
`;

export const Required = styled.span`
  font-size: 12px;
  line-height: 150%;
  color: #9e9e9e;
`;

export const SelectInput = styled(Select)<{ hasError?: boolean }>`
  .react-select__control {
    min-height: 40px;
    border-radius: 8px;
    border-size: 1px;
    border-color: ${({ hasError, theme }) =>
      hasError ? theme.palette.status.red : theme.palette.border.light};

    @media screen and (min-width: 768px) {
      &:hover {
        border-size: 1px;
        border-color: ${({ hasError, theme }) =>
          hasError ? theme.palette.status.red : theme.palette.border.light};
      }
    }

    &--is-focused {
      border-color: ${({ hasError, theme }) =>
        hasError ? theme.palette.status.red : theme.palette.main.primary};
      box-shadow: none;

      @media screen and (min-width: 768px) {
        &:hover {
          border-color: ${({ hasError, theme }) =>
            hasError ? theme.palette.error.main : theme.palette.primary.main};
          border-size: 1px;
        }
      }
    }

    .react-select__value-container {
      padding: 0 14px;

      .react-select__single-value {
        color: #000000;
      }
    }
  }

  .react-select__indicator-separator {
    visibility: hidden;
  }

  .react-select__indicator {
    padding: 5px;

    ${({ hasError, theme }) =>
      hasError &&
      css`
        color: ${theme.palette.status.red};

        @media screen and (min-width: 768px) {
          &:hover {
            color: ${theme.palette.status.red};
          }
        }
      `}
  }

  .react-select__loading-indicator span {
    font-size: 0.75rem;
    background-color: ${({ theme }) => theme.palette.text.light};
  }

  .react-select__option {
    background-color: ${({ theme }) => theme.palette.background.white};

    &--is-selected {
      background-color: ${({ theme }) => theme.palette.main.primary};
    }

    @media screen and (min-width: 768px) {
      &--is-focused:not(.react-select__option--is-selected),
      &:hover:not(.react-select__option--is-selected) {
        background-color: #ebeded;
      }
    }
  }

  .react-select__multi-value__label {
    background: ${({ theme }) => theme.palette.main.primary};
    color: ${({ theme }) => theme.palette.background.white};
  }
  .react-select__multi-value__remove {
    background: ${({ theme }) => theme.palette.status.red};
    color: ${({ theme }) => theme.palette.background.white};
  }
`;

export const ErrorMessage = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.palette.status.red};
`;
