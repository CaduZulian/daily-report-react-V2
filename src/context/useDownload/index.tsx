import { createContext, useContext } from 'react';
import { format, startOfWeek, startOfMonth, endOfMonth } from 'date-fns';

// types
import { IDownload, IDownloadOfPeriod } from './models';

const DownloadContext = createContext({} as IDownload);

interface DownloadProviderProps {
  children: React.ReactNode;
}

const DownloadProvider = ({ children }: DownloadProviderProps) => {
  function getDaysOfWeek() {
    const currentDate = new Date();

    const startDay = startOfWeek(currentDate, { weekStartsOn: 0 });

    let daysOfWeek: string[] = [];

    let startWeekDate = startDay.getDate();

    for (let i = 0; i <= 6; i++) {
      daysOfWeek.push(
        format(new Date(startDay).setDate(startWeekDate + i), 'dd/MM/yyyy'),
      );
    }

    return daysOfWeek;
  }

  function getDaysOfMonth() {
    const currentDate = new Date();

    const startDay = startOfMonth(currentDate);
    const endDay = endOfMonth(currentDate);

    let daysOfMonth: any = [format(startDay, 'dd/MM/yyyy')];

    for (let i = startDay.getDate(); i <= endDay.getDate(); i++) {
      if (!daysOfMonth.includes(format(new Date().setDate(i), 'dd/MM/yyyy'))) {
        daysOfMonth.push(format(new Date().setDate(i), 'dd/MM/yyyy'));
      }
    }

    return daysOfMonth;
  }

  function downloadOfPeriod(
    period: 'daily' | 'weekly' | 'monthly',
    { downloadFunction, date }: IDownloadOfPeriod,
  ) {
    const dates =
      period === 'daily'
        ? [date ?? format(new Date(), 'dd/MM/yyyy')]
        : period === 'weekly'
        ? getDaysOfWeek()
        : period === 'monthly'
        ? getDaysOfMonth()
        : '';

    for (let date of dates) {
      if (localStorage.getItem(date)) {
        downloadFunction(JSON.parse(localStorage.getItem(date)!));
      }
    }
  }

  return (
    <DownloadContext.Provider
      value={{
        getDaysOfWeek,
        getDaysOfMonth,
        downloadOfPeriod,
      }}
    >
      {children}
    </DownloadContext.Provider>
  );
};

const useDownload = () => {
  return useContext(DownloadContext);
};

export { DownloadProvider, useDownload };
