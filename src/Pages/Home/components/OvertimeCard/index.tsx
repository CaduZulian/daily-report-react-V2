import { useState } from 'react';

import { Container } from './styles';
import { Card, Title } from '../../styles';

// components
import { Chart } from './components/Chart';
import { Steps } from './components/Steps';

export const OvertimeCard = () => {
  const periods = ['weekly', 'monthly', 'yearly'];

  const [currentPeriod, setCurrentPeriod] = useState(0);

  return (
    <Card>
      <Container>
        <Title>Balanço de horas</Title>

        <Steps
          periods={periods}
          currentPeriod={currentPeriod}
          setCurrentPeriod={setCurrentPeriod}
        />

        <Chart currentPeriod={currentPeriod} />
      </Container>
    </Card>
  );
};
