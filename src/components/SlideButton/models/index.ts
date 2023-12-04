export interface SlideButtonProps {
  list: string[];
  currentItem: number;
  changeCurrentItem: (index: number) => void;
}
