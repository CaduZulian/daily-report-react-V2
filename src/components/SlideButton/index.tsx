import { useEffect, useRef, useState } from 'react';

import {
  BackgroundButtons,
  BackgroundContainer,
  ButtonsGroup,
  StepButtons,
} from './styles';

import { SlideButtonProps } from './models';

export const SlideButton = ({
  list,
  currentItem,
  changeCurrentItem,
}: SlideButtonProps) => {
  const buttonsContainerRef = useRef(null);

  const [widths, setWidths] = useState<string[]>(['0px']);
  const [lefts, setLefts] = useState<string[]>(['0px']);

  useEffect(() => {
    if (buttonsContainerRef) {
      let leftArray: string[] = ['0px'];
      let widthArray: string[] = [];

      list.forEach((item) => {
        widthArray.push(`${document.getElementById(item)?.offsetWidth}px`);

        if (widthArray.length > leftArray.length) {
          let left = 0;

          widthArray.forEach((item, i) => {
            if (widthArray.length !== i + 1) {
              left = left + Number(item.replace('px', '')) + 8;
            }
          });

          leftArray.push(`${left}px`);
        }
      });

      setLefts(leftArray);
      setWidths(widthArray);
    }
  }, [buttonsContainerRef]);

  return (
    <ButtonsGroup ref={buttonsContainerRef}>
      <BackgroundContainer>
        <BackgroundButtons
          style={{
            width: widths[currentItem],
            marginLeft: lefts[currentItem],
          }}
        />
      </BackgroundContainer>

      {list.map((item, index) => (
        <StepButtons
          key={index}
          id={item}
          active={list[currentItem] === item}
          onClick={() => changeCurrentItem(list.indexOf(item))}
        >
          {item}
        </StepButtons>
      ))}
    </ButtonsGroup>
  );
};
