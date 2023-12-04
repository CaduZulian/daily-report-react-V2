export interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  className?: string;
  required?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
  value?: string;
  type?: string;
}
