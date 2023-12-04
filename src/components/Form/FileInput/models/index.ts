export interface FileInputProps {
  name: string;
  value: any;
  accept: string;
  onChange: (value: any) => void;
  label?: string;
  className?: string;
  required?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
}
