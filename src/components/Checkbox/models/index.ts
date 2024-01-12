export interface CheckboxProps {
  checked: boolean;
  disabled?: boolean;
  onClick: (event: boolean) => void;
  label?: string;
}
