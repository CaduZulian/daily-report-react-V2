import * as Yup from 'yup';

export const editUserSchema = Yup.object().shape({
  dailyHours: Yup.string().required('O campo Horas diárias é obrigatório'),
  weeklyHours: Yup.string().required('O campo Horas semanais é obrigatório'),
  monthlyHours: Yup.string().required('O campo Horas mensais é obrigatório'),
  lunchHours: Yup.string().required('O campo Horas de almoço é obrigatório'),
});
