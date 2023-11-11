import { useEffect, useState } from 'react';
import { addHours, format } from 'date-fns';

import { Card, Title } from '../../styles';

// context
import { useDownload, useForm } from '@/context';
import { DailyReport } from '@/context/useForm/models';

// components
import Table from '@/components/Table';

export const TableCard = () => {
  const { downloadOfPeriod, getDaysOfMonth } = useDownload();
  const { generateTxtFile } = useForm();

  const [data, setData] = useState<DailyReport[]>([]);

  const columns = [
    {
      key: 'currentDate',
      label: 'Dia',
      cardOrder: 1,
    },
    {
      key: 'hoursInDay',
      label: 'Horas feitas',
      cardOrder: 2,
      render: (e: DailyReport) => {
        return e.hoursInDay
          ? format(
              addHours(
                new Date(e?.hoursInDay),
                new Date().getTimezoneOffset() / 60,
              ),
              'HH:mm',
            )
          : 0;
      },
    },
    {
      key: 'entry',
      label: 'Entradas',
      cardOrder: 3,
      render: (e: DailyReport) => {
        return e.entry
          .map(({ horary }) => {
            return horary;
          })
          .join(', ');
      },
    },
    {
      key: 'leaves',
      label: 'Saidas',
      cardOrder: 4,
      render: (e: DailyReport) => {
        return e.leaves
          .map(({ horary }) => {
            return horary;
          })
          .join(', ');
      },
    },
  ];

  const getData = () => {
    const days = getDaysOfMonth();

    let dataArray = [];

    for (let date of days) {
      if (localStorage.getItem(date)) {
        dataArray.push(JSON.parse(localStorage.getItem(date)!));
      }
    }

    setData(dataArray);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Card>
      <Title>Relatórios disponíveis do mês atual</Title>

      <Table
        tableKey='DAILY_REPORTS'
        columns={columns}
        data={data}
        onDownload={(e: DailyReport) => {
          downloadOfPeriod('daily', {
            downloadFunction: generateTxtFile,
            date: e.currentDate,
          });
        }}
      />
    </Card>
  );
};
