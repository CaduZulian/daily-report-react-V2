import { Timestamp } from 'firebase/firestore';

export interface ISignedUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface IUser {
  id: string;
  userId: string;
  metadata: {
    dailyHours: number;
    lunchHours: number;
    weeklyHours: number;
    monthlyHours: number;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
