import { useFormContext } from 'react-hook-form';

import * as S from './styles';
import theme from '@/styles/theme';

import { InputProps } from './models';

export const MaskedInput = ({
  name,
  label,
  className,
  mask,
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
