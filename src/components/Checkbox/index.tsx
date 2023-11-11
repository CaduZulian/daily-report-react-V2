import { useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';
import { CheckBoxContainer } from './styles';

interface ICheckbox {
  checked: boolean;
  disabled: boolean;
  onClick: (event: boolean) => void;
  label?: string;
}

export const Checkbox = ({ checked, disabled, onClick, label }: ICheckbox) => {
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
      onKeyPress={(e) => e.key === 'Enter' && !disabled && onClick(!checked)}
    >
      <div className='checkbox'>{checked && <FaCheck />}</div>
      <p className='check-text'>{label}</p>
    </CheckBoxContainer>
  );
};
