import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Excel from 'exceljs';
import JSZip from 'jszip';

import {
  ExportPageButtonsGroupStyled,
  ExportPageContainerStyled,
  ExportPageFormStyled,
} from './styles';

import { useForm as useFormContext } from '@/context';

import { Button, Checkbox, DatePicker } from '@/components';

import { useDailyReport } from '@/hooks';

import { DailyReport } from '@/@types';
import { ExportPageProps, IExportPageForm } from './models';

import { exportPageSchema } from './validation';

export const ExportPage = ({ onClose }: ExportPageProps) => {
  const { useGetAsyncDailyReportList } = useDailyReport();

  const { generateTxtFile } = useFormContext();

  const [isGenerateXlsxFile, setIsGenerateXlsxFile] = useState(false);

  const exportPageForm = useForm({
    resolver: yupResolver(exportPageSchema),
  });

  const getDailyReportList = useGetAsyncDailyReportList();

  const downloadXlsxFile = async (data: DailyReport[]) => {
    const newWorkBook = new Excel.Workbook();
    const newWorkSheet = newWorkBook.addWorksheet('Sheet1');
    newWorkSheet.columns = [
      { header: 'Data', key: 'currentDate', width: 10 },
      { header: 'Entradas', key: 'entry', width: 10 },
      { header: 'Saídas', key: 'leaves', width: 10 },
      {
        header: 'Horas no dia (millisegundos)',
        key: 'hoursInDay',
        width: 10,
      },
      { header: 'Atividades do dia', key: 'reportedActivities', width: 10 },
      { header: 'Observações', key: 'comments', width: 10 },
    ];

    newWorkSheet.getRow(1).font = { bold: true };
    newWorkSheet.getRow(1).alignment = {
      vertical: 'middle',
      horizontal: 'center',
    };
    newWorkSheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFD9D9D9' },
    };

    data.forEach(async (dailyReport) => {
      dailyReport.entry.forEach((entry: any, index: any) => {
        if (index > 0) {
          newWorkSheet.addRow({
            currentDate: dailyReport.currentDate.toDate().toLocaleDateString(),
            entry: entry?.horary,
            leaves: dailyReport?.leaves?.[index]?.horary,
          });
        } else {
          newWorkSheet.addRow({
            currentDate: dailyReport.currentDate.toDate().toLocaleDateString(),
            entry: entry.horary,
            leaves: dailyReport.leaves[index].horary,
            hoursInDay: dailyReport.hoursInDay,
            reportedActivities: dailyReport.reportedActivities,
            comments: dailyReport.comments,
          });
        }
      });
    });

    const buffer = await newWorkBook.xlsx.writeBuffer();

    const blob = new Blob([buffer], { type: 'application/vnd.ms-excel' });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'Relatório de horas.xlsx';
    link.click();
  };

  const downloadZipFile = (data: DailyReport[]) => {
    const zip = new JSZip();

    data.forEach((dailyReport) => {
      let txtFile = generateTxtFile(dailyReport, {
        isDownload: false,
      });

      let yearFolder = zip.folder(
        `${dailyReport.currentDate.toDate().getFullYear()}`,
      );
      let monthFolder = yearFolder?.folder(
        `${dailyReport.currentDate
          .toDate()
          .toLocaleString('pt-BR', { month: 'long' })}`,
      );

      monthFolder?.file(
        `dia ${dailyReport.currentDate.toDate().getDate()}.txt`,
        txtFile,
      );
    });

    zip.generateAsync({ type: 'blob' }).then((content) => {
      const url = window.URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Relatório de horas.zip';
      a.click();
    });
  };

  const handleSubmit = async (data: IExportPageForm) => {
    const response = await getDailyReportList.getData({
      filters: {
        startDate: new Date(new Date(data.startDate).setHours(0, 0, 0, 0)),
        endDate: new Date(new Date(data.endDate).setHours(23, 59, 59, 999)),
      },
    });

    if (response.data.length) {
      if (isGenerateXlsxFile) {
        downloadXlsxFile(response.data);
      } else {
        downloadZipFile(response.data);
      }
    }
  };

  return (
    <ExportPageContainerStyled>
      <FormProvider {...exportPageForm}>
        <ExportPageFormStyled
          onSubmit={exportPageForm.handleSubmit(handleSubmit)}
        >
          <DatePicker
            label='Data inicial'
            name='startDate'
            defaultValue={new Date(new Date().setHours(0, 0, 0, 0))}
          />

          <DatePicker
            label='Data final'
            name='endDate'
            defaultValue={new Date(new Date().setHours(23, 59, 59, 999))}
          />

          <Checkbox
            label='Gerar em formato .xlsx?'
            checked={isGenerateXlsxFile}
            onClick={(e) => setIsGenerateXlsxFile(e)}
          />

          <ExportPageButtonsGroupStyled>
            <Button>Exportar</Button>
            <Button type='button' variant='secondary' onClick={onClose}>
              Cancelar
            </Button>
          </ExportPageButtonsGroupStyled>
        </ExportPageFormStyled>
      </FormProvider>
    </ExportPageContainerStyled>
  );
};
