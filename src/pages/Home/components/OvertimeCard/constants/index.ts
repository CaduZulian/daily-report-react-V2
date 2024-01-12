import theme from '@/styles/theme';

export const filters = {
  startDate: new Date(new Date(new Date().setHours(0, 0, 0, 0)).setDate(1)),
  endDate: new Date(
    new Date(new Date().setDate(1)).setMonth(new Date().getMonth() + 1) -
      1000 * 60 * 60 * 24,
  ),
};

export const data = {
  labels: [
    'Percentual de horas feitas / total estimado',
    'Percentual faltante',
  ],
  datasets: [
    {
      backgroundColor: [
        theme.palette.action.primary,
        `${theme.palette.action.primary}90`,
      ],
    },
  ],
};

export const config: any = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
    },
    title: {
      display: true,
      font: {
        size: 18,
      },
      padding: {
        bottom: 20,
      },
    },
  },
};
