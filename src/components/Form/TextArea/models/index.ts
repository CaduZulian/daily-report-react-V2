export interface TextAreaProps
  extends React.HTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  className?: string;
  required?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
  value?: string;
  type?: string;
}
