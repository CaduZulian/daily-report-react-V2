import { ReactDatePickerProps } from 'react-datepicker';

export interface DatePickerProps
  extends Omit<ReactDatePickerProps, 'onChange'> {
  name: string;
  label?: string;
  required?: boolean;
  defaultValue?: Date | [Date, Date] | null;
}
