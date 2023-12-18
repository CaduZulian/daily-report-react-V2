import { addHours, format } from 'date-fns';

import {
  CardItem,
  Container,
  LineTitle,
  LineValue,
  List,
  ListItem,
} from './styles';

import { Modal } from '@/components';

import { ShowDailyReportModalProps } from './models';

export const ShowDailyReportModal = ({
  isOpen,
  onClose,
  dailyReport,
}: ShowDailyReportModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Detalhes do ponto: ${dailyReport?.currentDate
        .toDate()
        .toLocaleDateString('pt-BR')}`}
    >
      <Container>
        {dailyReport ? (
          <>
            <CardItem>
              <LineTitle>Entradas:</LineTitle>
              <List>
                {dailyReport?.entry.map(({ horary }, index) => {
                  return (
                    <ListItem key={horary + 'entry' + index}>
                      {index + 1}º entrada: {horary}
                    </ListItem>
                  );
                })}
              </List>
            </CardItem>

            <CardItem>
              <LineTitle>Saídas:</LineTitle>
              <List>
                {dailyReport?.leaves.map(({ horary }, index) => {
                  return (
                    <ListItem key={horary + 'leaves' + index}>
                      {index + 1}º saída: {horary}
                    </ListItem>
                  );
                })}
              </List>
            </CardItem>

            {dailyReport.hoursInDay ? (
              <CardItem>
                <LineTitle>Horas do dia:</LineTitle>
                <LineValue>
                  {format(
                    addHours(
                      new Date(dailyReport?.hoursInDay),
                      new Date().getTimezoneOffset() / 60,
                    ),
                    'HH:mm',
                  )}
                </LineValue>
              </CardItem>
            ) : null}

            {dailyReport?.reportedActivities && (
              <CardItem>
                <LineTitle>Atividades do dia:</LineTitle>
                <List>
                  {dailyReport?.reportedActivities?.split('\n').map((item) => {
                    return <ListItem key={item}>{item}</ListItem>;
                  })}
                </List>
              </CardItem>
            )}

            {dailyReport?.comments && (
              <CardItem>
                <LineTitle>Observações:</LineTitle>
                <LineValue>{dailyReport?.comments}</LineValue>
              </CardItem>
            )}
          </>
        ) : (
          <div
            style={{ display: 'flex', width: '100%', justifyContent: 'center' }}
          >
            <LineValue>Nenhuma atividade foi registrada nesse dia</LineValue>
          </div>
        )}
      </Container>
    </Modal>
  );
};
