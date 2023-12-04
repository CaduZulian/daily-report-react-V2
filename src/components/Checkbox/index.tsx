import { useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';

import { CheckBoxContainer } from './styles';

import { CheckboxProps } from './models';

export const Checkbox = ({
  checked,
  disabled,
  onClick,
  label,
}: CheckboxProps) => {
  useEffect(() => {
    if (disabled && checked) {
      onClick(false);
    }
  }, [disabled]);

  return (
    <CheckBoxContainer
      tabIndex={0}
      check={checked}
      disabled={disabled}
      onClick={() => !disabled && onClick(!checked)}
      onKeyDown={(e) => e.key === 'Enter' && !disabled && onClick(!checked)}
    >
      <div className='checkbox'>{checked && <FaCheck />}</div>
      <p className='check-text'>{label}</p>
    </CheckBoxContainer>
  );
};
