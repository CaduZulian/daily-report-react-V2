import { download } from '@/utils/download';
import { addHours, format } from 'date-fns';
import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// types
import { IForm } from './models';
import { DailyReport } from '@/@types';

const FormContext = createContext({} as IForm);

interface FormProviderProps {
  children: React.ReactNode;
}

const FormProvider = ({ children }: FormProviderProps) => {
  const [reportsInDay, setReportsInDay] = useState<DailyReport | null>(null);
  const [leaveTime, setLeaveTime] = useState('');

  useEffect(() => {
    if (reportsInDay) {
      if (reportsInDay.hoursInDay) {
        if (reportsInDay.entry.length === reportsInDay.leaves.length) {
          setLeaveTime('');
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

          setLeaveTime(
            format(
              new Date(date).getTime() +
                ((8 + new Date().getTimezoneOffset() / 60) * 60 * 60 * 1000 -
                  new Date(
                    addHours(
                      new Date(reportsInDay?.hoursInDay),
                      new Date().getTimezoneOffset() / 60,
                    ),
                  ).getTime()),
              'HH:mm',
            ),
          );
        }
      } else {
        if (reportsInDay.entry.length === 1) {
          const date = new Date().setHours(
            Number(reportsInDay.entry[0].horary.split(':')[0]),
            Number(reportsInDay.entry[0].horary.split(':')[1]),
          );

          setLeaveTime(format(new Date(addHours(date, 8)), 'HH:mm'));
        }
      }
    }
  }, [reportsInDay]);

  const getReportsInDay: IForm['getReportsInDay'] = (day) => {
    const date = format(day, 'dd/MM/yyyy');

    setReportsInDay(
      localStorage.getItem(date)
        ? JSON.parse(localStorage.getItem(date)!)
        : null,
    );
  };

  const generateTxtFile: IForm['generateTxtFile'] = (data) => {
    let fileData = '';

    // construction of file content by adding data to string to avoid unwanted formatting

    fileData = fileData + `${data?.currentDate}\n\n`;

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

    return download({ blob, filename: `dia ${data.currentDate.slice(0, 2)}` });
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

  const uploadData: IForm['uploadData'] = (data) => {
    let formattedData: DailyReport;

    const date = format(new Date(), 'dd/MM/yyyy');
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

        hoursInDay = getHoursInDay(entry, leaves);
      } else {
        entry = [
          ...reportsInDay?.entry,
          { horary: format(new Date(), 'HH:mm') },
        ];
        leaves = reportsInDay.leaves;

        hoursInDay = reportsInDay.hoursInDay;
      }

      formattedData = {
        ...data,
        currentDate: reportsInDay.currentDate,
        entry,
        leaves,
        hoursInDay,
      };
    } else {
      entry = [{ horary: format(new Date(), 'HH:mm') }];

      formattedData = {
        ...data,
        currentDate: date,
        entry,
        leaves,
      };
    }

    localStorage.setItem(date, JSON.stringify(formattedData));
    toast.success(`Relatório ${!reportsInDay ? 'Criado' : 'Atualizado'}!`);
    getReportsInDay(new Date());

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
