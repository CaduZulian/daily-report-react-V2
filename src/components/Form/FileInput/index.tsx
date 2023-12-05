import { useRef } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { FiUpload } from 'react-icons/fi';

import * as S from './styles';

import { FileInputProps } from './models';

export const FileInput = ({
  name,
  label,
  disabled,
  className,
  required,
  accept,
  autoFocus,
  ...rest
}: FileInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    control,
    formState: { errors },
  } = useFormContext();

  function handleOnFocusInput() {
    inputRef.current?.click();
  }

  return (
    <S.Container className={className}>
      <S.LabelContainer>
        {label && <S.Label htmlFor={name}>{label}</S.Label>}
        {required && <S.Required>Obrigatório</S.Required>}
      </S.LabelContainer>

      <Controller
        control={control}
        name={name}
        render={({ field: { ref, value, onChange, ...field } }) => (
          <S.Input
            tabIndex={0}
            id='fileInput'
            onClick={() => handleOnFocusInput()}
            disabled={disabled}
          >
            <S.IconWrapper hasValue={!!value}>
              <FiUpload />
            </S.IconWrapper>

            <span>
              {value
                ? `${value.name} adicionado`
                : 'Clique para inserir um arquivo'}
            </span>

            <input
              id={name}
              ref={inputRef}
              accept={accept}
              value={value?.fileName}
              onChange={(event: any) => {
                onChange(event.target.files[0]);
              }}
              disabled={disabled}
              type='file'
              aria-label='File browser example'
              {...rest}
              {...field}
            />
          </S.Input>
        )}
      />

      {errors[name]?.message && (
        <S.ErrorMessage>{errors[name]?.message?.toString()}</S.ErrorMessage>
      )}
    </S.Container>
  );
};

export default FileInput;
