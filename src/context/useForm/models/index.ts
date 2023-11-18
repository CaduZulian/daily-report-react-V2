export interface DailyReport {
  currentDate: string;
  entry: Array<{ horary: string }>;
  leaves: Array<{ horary: string }>;
  hoursInDay?: number;
  reportedActivities?: string;
  comments?: string;
}

export interface IForm {
  reportsInDay: DailyReport | null;
  getReportsInDay: (day: Date) => void;
  generateTxtFile: (data: DailyReport) => void;
  uploadData: (data: Record<string, string>) => DailyReport;
  leaveTime: string;
}
