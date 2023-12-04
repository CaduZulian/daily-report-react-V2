import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  ExportPageButtonsGroupStyled,
  ExportPageContainerStyled,
  ExportPageFormStyled,
} from './styles';

import { Button, DatePicker, TextArea } from '@/components';

import { ExportPageProps, IExportPageForm } from './models';

import { exportPageSchema } from './validation';

export const ExportPage = ({ onClose }: ExportPageProps) => {
  const exportPageForm = useForm({
    resolver: yupResolver(exportPageSchema),
  });

  const handleSubmit = (data: IExportPageForm) => {
    console.log(data);
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
            defaultValue={new Date()}
          />

          <DatePicker
            label='Data final'
            name='endDate'
            defaultValue={new Date()}
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
