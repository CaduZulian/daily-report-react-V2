import { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  EditDailyReportButtonsGroupStyled,
  EditDailyReportFormStyled,
} from './styles';

import { Button, MaskedInput, Modal, TextArea } from '@/components';

import { useDailyReport, useUser } from '@/hooks';

import { EditDailyReportModalProps, IEditDailyReportForm } from './models';

import { editDailyReportSchema } from './validation';

export const EditDailyReportModal = ({
  isOpen,
  onClose,
  dailyReport,
}: EditDailyReportModalProps) => {
  const editDailyReportForm = useForm<IEditDailyReportForm>({
    resolver: yupResolver(editDailyReportSchema),
  });

  const { usePutUpdateDailyReport } = useDailyReport();

  const putUpdateDailyReport = usePutUpdateDailyReport();

  const handleSubmit = async (data: IEditDailyReportForm) => {
    if (!dailyReport) return;

    const response = await putUpdateDailyReport.updateDailyReport({
      id: dailyReport.id,
      data: {
        ...data,
        reportedActivities: data.reportedActivities,
        comments: data.comments,
      },
    });

    if (response) {
      onClose();
    }
  };

  useEffect(() => {
    if (!isOpen) {
      editDailyReportForm.reset();
    } else if (dailyReport) {
      editDailyReportForm.reset({
        reportedActivities: dailyReport.reportedActivities,
        comments: dailyReport.comments,
      });
    }
  }, [dailyReport, isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Editar ponto: ${dailyReport?.currentDate
        .toDate()
        .toLocaleDateString('pt-BR')}`}
    >
      <FormProvider {...editDailyReportForm}>
        <EditDailyReportFormStyled
          onSubmit={editDailyReportForm.handleSubmit(handleSubmit)}
        >
          <TextArea name='reportedActivities' label='Atividades do dia' />

          <TextArea name='comments' label='Observações' />

          <EditDailyReportButtonsGroupStyled>
            <Button>Confirmar</Button>

            <Button type='button' variant='secondary' onClick={onClose}>
              Cancelar
            </Button>
          </EditDailyReportButtonsGroupStyled>
        </EditDailyReportFormStyled>
      </FormProvider>
    </Modal>
  );
};
