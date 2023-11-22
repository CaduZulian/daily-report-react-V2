import { useState, useEffect } from 'react';
import { collection } from 'firebase/firestore';

import { firebaseDatabase } from '@/services/firebaseService';

import {
  IGetDailyReportByIdParams,
  IGetDailyReportListParams,
  IPostCreateDailyReportParams,
  IPutUpdateDailyReportParams,
} from './models';

export const useDailyReport = () => {
  const collectionRef = collection(firebaseDatabase, 'dailyReports');

  const useGetDailyReportById = (params: IGetDailyReportByIdParams) => {};

  const useGetDailyReportList = (params: IGetDailyReportListParams) => {};

  const usePostCreateDailyReport = (params: IPostCreateDailyReportParams) => {};

  const usePutUpdateDailyReport = (params: IPutUpdateDailyReportParams) => {};

  return {
    useGetDailyReportById,
    useGetDailyReportList,
    usePostCreateDailyReport,
    usePutUpdateDailyReport,
  };
};
