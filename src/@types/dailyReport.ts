import { Timestamp } from 'firebase/firestore';

export interface DailyReport {
  id: string;
  userId: string;
  currentDate: Timestamp;
  entry: Array<{ horary: string }>;
  leaves: Array<{ horary: string }>;
  hoursInDay?: number;
  reportedActivities?: string;
  comments?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
