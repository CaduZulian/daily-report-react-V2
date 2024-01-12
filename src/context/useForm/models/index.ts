import { DailyReport } from '@/@types';

export type customDailyReport = Partial<
  Omit<DailyReport, 'id' | 'createdAt' | 'updatedAt' | 'userId'>
> & {
  currentDate?: Date;
};
export interface IForm {
  reportsInDay: DailyReport | undefined;
  getReportsInDay: (day: Date) => void;
  generateTxtFile: (
    data: DailyReport,
    options?: {
      isDownload?: boolean;
    },
  ) => Blob;
  uploadData: (
    data: customDailyReport,
    isBatch?: boolean,
  ) => Promise<DailyReport | undefined>;
  getHoursInDay: (
    entry: DailyReport['entry'],
    leaves: DailyReport['leaves'],
  ) => number | undefined;
  leaveTime: string;
}
