import * as Yup from 'yup';

export const schema = Yup.object().shape({
  reportedActivities: Yup.string()
    .required('O campo Atividades do dia é obrigatório')
    .min(10, 'As atividades declaradas são muito curtas'),
  comments: Yup.string(),
});
