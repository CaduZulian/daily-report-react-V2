import { useState, useEffect } from 'react';
import {
  QueryConstraint,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import { v4 } from 'uuid';

import { firebaseDatabase } from '@/services/firebaseService';

import { getSignedUser } from '@/utils';

import {
  IGetDailyReportByIdParams,
  IGetDailyReportByIdResponse,
  IGetDailyReportListParams,
  IGetDailyReportListResponse,
  IPostCreateDailyReportParams,
  IPostCreateDailyReportResponse,
  IPutUpdateDailyReportParams,
  IPutUpdateDailyReportResponse,
} from './models';

import { DailyReport } from '@/@types';

export const useDailyReport = () => {
  const collectionRef = collection(firebaseDatabase, 'dailyReports');

  const useGetDailyReportById = (params: IGetDailyReportByIdParams) => {
    const [dailyReport, setDailyReport] = useState<DailyReport>();

    useEffect(() => {
      if (params?.id) {
        const docRef = doc(collectionRef, params.id);

        onSnapshot(docRef, (doc) => {
          setDailyReport(doc.data() as DailyReport);
        });
      } else {
        setDailyReport(undefined);
      }
    }, [JSON.stringify(params)]);

    const response: IGetDailyReportByIdResponse = {
      data: dailyReport,
    };

    return response;
  };

  const useGetDailyReportList = (params: IGetDailyReportListParams) => {
    const signedUser = getSignedUser();

    const [dailyReportList, setDailyReportList] = useState<DailyReport[]>([]);
    const [filtersQuery, setFiltersQuery] = useState<QueryConstraint[]>([]);

    useEffect(() => {
      const filtersQueryAcc: QueryConstraint[] = [
        where('userId', '==', signedUser?.id ?? ''),
      ];

      if (params?.filters?.startDate) {
        filtersQueryAcc.push(
          where('currentDate', '>=', params?.filters?.startDate),
        );
      }

      if (params?.filters?.endDate) {
        filtersQueryAcc.push(
          where('currentDate', '<=', params?.filters?.endDate),
        );
      }

      setFiltersQuery(filtersQueryAcc);
    }, [JSON.stringify(params)]);

    useEffect(() => {
      const queryDailyReport = query(collectionRef, ...filtersQuery);

      onSnapshot(queryDailyReport, (querySnapshot) => {
        const dailyReportList: DailyReport[] = [];

        querySnapshot.forEach((doc) => {
          dailyReportList.push(doc.data() as DailyReport);
        });

        setDailyReportList(dailyReportList);
      });
    }, [JSON.stringify(filtersQuery), dailyReportList.length]);

    const response: IGetDailyReportListResponse = {
      data: dailyReportList,
    };

    return response;
  };

  const useGetAsyncDailyReportList = () => {
    const getData = async (params: IGetDailyReportListParams) => {
      const signedUser = getSignedUser();

      const filtersQueryAcc: QueryConstraint[] = [
        where('userId', '==', signedUser?.id ?? ''),
      ];

      if (params?.filters?.startDate) {
        filtersQueryAcc.push(
          where('currentDate', '>=', params?.filters?.startDate),
        );
      }

      if (params?.filters?.endDate) {
        filtersQueryAcc.push(
          where('currentDate', '<=', params?.filters?.endDate),
        );
      }

      const queryDailyReport = query(collectionRef, ...filtersQueryAcc);

      const querySnapshot = await getDocs(queryDailyReport);

      const dailyReportList: DailyReport[] = [];

      querySnapshot.forEach((doc) => {
        dailyReportList.push(doc.data() as DailyReport);
      });

      const response: IGetDailyReportListResponse = {
        data: dailyReportList,
      };

      return response;
    };

    const response = {
      getData: getData,
    };

    return response;
  };

  const usePostCreateDailyReport = () => {
    const createDailyReport = async (params: IPostCreateDailyReportParams) => {
      const signedUser = getSignedUser();

      const findDailyReportQuery = query(
        collectionRef,
        where('userId', '==', signedUser?.id ?? ''),
        where('currentDate', '==', params.data.currentDate),
      );

      const findDailyReport = await getDocs(findDailyReportQuery);

      if (findDailyReport.docs.length) {
        toast.error('Erro ao criar relatório diário: Relatório já existe');
        throw new Error('Daily report already exists');
      }

      const id = v4();

      await setDoc(doc(collectionRef, id), {
        ...params.data,
        id,
        userId: signedUser?.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const response = await getDoc(doc(collectionRef, id));

      !params.isBatch && toast.success('Relatório diário criado com sucesso!');

      return response.data() as DailyReport;
    };

    const response: IPostCreateDailyReportResponse = {
      createDailyReport: createDailyReport,
    };

    return response;
  };

  const usePutUpdateDailyReport = () => {
    const updateDailyReport = async (params: IPutUpdateDailyReportParams) => {
      const { id, ...rest } = params;

      const findDailyReport = doc(collectionRef, id);

      const dailyReport = await getDoc(findDailyReport);

      if (!dailyReport.exists()) {
        toast.error(
          'Erro ao atualizar relatório diário: Relatório não existe!',
        );
        throw new Error('Daily report does not exists');
      }

      await updateDoc(findDailyReport, {
        ...rest.data,
        updatedAt: new Date(),
      });

      const response = await getDoc(findDailyReport);

      toast.success('Relatório diário atualizado com sucesso!');

      return response.data() as DailyReport;
    };

    const response: IPutUpdateDailyReportResponse = {
      updateDailyReport: updateDailyReport,
    };

    return response;
  };

  return {
    useGetDailyReportById,
    useGetDailyReportList,
    useGetAsyncDailyReportList,
    usePostCreateDailyReport,
    usePutUpdateDailyReport,
  };
};
