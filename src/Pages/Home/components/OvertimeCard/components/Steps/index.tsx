import { useEffect, useRef, useState } from 'react';

import {
  BackgroundButtons,
  BackgroundContainer,
  ButtonsGroup,
  StepButtons,
} from './styles';

interface ISteps {
  periods: string[];
  currentPeriod: number;
  setCurrentPeriod: React.Dispatch<React.SetStateAction<number>>;
}

export const Steps = ({ periods, currentPeriod, setCurrentPeriod }: ISteps) => {
  const buttonsContainerRef = useRef(null);

  const [widths, setWidths] = useState<string[]>(['0px']);
  const [lefts, setLefts] = useState<string[]>(['0px']);

  useEffect(() => {
    if (buttonsContainerRef) {
      let leftArray: string[] = ['0px'];
      let widthArray: string[] = [];

      periods.forEach((item) => {
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
            width: widths[currentPeriod],
            marginLeft: lefts[currentPeriod],
          }}
        />
      </BackgroundContainer>

      <StepButtons
        id={'weekly'}
        active={periods[currentPeriod] === 'weekly'}
        onClick={() => setCurrentPeriod(periods.indexOf('weekly'))}
      >
        Semanal
      </StepButtons>

      <StepButtons
        id={'monthly'}
        active={periods[currentPeriod] === 'monthly'}
        onClick={() => setCurrentPeriod(periods.indexOf('monthly'))}
      >
        Mensal
      </StepButtons>

      <StepButtons
        id={'yearly'}
        active={periods[currentPeriod] === 'yearly'}
        onClick={() => setCurrentPeriod(periods.indexOf('yearly'))}
      >
        Anual
      </StepButtons>
    </ButtonsGroup>
  );
};
