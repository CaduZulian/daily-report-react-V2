import * as Yup from 'yup';

export const importPageSchema = Yup.object().shape({
  file: Yup.mixed().required('O campo Planilha de ponto é obrigatório'),
});
