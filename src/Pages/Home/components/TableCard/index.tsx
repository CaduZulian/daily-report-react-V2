import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { FormStyled } from './styles';
import { Title } from '../../styles';

import { Button, Card, DatePicker, Table } from '@/components';

import { tableColumns } from './constants';

import { useForm as useCustomForm } from '@/context';

import { useDailyReport } from '@/hooks';

import {
  IEditDailyReportModalProps,
  IFilters,
  IShowDailyReportModalProps,
} from './models';
import { EditDailyReportModal, ShowDailyReportModal } from '../Modal';

export const TableCard = () => {
  const { generateTxtFile } = useCustomForm();
  const { useGetDailyReportList } = useDailyReport();

  const [showDailyReportModalProps, setShowDailyReportModalProps] =
    useState<IShowDailyReportModalProps>({
      isOpen: false,
      dailyReport: undefined,
    });
  const [editDailyReportModalProps, setEditDailyReportModalProps] =
    useState<IEditDailyReportModalProps>({
      isOpen: false,
      dailyReport: undefined,
    });
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
      handleEdit: (data) => {
        setEditDailyReportModalProps({
          isOpen: true,
          dailyReport: data,
        });
      },
      handleShow: (data) => {
        setShowDailyReportModalProps({
          isOpen: true,
          dailyReport: data,
        });
      },
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

      <ShowDailyReportModal
        isOpen={showDailyReportModalProps.isOpen}
        dailyReport={showDailyReportModalProps.dailyReport}
        onClose={() => {
          setShowDailyReportModalProps({
            isOpen: false,
            dailyReport: undefined,
          });
        }}
      />

      <EditDailyReportModal
        isOpen={editDailyReportModalProps.isOpen}
        dailyReport={editDailyReportModalProps.dailyReport}
        onClose={() => {
          setEditDailyReportModalProps({
            isOpen: false,
            dailyReport: undefined,
          });
        }}
      />
    </Card>
  );
};
