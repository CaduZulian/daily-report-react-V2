import { Input } from './styles';

import { InputProps } from './models';

export const DateInput = ({ ...rest }: InputProps) => {
  return <Input mask='99/99/9999' maskChar={null} {...rest} />;
};
