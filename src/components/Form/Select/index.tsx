import React, { useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Props as ReactSelectProps } from 'react-select';

import * as S from './styles';

interface SelectProps extends ReactSelectProps {
  name: string;
  options: Array<{ label: string; value: string }>;
  onChange?: (option: any) => void;
  value?: { label: string; value: string };
  isLoading?: boolean;
  className?: string;
  label?: string;
  required?: boolean;
}

const Select: React.FC<SelectProps> = ({
  name,
  className,
  label,
  required,
  defaultValue,
  ...rest
}) => {
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

export default Select;
