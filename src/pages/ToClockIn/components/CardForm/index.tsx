import { useState } from 'react';
import { FormProvider, useForm as HookFormUseForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { ButtonsGroup, CardStyled, Form } from '../../styles';

import { useForm } from '@/context/useForm';

import { TextArea } from '@/components/Form';
import { Checkbox, Button } from '@/components';

import { schema } from '../../validators';

export const CardForm = () => {
  const [checkIsOfficeHourFinished, setCheckIsOfficeHourFinished] =
    useState(false);

  const formData = HookFormUseForm({
    resolver: checkIsOfficeHourFinished ? yupResolver(schema) : undefined,
  });

  const { reportsInDay, uploadData, generateTxtFile } = useForm();

  async function handleSubmit(data: Record<string, string>) {
    const response = await uploadData({
      comments: data.comments,
      reportedActivities: data.reportedActivities,
    });

    if (response?.reportedActivities && checkIsOfficeHourFinished) {
      generateTxtFile(response);
    }
  }

  return (
    <CardStyled>
      <FormProvider {...formData}>
        <Form onSubmit={formData.handleSubmit(handleSubmit)}>
          <TextArea
            label='Atividades do dia'
            name='reportedActivities'
            defaultValue={reportsInDay?.reportedActivities}
            disabled={!checkIsOfficeHourFinished}
          />

          <TextArea
            label='Observações'
            name='comments'
            defaultValue={reportsInDay?.comments}
            disabled={!checkIsOfficeHourFinished}
          />

          <Checkbox
            label='Fim de expediente?'
            checked={checkIsOfficeHourFinished}
            disabled={
              reportsInDay?.entry.length === reportsInDay?.leaves.length
            }
            onClick={(e) => setCheckIsOfficeHourFinished(e)}
          />

          <ButtonsGroup>
            <Button>Enviar</Button>
          </ButtonsGroup>
        </Form>
      </FormProvider>
    </CardStyled>
  );
};