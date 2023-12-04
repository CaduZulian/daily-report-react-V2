import { useFormContext, Controller } from 'react-hook-form';
import ReactDatePicker from 'react-datepicker';
import { ptBR } from 'date-fns/locale';

import 'react-datepicker/dist/react-datepicker.css';
import * as S from './styles';

import { DateInput } from './components';

import { DatePickerProps } from './models';

export const DatePicker = ({
  name,
  label,
  required,
  defaultValue,
  disabled,
  ...rest
}: DatePickerProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <S.Container>
      <S.LabelContainer>
        {label && <S.Label htmlFor={name}>{label}</S.Label>}

        {required && <S.Required>Obrigatório</S.Required>}
      </S.LabelContainer>

      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        disabled={disabled}
        render={({ field: { onChange, value, name } }) => (
          <ReactDatePicker
            dateFormat='dd/MM/yyyy'
            locale={ptBR}
            autoComplete='off'
            selected={value}
            onChange={onChange}
            customInput={<DateInput hasError={!!errors[name]} />}
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
