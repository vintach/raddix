import { useState, useEffect, useRef, useCallback } from 'react';

interface Options {
  /**
   * The time, in milliseconds, that the timer should count down.
   * @default 1000
   */
  interval?: number;
  /**
   * Start timer immediately
   * @default true
   */
  autoStart?: boolean;
  /** A callback function to be called when the countdown reaches zero. */
  onFinished?: () => void;
  /** A callback function to be called on each specified interval of the countdown. */
  onTick?: () => void;
}

interface Actions {
  /** Start and resume the countdown, also restart from the time (in milliseconds) indicated in the parameter */
  start: (time?: number) => void;
  /** Resets the countdown to its initial setting */
  reset: () => void;
  /** Pause the countdown */
  stop: () => void;
  /** Add time to the current countdown */
  add: (time: number) => void;
}

interface Indicators {
  isRunning: boolean;
  isFinished: boolean;
}

type UseCountDown = (
  initialTime: number,
  options?: Options
) => [count: number, actions: Actions, indicators: Indicators];

// plus and minus the current time
const plus = (x: number) => x + Date.now();
const minus = (x: number) => x - Date.now();

export const useCountDown: UseCountDown = (initialTime, options = {}) => {
  const { onFinished, onTick, interval = 1000, autoStart = true } = options;

  const [startUp, setstartUp] = useState<boolean>(autoStart);
  const [initialCount, setInitialCount] = useState<number>(plus(initialTime));
  const [count, setCount] = useState<number>(initialTime);
  const [isRunning, setIsRunning] = useState(autoStart);
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
        setIsRunning(false);
      }
    }, interval);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCount, interval]);

  const start = (time?: number) => {
    if (!startUp) setstartUp(true);
    setIsRunning(true);

    if (time === undefined) {
      if (count === 0) return;
      setInitialCount(plus(count));
    } else {
      setInitialCount(plus(time));
    }
  };

  const stop = () => {
    clearTimer();
    setIsRunning(false);
  };

  const reset = () => {
    if (!autoStart) setstartUp(false);
    setInitialCount(plus(initialTime));
    setIsRunning(autoStart);
  };

  const add = (time: number) => {
    setInitialCount(plus(count + time));
    setIsRunning(autoStart);
  };

  useEffect(() => {
    setCount(minus(initialCount));
    if (startUp) timer();

    return () => clearTimer();
  }, [initialCount, timer, startUp]);

  // only runs when initialTime changes
  useEffect(() => {
    setInitialCount(plus(initialTime));
    setstartUp(autoStart);
    setIsRunning(autoStart);
  }, [initialTime, autoStart]);

  return [
    count,
    { start, stop, reset, add },
    { isRunning, isFinished: count === 0 }
  ];
};
