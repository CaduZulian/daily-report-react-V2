export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactElement;
  cancellable?: boolean;
  className?: string;
}
