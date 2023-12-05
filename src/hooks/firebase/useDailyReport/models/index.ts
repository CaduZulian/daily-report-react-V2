import { DailyReport } from '@/@types';

export interface IGetDailyReportByIdParams {
  id: string;
}

export interface IGetDailyReportByIdResponse {
  data: DailyReport | undefined;
}

export interface IGetDailyReportListParams {
  filters?: {
    startDate?: Date;
    endDate?: Date;
  };
}

export interface IGetDailyReportListResponse {
  data: DailyReport[];
}

export interface IPostCreateDailyReportParams {
  data: Omit<
    DailyReport,
    'id' | 'userId' | 'createdAt' | 'updatedAt' | 'currentDate'
  > & {
    currentDate: Date;
  };
}

export interface IPostCreateDailyReportResponse {
  createDailyReport: (
    params: IPostCreateDailyReportParams,
  ) => Promise<DailyReport | undefined>;
}

export interface IPutUpdateDailyReportParams {
  id: string;
  data: Partial<Omit<DailyReport, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>;
}

export interface IPutUpdateDailyReportResponse {
  updateDailyReport: (
    params: IPutUpdateDailyReportParams,
  ) => Promise<DailyReport | undefined>;
}
