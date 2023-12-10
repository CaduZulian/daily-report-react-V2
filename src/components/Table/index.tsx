import { useEffect, useState } from 'react';

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

import { ITable } from './models';

export const Table = ({ columns, data }: ITable) => {
  const [showCards, setShowCards] = useState(window.innerWidth <= 960);

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
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('resize', handleResize);
    };
  }, []);

  function completeRowPath(row: any, key: string) {
    let finalData = row;

    for (let path of key.split('.')) {
      finalData = finalData[path];
    }

    return finalData;
  }

  return (
    <Container>
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
                  <Row id={`${index + 1}_row`} key={'row' + index}>
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
                  </Row>
                );
              })}
          </TBodyStyled>
        </TableStyled>
      ) : (
        data.length > 0 &&
        data?.map((row: any, index: number) => {
          return (
            <Card id={`${index + 1}_card`} key={'card' + index}>
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
            </Card>
          );
        })
      )}
    </Container>
  );
};

export default Table;
