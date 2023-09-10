import { useState } from 'react';

interface Actions {
  /** Increments the counter, default by 1 */
  inc: (value?: number) => void;
  /** Decrements the counter, default by 1 */
  dec: (value?: number) => void;
  /** Resets the counter to initial value */
  reset: () => void;
}

type UseCounter = (initialValue: number) => [counter: number, actions: Actions];

export const useCounter: UseCounter = initialValue => {
  const [counter, setCounter] = useState<number>(initialValue);

  const inc = (value = 1) => setCounter(x => x + value);
  const dec = (value = 1) => setCounter(x => x - value);
  const reset = () => setCounter(initialValue);

  return [counter, { inc, dec, reset }];
};
