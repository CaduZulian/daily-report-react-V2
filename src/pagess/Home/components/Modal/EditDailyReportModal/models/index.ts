import { DailyReport } from '@/@types';
import { editDailyReportSchema } from '../validation';
import * as Yup from 'yup';

export interface EditDailyReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  dailyReport?: DailyReport;
}

export type IEditDailyReportForm = Yup.InferType<typeof editDailyReportSchema>;
