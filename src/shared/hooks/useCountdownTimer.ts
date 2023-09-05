import { useEffect, useState } from 'react';

export const OTP_RESEND_TIME_IN_SECONDS = 60;

export const useCountdownTimer = () => {
  const [counter, setCounter] = useState(OTP_RESEND_TIME_IN_SECONDS);
  const [isWaiting, setIsWaiting] = useState(true);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isWaiting) {
      if (counter === -1) {
        setIsWaiting(false);
      } else {
        timer = setTimeout(() => {
          setCounter(counter => counter - 1);
        }, 1000);
      }
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isWaiting, counter]);

  const resetCounter = () => {
    setCounter(OTP_RESEND_TIME_IN_SECONDS);
  };

  return {
    counter,
    resetCounter,
  };
};
