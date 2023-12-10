import { addHours, format } from 'date-fns';
import HelperIcon from '@/assets/icons/help-circle.svg';

import {
  Card,
  CardItem,
  Helper,
  LineTitle,
  LineValue,
  List,
  ListItem,
  Title,
} from '../../styles';

import { useForm } from '@/context/useForm';

import { useUser } from '@/hooks';

import { getSignedUser } from '@/utils';

export const CardDetails = () => {
  const signedUser = getSignedUser();

  const { useGetUserById } = useUser();
  const { reportsInDay, leaveTime } = useForm();

  const getUserById = useGetUserById({ userId: signedUser?.id ?? '' });

  return (
    <Card>
      <Helper
        data-tooltip={
          !leaveTime
            ? 'Assim que você registrar uma nova entrada, uma sugestão de horário de saída será exibida aqui'
            : `Para atingir as ${
                getUserById.data?.metadata.dailyHours
                  ? getUserById.data?.metadata.dailyHours > 1
                    ? getUserById.data?.metadata.dailyHours + ' horas diárias'
                    : getUserById.data?.metadata.dailyHours + ' hora diária'
                  : '8 horas'
              }, você deve sair às ${leaveTime}`
        }
        data-flow='bottom'
      >
        <img src={HelperIcon} alt='ajuda' />
      </Helper>

      <Title>
        {reportsInDay?.currentDate.toDate().toLocaleDateString('pt-BR') ??
          format(new Date(), 'dd/MM/yyyy')}
      </Title>

      {reportsInDay ? (
        <>
          <CardItem>
            <LineTitle>Entradas:</LineTitle>
            <List>
              {reportsInDay?.entry.map(({ horary }, index) => {
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
              {reportsInDay?.leaves.map(({ horary }, index) => {
                return (
                  <ListItem key={horary + 'leaves' + index}>
                    {index + 1}º saída: {horary}
                  </ListItem>
                );
              })}
            </List>
          </CardItem>

          {reportsInDay.hoursInDay ? (
            <CardItem>
              <LineTitle>Horas do dia:</LineTitle>
              <LineValue>
                {format(
                  addHours(
                    new Date(reportsInDay?.hoursInDay),
                    new Date().getTimezoneOffset() / 60,
                  ),
                  'HH:mm',
                )}
              </LineValue>
            </CardItem>
          ) : null}

          {reportsInDay?.reportedActivities && (
            <CardItem>
              <LineTitle>Atividades do dia:</LineTitle>
              <List>
                {reportsInDay?.reportedActivities?.split('\n').map((item) => {
                  return <ListItem key={item}>{item}</ListItem>;
                })}
              </List>
            </CardItem>
          )}

          {reportsInDay?.comments && (
            <CardItem>
              <LineTitle>Observações:</LineTitle>
              <LineValue>{reportsInDay?.comments}</LineValue>
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
    </Card>
  );
};
