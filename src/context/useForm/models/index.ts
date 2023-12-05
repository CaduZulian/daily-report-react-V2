import { DailyReport } from '@/@types';

export type customDailyReport = Partial<
  Omit<DailyReport, 'currentDate' | 'id' | 'createdAt' | 'updatedAt' | 'userId'>
>;
export interface IForm {
  reportsInDay: DailyReport | undefined;
  getReportsInDay: (day: Date) => void;
  generateTxtFile: (data: DailyReport) => void;
  uploadData: (data: customDailyReport) => Promise<DailyReport | undefined>;
  leaveTime: string;
}
