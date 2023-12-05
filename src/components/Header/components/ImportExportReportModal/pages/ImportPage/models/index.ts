import * as Yup from 'yup';
import { importPageSchema } from '../validation';

export interface ImportPageProps {
  onClose: () => void;
}

export type IImportPageForm = Yup.InferType<typeof importPageSchema>;
