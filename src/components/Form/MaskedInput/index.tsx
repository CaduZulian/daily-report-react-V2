import React from 'react';
import { useFormContext } from 'react-hook-form';

import * as S from './styles';
import theme from '@/styles/theme';

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  className?: string;
  mask: string;
  maskChar?: string | null;
  required?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
}

const MaskedInput: React.FC<InputProps> = ({
  name,
  label,
  className,
  mask,
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

      <S.Input
        mask={mask}
        maskChar={null}
        style={{
          border: `solid 1px ${
            errors[name]?.message
              ? theme.palette.status.red
              : theme.palette.border.light
          }`,
        }}
        {...register(name)}
        {...rest}
      />

      {errors[name]?.message && (
        <S.ErrorMessage>{errors[name]?.message?.toString()}</S.ErrorMessage>
      )}
    </S.Container>
  );
};

export default MaskedInput;
