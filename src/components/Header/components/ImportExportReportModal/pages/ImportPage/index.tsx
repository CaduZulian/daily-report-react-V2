import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  ImportPageButtonsGroupStyled,
  ImportPageContainerStyled,
  ImportPageFormStyled,
} from './styles';

import { Button, FileInput } from '@/components';

import { ImportPageProps, IImportPageForm } from './models';

import { importPageSchema } from './validation';

export const ImportPage = ({ onClose }: ImportPageProps) => {
  const importModelUrl = import.meta.env.VITE_IMPORT_MODEL_URL;

  const importPageForm = useForm({
    resolver: yupResolver(importPageSchema),
  });

  const handleSubmit = (data: IImportPageForm) => {
    console.log(data);
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
