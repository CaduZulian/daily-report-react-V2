import { DailyReport } from '@/@types';

export interface TableColumnsProps {
  actions: {
    handleDownload: (data: DailyReport) => void;
    handleEdit: (data: DailyReport) => void;
    handleShow: (data: DailyReport) => void;
  };
}

export interface IFilters {
  startDate: Date;
  endDate: Date;
}

export interface IShowDailyReportModalProps {
  isOpen: boolean;
  dailyReport?: DailyReport;
}

export interface IEditDailyReportModalProps {
  isOpen: boolean;
  dailyReport?: DailyReport;
}
