import { useState, useEffect, useRef, useCallback } from 'react';

interface Options {
  /**
   * The time, in milliseconds, that the timer should count down.
   * @default 1000
   */
  interval?: number;
  autoStart?: boolean;
  /** A callback function to be called when the countdown reaches zero. */
  onFinished?: () => void;
  /** A callback function to be called on each specified interval of the countdown. */
  onTick?: () => void;
}

interface Actions {
  start: (x?: number) => void;
  reset: () => void;
  stop: () => void;
}

type UseCountDown = (
  initialTime: number,
  options?: Options
) => [count: number, actions: Actions];

// plus the current time
const plus = (x: number) => x + Date.now();
// minus the current time
const minus = (x: number) => x - Date.now();

export const useCountDown: UseCountDown = (initialTime, options = {}) => {
  const { onFinished, onTick, interval = 1000 } = options;

  const [initialCount, setInitialCount] = useState(plus(initialTime));
  const [count, setCount] = useState<number>(initialTime);
  const timerRef = useRef<NodeJS.Timer | null>(null);

  const clearTimer = () => {
    if (!timerRef.current) return;
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const timer = useCallback(() => {
    timerRef.current = setInterval(() => {
      let leftTime = initialCount - Date.now();
      leftTime = leftTime <= 0 ? 0 : leftTime;
      setCount(leftTime);
      onTick?.();

      if (leftTime === 0) {
        clearTimer();
        onFinished?.();
      }
    }, interval);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCount, interval]);

  const start = (time?: number) => {
    if (time === undefined) {
      if (count === 0) return;
      setInitialCount(plus(count));
    } else {
      setInitialCount(plus(time));
    }
  };

  const stop = () => {
    clearTimer();
  };

  const reset = () => {
    setInitialCount(plus(initialTime));
  };

  useEffect(() => {
    setCount(minus(initialCount));
    timer();

    return () => clearTimer();
  }, [initialCount, timer]);

  return [count, { start, stop, reset }];
};
