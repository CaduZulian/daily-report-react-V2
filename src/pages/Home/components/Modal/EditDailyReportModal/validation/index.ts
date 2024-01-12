import * as Yup from 'yup';

export const editDailyReportSchema = Yup.object().shape({
  entry: Yup.array()
    .of(
      Yup.object().shape({
        horary: Yup.string().required('O campo de entrada é obrigatório'),
      }),
    )
    .required('O campo de entrada é obrigatório'),
  leaves: Yup.array()
    .of(
      Yup.object().shape({
        horary: Yup.string().required('O campo de saída é obrigatório'),
      }),
    )
    .required('O campo de entrada é obrigatório'),
  reportedActivities: Yup.string()
    .required('O campo Atividades do dia é obrigatório')
    .min(10, 'As atividades declaradas são muito curtas'),
  comments: Yup.string(),
});
