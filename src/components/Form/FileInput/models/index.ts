export interface FileInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  accept: string;
  label?: string;
  className?: string;
  required?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
}
