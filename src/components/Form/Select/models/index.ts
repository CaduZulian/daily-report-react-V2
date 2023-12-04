import { Props as ReactSelectProps } from 'react-select';

export interface SelectProps extends ReactSelectProps {
  name: string;
  options: Array<{ label: string; value: string }>;
  onChange?: (option: any) => void;
  value?: { label: string; value: string };
  isLoading?: boolean;
  className?: string;
  label?: string;
  required?: boolean;
}
