import { useFormContext } from 'react-hook-form';

import * as S from './styles';

import { InputProps } from './models';

export const Input = ({
  name,
  label,
  className,
  required,
  autoFocus,
  ...rest
}: InputProps) => {
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
