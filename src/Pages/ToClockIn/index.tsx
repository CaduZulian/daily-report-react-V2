import { useEffect } from 'react';
import { Helmet } from 'react-helmet';

import { Container, Row } from './styles';

// components
import { CardForm } from './components/CardForm';
import { CardDetails } from './components/CardDetails';

// contexts
import { useForm } from '@/context/useForm';

export const ToClockIn = () => {
  const { getReportsInDay } = useForm();

  useEffect(() => {
    getReportsInDay(new Date());
  }, []);

  return (
    <Container>
      <Helmet>
        <title>Relatório diário - Bater Ponto</title>
      </Helmet>

      <Row>
        <CardDetails />

        <CardForm />
      </Row>
    </Container>
  );
};
