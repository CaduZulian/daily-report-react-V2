import { DailyReport } from '@/@types';

export interface IGetDailyReportByIdParams {
  id: string;
}

export interface IGetDailyReportByIdResponse {
  data: DailyReport;
}

export interface IGetDailyReportListParams {
  filters: {
    startDate: Date;
    endDate: Date;
  };
}

export interface IGetDailyReportListResponse {
  data: DailyReport[];
}

export interface IPostCreateDailyReportParams {
  data: Omit<DailyReport, 'id' | 'userId' | 'createdAt' | 'updatedAt'>;
}

export interface IPostCreateDailyReportResponse {
  data: DailyReport;
}

export interface IPutUpdateDailyReportParams {
  id: string;
  data: Partial<Omit<DailyReport, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>;
}

export interface IPutUpdateDailyReportResponse {
  data: DailyReport;
}
