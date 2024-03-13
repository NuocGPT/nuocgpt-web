import { useEffect, useState } from 'react';

export const OTP_RESEND_TIME_IN_SECONDS = 60;

export const useTimer = () => {
  const [timer, setTimer] = useState(OTP_RESEND_TIME_IN_SECONDS);

  useEffect(() => {
    let interval: ReturnType<typeof setTimeout>;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const resendOtp = () => {
    // Reset timer to 60 seconds
    setTimer(OTP_RESEND_TIME_IN_SECONDS);
  };

  return { resendOtp, timer };
};
