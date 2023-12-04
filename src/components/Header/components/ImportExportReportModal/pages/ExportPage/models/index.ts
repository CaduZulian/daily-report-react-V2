import * as Yup from 'yup';
import { exportPageSchema } from '../validation';

export interface ExportPageProps {
  onClose: () => void;
}

export type IExportPageForm = Yup.InferType<typeof exportPageSchema>;
