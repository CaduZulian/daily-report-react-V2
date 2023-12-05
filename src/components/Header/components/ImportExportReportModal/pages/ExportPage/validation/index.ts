import * as Yup from 'yup';

export const exportPageSchema = Yup.object().shape({
  startDate: Yup.string().required('O campo Data inicial é obrigatório'),
  endDate: Yup.string().required('O campo Data final é obrigatório'),
});
