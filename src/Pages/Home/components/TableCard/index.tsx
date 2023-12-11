import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { FormStyled } from './styles';
import { Card, Title } from '../../styles';

import { Button, DatePicker, Table } from '@/components';

import { tableColumns } from './constants';

import { useForm as useCustomForm } from '@/context';

import { useDailyReport } from '@/hooks';

import { IFilters } from './models';

export const TableCard = () => {
  const { generateTxtFile } = useCustomForm();
  const { useGetDailyReportList } = useDailyReport();

  const [filters, setFilters] = useState<IFilters>({
    startDate: new Date(new Date(new Date().setHours(0, 0, 0, 0)).setDate(1)),
    endDate: new Date(
      new Date(new Date().setDate(1)).setMonth(new Date().getMonth() + 1) -
        1000 * 60 * 60 * 24,
    ),
  });

  const filterForm = useForm({
    defaultValues: {
      startDate: filters.startDate,
      endDate: filters.endDate,
    },
  });

  const getDailyReportList = useGetDailyReportList({ filters });

  const columns = tableColumns({
    actions: {
      handleDownload: (e) => {
        generateTxtFile(e);
      },
      handleEdit: () => {},
      handleShow: () => {},
    },
  });

  const handleFilter = (data: IFilters) => {
    setFilters(data);
  };

  return (
    <Card>
      <Title>Relatórios disponíveis para download</Title>

      <FormProvider {...filterForm}>
        <FormStyled onSubmit={filterForm.handleSubmit(handleFilter)}>
          <DatePicker name='startDate' label='Data inicial' />

          <DatePicker name='endDate' label='Data final' />

          <Button type='submit'>Filtrar</Button>
        </FormStyled>
      </FormProvider>

      <Table columns={columns} data={getDailyReportList.data} />
    </Card>
  );
};
