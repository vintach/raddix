import { useState, useRef, useEffect, useCallback } from 'react';

interface Options {
  autoTrigger?: boolean;
  onFinished?: () => void;
}

interface CountDownResult {
  readonly value: number;
  readonly stop: () => void;
  readonly trigger: () => void;
  readonly reset: () => void;
  readonly isFinished: boolean;
}

type UseCountDown = (
  initialValue: number,
  interval: number,
  options?: Options
) => CountDownResult;

export const useCountDown: UseCountDown = (
  initialValue,
  interval = 1000,
  options = {}
) => {
  const { autoTrigger, onFinished } = options;

  const [timer, setTimer] = useState<number>(initialValue);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timer | null>(null);

  const stop = useCallback(() => {
    if (!timerRef.current) return;

    clearInterval(timerRef.current);
    timerRef.current = null;
  }, []);

  const trigger = useCallback(() => {
    if (timerRef.current) return;
    if (isFinished) return;

    timerRef.current = setInterval(() => {
      if (timer > 0) {
        setTimer(prev => prev - interval);
      } else {
        stop();
        setTimer(0);
        setIsFinished(true);
        if (onFinished) onFinished();
      }
    }, interval);
  }, [isFinished, interval, timer, stop, onFinished]);

  const reset = useCallback(() => {
    setTimer(initialValue);
    setIsFinished(true);
  }, [initialValue]);

  useEffect(() => {
    if (Boolean(autoTrigger)) trigger();

    return () => {
      stop();
    };
  }, [autoTrigger, stop, trigger]);

  return {
    value: timer,
    stop,
    trigger,
    reset,
    isFinished: isFinished
  };
};
