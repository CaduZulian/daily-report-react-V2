import { DailyReport } from '@/@types';

export interface ShowDailyReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  dailyReport?: DailyReport;
}
