import { DailyReport } from '@/@types';

export interface IForm {
  reportsInDay: DailyReport | null;
  getReportsInDay: (day: Date) => void;
  generateTxtFile: (data: DailyReport) => void;
  uploadData: (data: Record<string, string>) => DailyReport;
  leaveTime: string;
}
