import { useState } from 'react';

interface Actions {
  /** Increments the counter, default by 1 */
  inc: (value?: number) => void;
  /** Decrements the counter, default by 1 */
  dec: (value?: number) => void;
  /** Resets the counter to initial value */
  reset: () => void;
  /** Sets the counter to the given value */
  set: (value: number) => void;
}

interface Options {
  min?: number;
  max?: number;
}

type UseCounter = (
  initialValue: number,
  options?: Options
) => [counter: number, actions: Actions];

const min = (value: number, valueMin?: number): number => {
  if (valueMin === undefined) return value;
  return Math.max(valueMin, value);
};

const max = (value: number, valueMax?: number): number => {
  if (valueMax === undefined) return value;
  return Math.min(valueMax, value);
};

export const useCounter: UseCounter = (initialValue, options = {}) => {
  const [counter, setCounter] = useState(
    min(max(initialValue, options.max), options.min)
  );

  const inc = (value = 1) => {
    setCounter(prev => max(prev + value, options.max));
  };

  const dec = (value = 1) => {
    setCounter(prev => min(prev - value, options.min));
  };

  const reset = (value = initialValue) => {
    setCounter(min(max(value, options.max), options.min));
  };

  const set = (value: number) => {
    setCounter(min(max(value, options.max), options.min));
  };

  return [counter, { inc, dec, reset, set }];
};
