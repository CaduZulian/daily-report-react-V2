import React from 'react';
import { useFormContext } from 'react-hook-form';

import * as S from './styles';

interface ITextArea extends React.HTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  className?: string;
  required?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
  value?: string;
  type?: string;
}

export const TextArea = ({
  name,
  label,
  className,
  required,
  ...rest
}: ITextArea) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <S.Container className={className}>
      <S.LabelContainer>
        {label && <S.Label htmlFor={name}>{label}</S.Label>}
        {required && <S.Required>Obrigatório</S.Required>}
      </S.LabelContainer>

      <S.TextArea hasError={!!errors[name]} {...rest} {...register(name)} />

      {errors[name]?.message && (
        <S.ErrorMessage>{errors[name]?.message?.toString()}</S.ErrorMessage>
      )}
    </S.Container>
  );
};
