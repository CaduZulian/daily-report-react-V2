import {
  Card,
  Cell,
  Column,
  Container,
  Row,
  TableStyled,
  TBodyStyled,
  THeadStyled,
} from './styles';

import { useEffect, useState } from 'react';
import { FaDownload } from 'react-icons/fa';
import theme from '@/styles/theme';

export type Columns = {
  key: string;
  label: string;
  cardOrder: number;
  responsiveStyles?: React.CSSProperties;
  styles?: React.CSSProperties;
  render?: (props: any) => React.ReactNode;
}[];

interface ITable {
  columns: Columns;
  tableKey: string;
  data: any;
  onDownload?: (item?: any) => void;
  customActions?: {
    icon: React.ReactElement;
    callback: (row: any) => void;
    tooltip: string;
  }[];
  maxIndex?: number;
  maxIndexMobile?: number;
}

export const Table: React.FC<ITable> = ({
  columns,
  data,
  tableKey,
  onDownload,
  customActions,
  maxIndex,
  maxIndexMobile,
}) => {
  const [showCards, setShowCards] = useState(window.innerWidth <= 960);
  const [maxHeight, setMaxHeight] = useState<number>();

  const cardColumns: ITable['columns'] = Object.create(columns);

  cardColumns.sort((a, b) => {
    if (a.cardOrder < b.cardOrder) {
      return -1;
    }

    if (a.cardOrder > b.cardOrder) {
      return 1;
    }

    return 0;
  });

  function handleResize() {
    if (window.innerWidth <= 960) {
      setShowCards(true);
    } else {
      setShowCards(false);
    }
  }

  useEffect(() => {
    if (!showCards) {
      if (maxIndex !== undefined && maxIndex <= data.length) {
        const theadHeight = document.getElementById('rowThead')?.offsetHeight;

        const rowHeight = document.getElementById(`${maxIndex}_row_${tableKey}`)
          ?.offsetHeight;

        if (rowHeight && theadHeight) {
          setMaxHeight(
            theadHeight +
              rowHeight * maxIndex +
              (maxIndex = data.length ? 2 : 0),
          );
        }
      }
    } else {
      if (maxIndexMobile !== undefined && maxIndexMobile <= data.length) {
        const rowHeight = document.getElementById(
          `${maxIndexMobile}_card_${tableKey}`,
        )?.offsetHeight;

        if (rowHeight) {
          setMaxHeight(rowHeight * maxIndexMobile + 4 * maxIndexMobile);
        }
      }
    }
  }, [maxIndex, maxIndexMobile, showCards]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('resize', handleResize);
    };
  });

  function completeRowPath(row: any, key: string) {
    let finalData = row;

    for (let path of key.split('.')) {
      finalData = finalData[path];
    }

    return finalData;
  }

  return (
    <Container maxHeight={maxHeight}>
      {!showCards ? (
        <TableStyled border={1}>
          <THeadStyled>
            <Row id='rowThead'>
              {columns.map(({ key, label }) => {
                return (
                  <Column key={key}>
                    <span style={{ fontWeight: 'bold' }}>{label}</span>
                  </Column>
                );
              })}
            </Row>
          </THeadStyled>

          <TBodyStyled>
            {data.length > 0 &&
              data?.map((row: any, index: number) => {
                return (
                  <Row id={`${index + 1}_row_${tableKey}`} key={'row' + index}>
                    <>
                      {columns.map(({ key, styles, ...rest }, index) => {
                        return (
                          <Column key={'rowCell' + index} style={styles}>
                            {rest.render ? (
                              <Cell key={'rowCell' + index} style={styles}>
                                {rest.render(row)}
                              </Cell>
                            ) : (
                              <span key={'rowCell' + index}>
                                {!key.includes('.')
                                  ? row[key]
                                  : completeRowPath(row, key)}
                              </span>
                            )}
                          </Column>
                        );
                      })}

                      {(onDownload || customActions) && (
                        <Column>
                          <div className='actions'>
                            {onDownload && (
                              <button
                                type='button'
                                data-tooltip='Fazer download'
                                data-flow='top'
                                onClick={() => onDownload(row)}
                              >
                                <FaDownload
                                  color={theme.palette.action.primary}
                                />
                              </button>
                            )}

                            {customActions &&
                              customActions.map(
                                ({ tooltip, icon, callback }) => {
                                  return (
                                    <button
                                      type='button'
                                      data-tooltip={tooltip}
                                      data-flow='top'
                                      onClick={() => callback(row)}
                                    >
                                      {icon}
                                    </button>
                                  );
                                },
                              )}
                          </div>
                        </Column>
                      )}
                    </>
                  </Row>
                );
              })}
          </TBodyStyled>
        </TableStyled>
      ) : (
        data.length > 0 &&
        data?.map((row: any, index: number) => {
          return (
            <Card
              id={`${index + 1}_card_${tableKey}`}
              key={'card' + index}
              onClick={() => {
                onDownload && onDownload(row);
              }}
            >
              {cardColumns.map(({ key, responsiveStyles, ...rest }, index) => {
                return (
                  <Cell key={'cardCell' + index} style={responsiveStyles}>
                    {rest.render ? (
                      rest.render(row)
                    ) : (
                      <div
                        style={{
                          display: 'flex',
                          gap: '8px',
                          width: '100%',
                          justifyContent: 'space-between',
                        }}
                      >
                        <span className='title'>{rest.label}</span>
                        <span>
                          {!key.includes('.')
                            ? row[key]
                            : completeRowPath(row, key)}
                        </span>
                      </div>
                    )}
                  </Cell>
                );
              })}
              {(onDownload || customActions) && (
                <div style={{ display: 'flex', gap: '48px' }}>
                  {onDownload && (
                    <button
                      type='button'
                      data-tooltip='Fazer download'
                      data-flow='top'
                      onClick={() => onDownload(row)}
                    >
                      <FaDownload />
                    </button>
                  )}

                  {customActions &&
                    customActions.map(({ tooltip, icon, callback }) => {
                      return (
                        <button
                          type='button'
                          data-tooltip={tooltip}
                          data-flow='top'
                          onClick={() => callback(row)}
                        >
                          {icon}
                        </button>
                      );
                    })}
                </div>
              )}
            </Card>
          );
        })
      )}
    </Container>
  );
};

export default Table;
