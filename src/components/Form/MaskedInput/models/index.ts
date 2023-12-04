export interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  className?: string;
  mask: string;
  maskChar?: string | null;
  required?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
}
