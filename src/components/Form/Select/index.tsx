import { useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';

import * as S from './styles';

import { SelectProps } from './models';

export const Select = ({
  name,
  className,
  label,
  required,
  defaultValue,
  ...rest
}: SelectProps) => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    if (defaultValue) setValue(name, defaultValue);
  }, [name, defaultValue, setValue]);

  return (
    <S.Container className={className}>
      <S.LabelContainer>
        {label && <S.Label htmlFor={name}>{label}</S.Label>}
        {required && <S.Required>Obrigatório</S.Required>}
      </S.LabelContainer>

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value, name } }) => (
          <S.SelectInput
            classNamePrefix='react-select'
            value={value}
            onChange={onChange}
            defaultValue={defaultValue}
            noOptionsMessage={() => 'Nenhuma opção disponível'}
            hasError={!!errors[name]}
            {...rest}
          />
        )}
      />

      {errors[name]?.message && (
        <S.ErrorMessage>{errors[name]?.message?.toString()}</S.ErrorMessage>
      )}
    </S.Container>
  );
};
