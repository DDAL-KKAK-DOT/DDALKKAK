import { useEffect, useState, useCallback, useRef } from "react";

export function useDebounce<T>(value: T, delay: number = 1000): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, delay]);

  return debouncedValue;
}

export function useDebounceCallback<TArgs extends unknown[], TReturn>(
  callback: (...args: TArgs) => TReturn,
  delay: number = 1000,
): (...args: TArgs) => TReturn {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const lastArgsRef = useRef<TArgs | null>(null);
  const lastCallRef = useRef<number>(Date.now());

  // 컴포넌트가 언마운트되거나 delay가 변경될 때 마지막 이벤트 실행
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      // 마지막 이벤트가 있으면 실행
      if (lastArgsRef.current) {
        callback(...lastArgsRef.current);
      }
    };
  }, [callback, delay]);

  return useCallback(
    (...args: TArgs) => {
      const now = Date.now();
      lastArgsRef.current = args;

      // 이전 타임아웃이 있다면 제거
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // 마지막 호출로부터 delay 시간이 지났다면 즉시 실행
      if (now - lastCallRef.current >= delay) {
        const result = callback(...args);
        lastCallRef.current = now;
        lastArgsRef.current = null;
        return result;
      } else {
        // 그렇지 않다면 delay 시간 후에 실행
        timeoutRef.current = setTimeout(() => {
          if (lastArgsRef.current) {
            callback(...lastArgsRef.current);
            lastArgsRef.current = null;
          }
        }, delay);
        return undefined as TReturn;
      }
    },
    [callback, delay],
  );
}
