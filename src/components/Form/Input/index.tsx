import React from 'react';
import { useFormContext } from 'react-hook-form';

import * as S from './styles';

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  className?: string;
  required?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
  value?: string;
  type?: string;
}

const Input: React.FC<InputProps> = ({
  name,
  label,
  className,
  required,
  autoFocus,
  ...rest
}) => {
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

      <S.Input hasError={!!errors[name]} {...rest} {...register(name)} />

      {errors[name]?.message && (
        <S.ErrorMessage>{errors[name]?.message?.toString()}</S.ErrorMessage>
      )}
    </S.Container>
  );
};

export default Input;
