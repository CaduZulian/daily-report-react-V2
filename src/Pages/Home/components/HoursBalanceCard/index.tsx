import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

import theme from '../../../../styles/theme';
import { Card } from '../../styles';
import {
  CardsGroup,
  ChartsGroup,
  ExpectedHoursCard,
  WorkedHoursCard,
} from './styles';

// context
import { useDownload } from '@/context';
import { DailyReport } from '@/context/useForm/models';

export const HoursBalanceCard = () => {
  const { getDaysOfMonth, getDaysOfWeek } = useDownload();

  function getData(type: string) {
    let dates: string[] = [];

    if (type === 'weekly') {
      dates = getDaysOfWeek();
    } else if (type === 'monthly') {
      dates = getDaysOfMonth();
    }

    let totalHours = 0;

    if (type === 'weekly') {
      totalHours = 40;
    } else if (type === 'monthly') {
      totalHours = 168;
    }

    let millisecondsDone = 0;

    for (let date of dates) {
      if (localStorage.getItem(date)) {
        const report: DailyReport = JSON.parse(localStorage.getItem(date)!);

        if (report?.hoursInDay) {
          millisecondsDone = millisecondsDone + report?.hoursInDay;
        }
      }
    }

    const result = (100 / totalHours) * (millisecondsDone / 1000 / 60 / 60);
    const remain = 100 - result < 0 ? 0 : 100 - result;

    return {
      data: [result, remain],
      totalHours: totalHours,
      workedHours: (millisecondsDone / 1000 / 60 / 60).toFixed(2),
    };
  }

  const data = {
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

  const config: any = {
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

  return (
    <Card>
      <ChartsGroup>
        <div>
          <Doughnut
            options={{
              ...config,
              plugins: {
                ...config.plugins,
                title: {
                  ...config.plugins.title,
                  text: 'Saldo de horas (semanal)',
                },
              },
            }}
            data={{
              ...data,
              datasets: [{ ...data.datasets[0], data: getData('weekly').data }],
            }}
          />

          <CardsGroup>
            <WorkedHoursCard>
              {getData('weekly').workedHours} horas trabalhadas
            </WorkedHoursCard>
            <ExpectedHoursCard>
              {getData('weekly').totalHours} horas previstas
            </ExpectedHoursCard>
          </CardsGroup>
        </div>

        <div>
          <Doughnut
            options={{
              ...config,
              plugins: {
                ...config.plugins,
                title: {
                  ...config.plugins.title,
                  text: 'Saldo de horas (mensal)',
                },
              },
            }}
            data={{
              ...data,
              datasets: [
                { ...data.datasets[0], data: getData('monthly').data },
              ],
            }}
          />

          <CardsGroup>
            <WorkedHoursCard>
              {getData('monthly').workedHours} horas trabalhadas
            </WorkedHoursCard>
            <ExpectedHoursCard>
              {getData('monthly').totalHours} horas previstas
            </ExpectedHoursCard>
          </CardsGroup>
        </div>
      </ChartsGroup>
    </Card>
  );
};
