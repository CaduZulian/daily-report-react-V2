import { useEffect } from 'react';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FiPlus, FiTrash } from 'react-icons/fi';

import {
  EditDailyReportButtonsGroupStyled,
  EditDailyReportFormStyled,
  EditDailyReportInputGroupStyled,
} from './styles';

import { useForm as useFormContext } from '@/context';

import { Button, MaskedInput, Modal, TextArea } from '@/components';

import { useDailyReport } from '@/hooks';

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

  const { getHoursInDay } = useFormContext();

  const {
    fields: entriesFields,
    append: entriesAppend,
    remove: entriesRemove,
  } = useFieldArray({
    control: editDailyReportForm.control,
    name: 'entry',
  });

  const {
    fields: leavesFields,
    append: leavesAppend,
    remove: leavesRemove,
  } = useFieldArray({
    control: editDailyReportForm.control,
    name: 'leaves',
  });

  const { usePutUpdateDailyReport } = useDailyReport();

  const putUpdateDailyReport = usePutUpdateDailyReport();

  const handleSubmit = async (data: IEditDailyReportForm) => {
    if (!dailyReport) return;

    const hoursInDay = getHoursInDay(data.entry, data.leaves) ?? 0;

    const response = await putUpdateDailyReport.updateDailyReport({
      id: dailyReport.id,
      data: {
        ...data,
        hoursInDay,
      },
    });

    if (response) {
      onClose();
    }
  };

  useEffect(() => {
    if (!isOpen) {
      editDailyReportForm.reset();

      entriesRemove();
      leavesRemove();
    } else if (dailyReport) {
      entriesAppend(dailyReport.entry);
      leavesAppend(dailyReport.leaves);

      editDailyReportForm.reset({
        entry: dailyReport.entry,
        leaves: dailyReport.leaves,
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
          <EditDailyReportInputGroupStyled>
            <div className='title'>
              <h4>Entradas</h4>

              <button
                type='button'
                onClick={() => entriesAppend({ horary: '' })}
              >
                <FiPlus />
                Adicionar
              </button>
            </div>

            {entriesFields.map((field, index) => (
              <div className='input-group' key={field.id}>
                <MaskedInput
                  name={`entry.${index}.horary`}
                  label={`${index + 1}º entrada`}
                  defaultValue={field.horary}
                  mask='99:99'
                />

                <button
                  type='button'
                  onClick={() => entriesRemove(index)}
                  disabled={!!dailyReport?.entry?.[index]?.horary}
                >
                  <FiTrash />
                </button>
              </div>
            ))}
          </EditDailyReportInputGroupStyled>

          <EditDailyReportInputGroupStyled>
            <div className='title'>
              <h4>Saídas</h4>

              <button
                type='button'
                onClick={() => leavesAppend({ horary: '' })}
              >
                <FiPlus />
                Adicionar
              </button>
            </div>

            {leavesFields.map((field, index) => (
              <div className='input-group' key={field.id}>
                <MaskedInput
                  name={`leaves.${index}.horary`}
                  label={`${index + 1}º saída`}
                  defaultValue={field.horary}
                  mask='99:99'
                />

                <button
                  type='button'
                  onClick={() => leavesRemove(index)}
                  disabled={!!dailyReport?.leaves?.[index]?.horary}
                >
                  <FiTrash />
                </button>
              </div>
            ))}
          </EditDailyReportInputGroupStyled>

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
