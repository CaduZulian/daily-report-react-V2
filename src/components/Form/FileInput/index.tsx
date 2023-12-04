import { useRef, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { FiUpload } from 'react-icons/fi';

import * as S from './styles';

import { FileInputProps } from './models';

export const FileInput = ({
  name,
  label,
  onChange,
  disabled,
  className,
  required,
  accept,
  autoFocus,
  value,
  ...rest
}: FileInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    formState: { errors },
  } = useFormContext();

  function handleOnFocusInput() {
    inputRef.current?.click();
  }

  useEffect(() => {
    if (
      inputRef.current &&
      inputRef.current.value !== '' &&
      value === undefined
    ) {
      inputRef.current.value = '';
    }
  }, [value]);

  return (
    <S.Container className={className}>
      <S.LabelContainer>
        {label && <S.Label htmlFor={name}>{label}</S.Label>}
        {required && <S.Required>Obrigatório</S.Required>}
      </S.LabelContainer>

      <S.Input
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
          onChange={(event) => {
            onChange && onChange(event);
          }}
          disabled={disabled}
          type='file'
          aria-label='File browser example'
          {...rest}
          // {...register(name)}
        />
      </S.Input>

      {errors[name]?.message && (
        <S.ErrorMessage>{errors[name]?.message?.toString()}</S.ErrorMessage>
      )}
    </S.Container>
  );
};

export default FileInput;
