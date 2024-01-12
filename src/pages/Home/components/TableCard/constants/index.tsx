import { FiDownload, FiEdit, FiEye } from 'react-icons/fi';
import { addHours, format } from 'date-fns';

import {
  TableActionsButtonStyled,
  TableActionsContainerStyled,
} from '../styles';

import { DailyReport } from '@/@types';
import { TableColumnsProps } from '../models';
import { ITableColumns } from '@/components/Table/models';

export const tableColumns: (props: TableColumnsProps) => ITableColumns[] = ({
  actions,
}) => [
  {
    key: 'currentDate',
    label: 'Dia',
    cardOrder: 1,
    render: (e: DailyReport) => {
      return e.currentDate.toDate().toLocaleDateString('pt-BR');
    },
  },
  {
    key: 'hoursInDay',
    label: 'Horas feitas',
    cardOrder: 2,
    render: (e: DailyReport) => {
      return e.hoursInDay
        ? format(
            addHours(
              new Date(e?.hoursInDay),
              new Date().getTimezoneOffset() / 60,
            ),
            'HH:mm',
          )
        : 0;
    },
  },
  {
    key: 'entry',
    label: 'Entradas',
    cardOrder: 3,
    render: (e: DailyReport) => {
      return e.entry
        .map(({ horary }) => {
          return horary;
        })
        .join(', ');
    },
  },
  {
    key: 'leaves',
    label: 'Saídas',
    cardOrder: 4,
    render: (e: DailyReport) => {
      return e.leaves
        .map(({ horary }) => {
          return horary;
        })
        .join(', ');
    },
  },
  {
    key: 'actions',
    label: '',
    cardOrder: 5,
    render: (e: DailyReport) => {
      return (
        <TableActionsContainerStyled>
          <TableActionsButtonStyled
            onClick={() => actions?.handleDownload(e)}
            data-flow='top'
            data-tooltip='Fazer download'
          >
            <FiDownload />
          </TableActionsButtonStyled>

          <TableActionsButtonStyled
            onClick={() => actions?.handleEdit(e)}
            data-flow='top'
            data-tooltip='Editar registro'
          >
            <FiEdit />
          </TableActionsButtonStyled>

          <TableActionsButtonStyled
            onClick={() => actions?.handleShow(e)}
            data-flow='top'
            data-tooltip='Visualizar detalhes'
          >
            <FiEye />
          </TableActionsButtonStyled>
        </TableActionsContainerStyled>
      );
    },
  },
];
