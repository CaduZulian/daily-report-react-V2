import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import Excel from 'exceljs';

import {
  ImportPageButtonsGroupStyled,
  ImportPageContainerStyled,
  ImportPageFormStyled,
} from './styles';

import { Button, FileInput } from '@/components';

import { useForm as useCustomForm } from '@/context';

import { ImportPageProps, IImportPageForm } from './models';

import { importPageSchema } from './validation';

export const ImportPage = ({ onClose }: ImportPageProps) => {
  const importModelUrl = import.meta.env.VITE_IMPORT_MODEL_URL;

  const { uploadData, getHoursInDay } = useCustomForm();

  const importPageForm = useForm<IImportPageForm>({
    resolver: yupResolver(importPageSchema) as any,
  });

  const handleSubmit = async (data: IImportPageForm) => {
    const accDailyReport: any[] = [];

    const workbook = new Excel.Workbook();
    const reader = new FileReader();
    reader.readAsArrayBuffer(data.file);

    await new Promise((resolve) => {
      reader.onload = () => {
        const buffer = reader.result as Buffer;

        workbook.xlsx.load(buffer).then(() => {
          const worksheet = workbook.getWorksheet(1);

          worksheet?.eachRow((row, rowNumber) => {
            if (rowNumber > 1) {
              const currentDateSplit = row
                .getCell(1)
                .value?.toString()
                .split('/')
                .map((item) => Number(item));

              const dailyReport = {
                currentDate: currentDateSplit
                  ? new Date(
                      currentDateSplit[2],
                      currentDateSplit[1] - 1,
                      currentDateSplit[0],
                    )
                  : undefined,
                entry: row.getCell(2).value
                  ? [{ horary: row.getCell(2).value?.toString() || '' }]
                  : [],
                leaves: row.getCell(3).value
                  ? [{ horary: row.getCell(3).value?.toString() || '' }]
                  : [],
                hoursInDay: 0,
                reportedActivities: row.getCell(4).value?.toString(),
                comments: row.getCell(5).value?.toString(),
              };

              dailyReport.hoursInDay =
                getHoursInDay(dailyReport.entry, dailyReport.leaves) ?? 0;

              if (dailyReport.currentDate) {
                if (
                  accDailyReport.some(
                    (item) =>
                      item.currentDate?.getTime() ===
                      dailyReport.currentDate?.getTime(),
                  )
                ) {
                  if (dailyReport.entry || dailyReport.leaves) {
                    const index = accDailyReport.findIndex(
                      (item) =>
                        item.currentDate?.getTime() ===
                        dailyReport.currentDate?.getTime(),
                    );

                    if (dailyReport.entry.length) {
                      accDailyReport[index].entry = [
                        ...accDailyReport[index].entry,
                        ...dailyReport.entry,
                      ];
                    }

                    if (dailyReport.leaves.length) {
                      accDailyReport[index].leaves = [
                        ...accDailyReport[index].leaves,
                        ...dailyReport.leaves,
                      ];
                    }

                    accDailyReport[index].hoursInDay =
                      getHoursInDay(
                        accDailyReport[index].entry,
                        accDailyReport[index].leaves,
                      ) ?? 0;
                  }
                } else {
                  accDailyReport.push(dailyReport);
                }
              }

              resolve(accDailyReport);
            }
          });
        });
      };
    });

    toast.info('Importando dados...');

    for (const dailyReport of accDailyReport) {
      await uploadData(dailyReport, true);
    }

    toast.success('Dados importados com sucesso!');

    onClose();
  };

  return (
    <ImportPageContainerStyled>
      <FormProvider {...importPageForm}>
        <ImportPageFormStyled
          onSubmit={importPageForm.handleSubmit(handleSubmit)}
        >
          <FileInput label='Planilha de ponto' name='file' accept='.xlsx' />

          <span>
            Precisa de ajuda? Baixe o{' '}
            <a href={importModelUrl} target='_blank'>
              modelo de planilha
            </a>{' '}
            e tenha certeza de usar o arquivo correto.
          </span>

          <ImportPageButtonsGroupStyled>
            <Button>Confirmar</Button>
            <Button type='button' variant='secondary' onClick={onClose}>
              Cancelar
            </Button>
          </ImportPageButtonsGroupStyled>
        </ImportPageFormStyled>
      </FormProvider>
    </ImportPageContainerStyled>
  );
};
