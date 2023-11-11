import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';

import theme from '@/styles/theme';

// context
import { useDownload } from '@/context';
import { DailyReport } from '@/context/useForm/models';

interface IChart {
  currentPeriod: number;
}

export const Chart = ({ currentPeriod }: IChart) => {
  const { getDaysOfMonth, getDaysOfWeek } = useDownload();

  function getData() {
    const dates = getLabels();

    let data: number[] = [];

    if (dates.includes('Janeiro')) {
      for (let monthIndex = 0; monthIndex < dates.length; monthIndex++) {
        const daysOfMonth = new Date(
          new Date().getFullYear(),
          monthIndex + 1,
          0,
        ).getDate();

        let hoursInMonth = 0;

        for (let day = 1; day <= daysOfMonth; day++) {
          const date = format(
            new Date(new Date().getFullYear(), monthIndex, day),
            'dd/MM/yyyy',
          );

          if (localStorage.getItem(date)) {
            const report: DailyReport = JSON.parse(localStorage.getItem(date)!);

            if (report?.hoursInDay) {
              hoursInMonth = hoursInMonth + report?.hoursInDay / 1000 / 60 / 60;
            }
          }
        }

        if (hoursInMonth - 168 > -168) {
          data[monthIndex] = hoursInMonth - 168;
        }
      }
    } else {
      for (let i = 0; i < dates.length; i++) {
        if (localStorage.getItem(dates[i])) {
          const report: DailyReport = JSON.parse(
            localStorage.getItem(dates[i])!,
          );

          if (report?.hoursInDay) {
            data[i] = report?.hoursInDay / 1000 / 60 - 8 * 60;
          }
        }
      }
    }

    return data;
  }

  function getLabels() {
    switch (currentPeriod) {
      case 0: {
        return getDaysOfWeek();
      }
      case 1: {
        return getDaysOfMonth();
      }
      case 2: {
        return [
          'Janeiro',
          'Fevereiro',
          'Março',
          'Abril',
          'Maio',
          'Junho',
          'Julho',
          'Agosto',
          'Setembro',
          'Outubro',
          'Novembro',
          'Dezembro',
        ];
      }
      default: {
        return getDaysOfWeek();
      }
    }
  }

  const data = {
    labels: getLabels(),
    datasets: [
      {
        data: getData(),
        borderColor: `#0000`,
        fill: {
          above: theme.palette.action.green,
          below: theme.palette.status.red,
          target: { value: 0 },
        },
        tension: 0.5,
      },
    ],
  };

  const config: any = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: `Período (${
            getLabels().includes('Janeiro') ? 'meses' : 'dias'
          })`,
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: `Tempo (${
            getLabels().includes('Janeiro') ? 'horas' : 'minutos'
          })`,
        },
        ticks: {
          beginAtZero: true,
          stepSize: getLabels().includes('Janeiro') ? 1 : 60,
        },
      },
    },
  };

  return <Line options={config} data={data} />;
};
