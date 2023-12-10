export interface ITableColumns {
  key: string;
  label: string;
  cardOrder: number;
  responsiveStyles?: React.CSSProperties;
  styles?: React.CSSProperties;
  render?: (props: any) => React.ReactNode;
}
[];

export interface ITable {
  columns: ITableColumns[];
  data: any;
}
