'use client'
import { Dispatch, SetStateAction, useCallback } from 'react';
import css from './battle-controls.module.scss'

interface BattleControlProps{
    setIndex: Dispatch<SetStateAction<number>>;
    listLength: number;
    currentIndex: number;
}

export default function BattleControls(props: BattleControlProps) {
  const {setIndex, listLength, currentIndex} = props;
  const handleNext = useCallback(() => {
      setIndex((currentIndex + 1) % listLength);
  }, [setIndex, currentIndex, listLength])
  const handlePrevious = useCallback(() => {
      setIndex((currentIndex - 1 + listLength) % listLength);
  }, [setIndex, currentIndex, listLength]);

  return (
    <div className={css.root}>
        <button onClick={handlePrevious}>
            Previous
        </button>
        <button onClick={handleNext}>
            Next
        </button>
    </div>
  );
}
