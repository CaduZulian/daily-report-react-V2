import { createContext, useContext, useMemo, useState } from 'react';
import { addHours, format } from 'date-fns';

import { useDailyReport, useUser } from '@/hooks';

import { getSignedUser, download } from '@/utils';

import { IForm } from './models';
import { DailyReport } from '@/@types';

const FormContext = createContext({} as IForm);

interface FormProviderProps {
  children: React.ReactNode;
}

const FormProvider = ({ children }: FormProviderProps) => {
  const signedUser = getSignedUser();

  const [filters, setFilters] = useState<{ startDate: Date; endDate: Date }>();

  const { useGetUserById } = useUser();
  const {
    usePostCreateDailyReport,
    usePutUpdateDailyReport,
    useGetDailyReportList,
  } = useDailyReport();

  const getUserById = useGetUserById({ userId: signedUser?.id ?? '' });
  const getDailyReportList = useGetDailyReportList({ filters: filters ?? {} });
  const postCreateDailyReport = usePostCreateDailyReport();
  const putUpdateDailyReport = usePutUpdateDailyReport();

  const reportsInDay = useMemo(() => {
    if (getDailyReportList.data.length === 1) {
      return getDailyReportList.data[0];
    }

    return;
  }, [JSON.stringify(getDailyReportList.data)]);

  const leaveTime = useMemo(() => {
    if (reportsInDay) {
      if (reportsInDay.hoursInDay) {
        if (reportsInDay.entry.length === reportsInDay.leaves.length) {
          return '';
        } else {
          const date = new Date().setHours(
            Number(
              reportsInDay.entry[reportsInDay.entry.length - 1].horary.split(
                ':',
              )[0],
            ),
            Number(
              reportsInDay.entry[reportsInDay.entry.length - 1].horary.split(
                ':',
              )[1],
            ),
            0,
            0,
          );

          return format(
            new Date(date).getTime() +
              (((getUserById.data?.metadata.dailyHours ?? 8) +
                new Date().getTimezoneOffset() / 60) *
                60 *
                60 *
                1000 -
                new Date(
                  addHours(
                    new Date(reportsInDay?.hoursInDay),
                    new Date().getTimezoneOffset() / 60,
                  ),
                ).getTime()),
            'HH:mm',
          );
        }
      } else {
        if (reportsInDay.entry.length === 1) {
          const date = new Date().setHours(
            Number(reportsInDay.entry[0].horary.split(':')[0]),
            Number(reportsInDay.entry[0].horary.split(':')[1]),
          );

          return format(
            new Date(
              addHours(date, getUserById.data?.metadata.dailyHours ?? 8),
            ),
            'HH:mm',
          );
        }
      }
    }

    return '';
  }, [JSON.stringify(reportsInDay), getUserById.data?.metadata.dailyHours]);

  const getReportsInDay: IForm['getReportsInDay'] = (day) => {
    setFilters({
      startDate: new Date(day.setHours(0, 0, 0, 0)),
      endDate: new Date(day.setHours(23, 59, 59, 999)),
    });
  };

  const generateTxtFile: IForm['generateTxtFile'] = (data) => {
    let fileData = '';

    // construction of file content by adding data to string to avoid unwanted formatting

    fileData =
      fileData +
      `${data?.currentDate.toDate().toLocaleDateString('pt-BR')}\n\n`;

    fileData = fileData + `Entradas:\n`;

    fileData =
      fileData +
      `${data?.entry
        .map(({ horary }, index) => {
          return `${index + 1}º entrada: ${horary}\n`;
        })
        .join('')}\n`;

    fileData = fileData + `Saídas:\n`;
    fileData =
      fileData +
      `${data?.leaves
        .map(({ horary }, index) => {
          return `${index + 1}º saída: ${horary}\n`;
        })
        .join('')}\n`;

    fileData =
      fileData +
      `Horas do dia: ${
        data?.hoursInDay &&
        format(
          addHours(
            new Date(data?.hoursInDay),
            new Date().getTimezoneOffset() / 60,
          ),
          'HH:mm',
        )
      }\n\n`;

    if (data?.reportedActivities) {
      fileData = fileData + `Atividades do dia:\n`;
      fileData = fileData + `${data?.reportedActivities}\n\n`;
    }

    if (data?.comments) {
      fileData = fileData + `Observações:\n`;
      fileData = fileData + `${data?.comments}\n`;
    }

    const blob = new Blob([fileData], { type: 'text/plain' });

    return download({
      blob,
      filename: `dia ${new Date(data.currentDate.toDate())
        .toLocaleDateString('pt-BR')
        .slice(0, 2)}`,
    });
  };

  function getHoursInDay(
    entry: DailyReport['entry'],
    leaves: DailyReport['leaves'],
  ) {
    let result;

    if (reportsInDay) {
      for (let i = 0; i < leaves.length; i++) {
        let currentEntry = entry[i].horary
          .split(':')
          .map((item) => Number(item));
        let currentLeave = leaves[i].horary
          .split(':')
          .map((item) => Number(item));

        const currentEntryMilliseconds = new Date().setHours(
          currentEntry[0],
          currentEntry[1],
          0,
          0,
        );
        const currentLeavesMilliseconds = new Date().setHours(
          currentLeave[0],
          currentLeave[1],
          0,
          0,
        );

        result = result
          ? new Date(currentLeavesMilliseconds).getTime() -
            new Date(currentEntryMilliseconds).getTime() +
            result
          : new Date(currentLeavesMilliseconds).getTime() -
            new Date(currentEntryMilliseconds).getTime();
      }
    }

    return result;
  }

  const uploadData: IForm['uploadData'] = async (data) => {
    let formattedData: DailyReport | undefined;

    let entry: DailyReport['entry'] = [];
    let leaves: DailyReport['leaves'] = [];
    let hoursInDay: DailyReport['hoursInDay'];

    if (reportsInDay) {
      if (reportsInDay.entry.length > reportsInDay.leaves.length) {
        entry = reportsInDay.entry;
        leaves = [
          ...reportsInDay?.leaves,
          { horary: format(new Date(), 'HH:mm') },
        ];

        hoursInDay = getHoursInDay(entry, leaves) ?? 0;
      } else {
        entry = [
          ...reportsInDay?.entry,
          { horary: format(new Date(), 'HH:mm') },
        ];
        leaves = reportsInDay.leaves;

        hoursInDay = reportsInDay.hoursInDay;
      }

      formattedData = await putUpdateDailyReport.updateDailyReport({
        id: reportsInDay.id,
        data: {
          currentDate: reportsInDay.currentDate,
          entry,
          leaves,
          hoursInDay,
          comments: data.comments ?? '',
          reportedActivities: data.reportedActivities ?? '',
        },
      });
    } else {
      entry = [{ horary: format(new Date(), 'HH:mm') }];

      formattedData = await postCreateDailyReport.createDailyReport({
        data: {
          currentDate: new Date(new Date().setHours(0, 0, 0, 0)),
          entry: data.entry ?? entry,
          leaves: data.leaves ?? [],
          hoursInDay: data.hoursInDay ?? 0,
          comments: data.comments ?? '',
          reportedActivities: data.reportedActivities ?? '',
        },
      });
    }

    return formattedData;
  };

  return (
    <FormContext.Provider
      value={{
        reportsInDay,
        getReportsInDay,
        generateTxtFile,
        uploadData,
        leaveTime,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

const useForm = () => {
  return useContext(FormContext);
};

export { FormProvider, useForm };
