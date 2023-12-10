import 'chart.js/auto';
import { useCallback, useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';

import { Card } from '../../styles';
import {
  CardsGroup,
  ChartsGroup,
  ExpectedHoursCard,
  WorkedHoursCard,
} from './styles';

import { filters, config, data } from './constants';

import { useDownload } from '@/context';

import { useDailyReport, useUser } from '@/hooks';

import { getSignedUser } from '@/utils';

export const OvertimeCard = () => {
  const signedUser = getSignedUser();

  const { getDaysOfMonth, getDaysOfWeek } = useDownload();
  const { useGetDailyReportList } = useDailyReport();
  const { useGetUserById } = useUser();

  const getDailyReportList = useGetDailyReportList({
    filters,
  });
  const getUserById = useGetUserById({
    userId: signedUser?.id ?? '',
  });

  const getData = useCallback(
    (type: 'weekly' | 'monthly') => {
      let dates: string[] = [];

      if (type === 'weekly') {
        dates = getDaysOfWeek();
      } else if (type === 'monthly') {
        dates = getDaysOfMonth();
      }

      let totalHours = 0;

      if (type === 'weekly') {
        totalHours = getUserById.data?.metadata.weeklyHours || 40;
      } else if (type === 'monthly') {
        totalHours = getUserById.data?.metadata.monthlyHours || 168;
      }

      let millisecondsDone = 0;

      dates.forEach((date) => {
        const dateParts = date.split('/').map((part) => Number(part));

        const currentDate = getDailyReportList.data?.find(
          ({ currentDate }) =>
            currentDate.toDate().getTime() ===
            new Date(dateParts[2], dateParts[1] - 1, dateParts[0]).getTime(),
        );

        if (currentDate?.hoursInDay) {
          millisecondsDone = millisecondsDone + currentDate?.hoursInDay;
        }
      });

      const result = (100 / totalHours) * (millisecondsDone / 1000 / 60 / 60);
      const remain = 100 - result < 0 ? 0 : 100 - result;

      return {
        data: [result, remain],
        totalHours: totalHours,
        workedHours: (millisecondsDone / 1000 / 60 / 60).toFixed(2),
      };
    },
    [JSON.stringify(getDailyReportList.data), JSON.stringify(getUserById.data)],
  );

  const arrayData = useMemo(() => {
    return {
      weekly: getData('weekly'),
      monthly: getData('monthly'),
    };
  }, [
    JSON.stringify(getDailyReportList.data),
    JSON.stringify(getUserById.data),
  ]);

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
              datasets: [{ ...data.datasets[0], data: arrayData.weekly.data }],
            }}
          />

          <CardsGroup>
            <WorkedHoursCard>
              {arrayData.weekly.workedHours} horas trabalhadas
            </WorkedHoursCard>
            <ExpectedHoursCard>
              {arrayData.weekly.totalHours} horas previstas
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
              datasets: [{ ...data.datasets[0], data: arrayData.monthly.data }],
            }}
          />

          <CardsGroup>
            <WorkedHoursCard>
              {arrayData.monthly.workedHours} horas trabalhadas
            </WorkedHoursCard>
            <ExpectedHoursCard>
              {arrayData.monthly.totalHours} horas previstas
            </ExpectedHoursCard>
          </CardsGroup>
        </div>
      </ChartsGroup>
    </Card>
  );
};
