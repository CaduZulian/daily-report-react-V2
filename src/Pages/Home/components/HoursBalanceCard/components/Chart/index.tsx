import 'chart.js/auto';
import { Line } from 'react-chartjs-2';

import theme from '@/styles/theme';

import { useDownload } from '@/context';

import { IChart, IFilters } from './models';
import { useDailyReport, useUser } from '@/hooks';
import { useEffect, useMemo, useState } from 'react';
import { getSignedUser } from '@/utils';

export const Chart = ({ currentPeriod }: IChart) => {
  const signedUser = getSignedUser();

  const { getDaysOfMonth, getDaysOfWeek } = useDownload();
  const { useGetDailyReportList } = useDailyReport();
  const { useGetUserById } = useUser();

  const [filters, setFilters] = useState<IFilters>();

  const getUserById = useGetUserById({
    userId: signedUser?.id,
  });
  const getDailyReportList = useGetDailyReportList({
    filters,
  });

  const labels = useMemo(() => {
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
  }, [currentPeriod]);

  const arrayData = useMemo(() => {
    let data: number[] = [];

    if (labels.includes('Janeiro')) {
      for (let monthIndex = 0; monthIndex < labels.length; monthIndex++) {
        const daysOfMonth = new Date(
          new Date().getFullYear(),
          monthIndex + 1,
          0,
        ).getDate();

        let hoursInMonth = 0;

        for (let day = 1; day <= daysOfMonth; day++) {
          const currentData = getDailyReportList.data?.find(
            ({ currentDate }) =>
              currentDate.toDate().getTime() ===
              new Date(new Date().getFullYear(), monthIndex, day).getTime(),
          );

          if (currentData?.hoursInDay) {
            hoursInMonth =
              hoursInMonth + currentData?.hoursInDay / 1000 / 60 / 60;
          }
        }

        data[monthIndex] =
          hoursInMonth - (getUserById.data?.metadata.monthlyHours || 168);
      }
    } else {
      for (let i = 0; i < labels.length; i++) {
        const date = labels[i].split('/').map((item) => Number(item));

        const currentData = getDailyReportList.data?.find(({ currentDate }) => {
          return (
            currentDate.toDate().getTime() ===
            new Date(date[2], date[1] - 1, date[0]).getTime()
          );
        });

        if (currentData?.hoursInDay !== undefined) {
          data[i] =
            currentData.hoursInDay / 1000 / 60 / 60 -
            (getUserById.data?.metadata.dailyHours || 8);
        }
      }
    }

    return data;
  }, [
    labels,
    JSON.stringify(getDailyReportList.data),
    JSON.stringify(getUserById.data),
  ]);

  const config = useMemo(
    () => ({
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
            text: `Período (${labels.includes('Janeiro') ? 'meses' : 'dias'})`,
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: `Tempo (${labels.includes('Janeiro') ? 'horas' : 'minutos'})`,
          },
          ticks: {
            beginAtZero: true,
            stepSize: labels.includes('Janeiro') ? 1 : 60,
          },
        },
      },
    }),
    [labels],
  );

  const data = useMemo(
    () => ({
      labels: labels,
      datasets: [
        {
          data: arrayData,
          borderColor: `#0000`,
          fill: {
            above: theme.palette.action.primary,
            below: theme.palette.status.red,
            target: { value: 0 },
          },
          tension: 0.5,
        },
      ],
    }),
    [labels, arrayData],
  );

  useEffect(() => {
    if (labels.includes('Janeiro')) {
      setFilters({
        startDate: new Date(new Date(new Date().setMonth(0)).setDate(1)),
        endDate: new Date(
          new Date(new Date(new Date().setMonth(0)).setDate(1)).setFullYear(
            new Date().getFullYear() + 1,
          ) -
            1000 * 60 * 60 * 24,
        ),
      });
    } else {
      const start = labels[0].split('/').map((item) => Number(item));
      const end = labels
        .at(-1)!
        .split('/')
        .map((item) => Number(item));

      setFilters({
        startDate: new Date(start[2], start[1] - 1, start[0]),
        endDate: new Date(end[2], end[1] - 1, end[0]),
      });
    }
  }, [labels]);

  return <Line options={config} data={data} />;
};
