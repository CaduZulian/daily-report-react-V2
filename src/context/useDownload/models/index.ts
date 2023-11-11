import { DailyReport } from '@/context/useForm/models';

export interface IDownloadOfPeriod {
  downloadFunction: (props: DailyReport) => void;
  date?: string;
}

export interface IDownload {
  getDaysOfWeek: () => string[];
  getDaysOfMonth: () => string[];
  downloadOfPeriod: (
    period: 'daily' | 'weekly' | 'monthly',
    { downloadFunction, date }: IDownloadOfPeriod,
  ) => void;
}
