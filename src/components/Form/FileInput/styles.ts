import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.25rem;
`;

export const LabelContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
`;

export const Label = styled.label`
  font-size: 1rem;
  line-height: 150%;
  color: #212121;
`;

export const Required = styled.span`
  font-size: 0.75rem;
  line-height: 150%;
  color: #9e9e9e;
`;

export const IconWrapper = styled.div<{ hasValue: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  width: 2rem;
  height: 2rem;

  background: ${({ theme, hasValue }) =>
    hasValue ? theme.palette.background.lightGray : theme.palette.primary.main};
`;

export const Input = styled.div<{ hasError?: boolean; disabled?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  padding: 0.5rem 0;

  min-height: 140px;

  &.holding {
    background: ${({ theme }) => theme.palette.opacity.green};
  }

  border: dashed 1px
    ${({ hasError, theme }) =>
      hasError ? theme.palette.status.red : theme.palette.border.light};
  border-radius: 0.5rem;

  span {
    max-width: 80%;
    margin-top: 0.5rem;
    font-size: 1rem;
    line-height: 150%;
    text-align: center;
    color: #818798;

    + span {
      margin: 0;
    }
  }

  input[type='file'] {
    display: none;
  }

  ${({ disabled }) =>
    disabled &&
    css`
      background: #f3f5f7;
      cursor: default;
    `};
`;

export const ErrorMessage = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.palette.error.main};
`;
