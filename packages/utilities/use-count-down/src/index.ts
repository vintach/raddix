import { useState, useEffect, useMemo, useRef, useCallback } from 'react';

interface Options {
  autoStart?: boolean;
  /** A callback function to be called when the countdown reaches zero. */
  onFinished?: () => void;
  /** A callback function to be called on each specified interval of the countdown. */
  onTick?: () => void;
}

interface CountDownResult {
  readonly value: number;
  readonly stop: () => void;
  // readonly trigger: () => void;
  readonly reset: () => void;
  readonly isFinished: boolean;
}

type UseCountDown = (
  initialValue: number,
  interval: number,
  options?: Options
) => CountDownResult;

// the new time is accessed and subtracted from the countdown.
const calc = (time: number) => time - Date.now();

export const useCountDown: UseCountDown = (
  initialValue,
  interval = 1000,
  options = {}
) => {
  const { autoStart = true, onFinished, onTick } = options;
  const timeLeft = useMemo(() => Date.now() + initialValue, [initialValue]);

  const [timer, setTimer] = useState<number>(calc(timeLeft));
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timer | null>(null);

  const stop = useCallback(() => {
    if (!timerRef.current) return;

    clearInterval(timerRef.current);
    timerRef.current = null;
  }, []);

  const trigger = useCallback(() => {
    if (timerRef.current) return;
    // if (isFinished) return;

    timerRef.current = setInterval(() => {
      const targetLeft = calc(timeLeft);
      setTimer(targetLeft);
      if (onTick) onTick();

      if (targetLeft === 0) {
        stop();
        setIsFinished(true);
        if (onFinished) onFinished();
      }
    }, interval);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, interval, stop]);

  const reset = useCallback(() => {
    setTimer(initialValue);
    setIsFinished(true);
  }, [initialValue]);

  useEffect(() => {
    if (autoStart) trigger();

    return () => {
      stop();
    };
  }, [stop, trigger, autoStart]);

  return {
    value: timer,
    stop,
    // trigger,
    reset,
    isFinished: isFinished
  };
};
