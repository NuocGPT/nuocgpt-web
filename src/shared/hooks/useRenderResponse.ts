import { useState } from 'react';

interface UseRenderResponseProps {
  onFinish: () => void;
}

export const useRenderResponse = ({ onFinish }: UseRenderResponseProps) => {
  const [completedTyping, setCompletedTyping] = useState(false);
  const [displayResponse, setDisplayResponse] = useState('');

  const handleRenderResponse = (response: string) => {
    setCompletedTyping(false);
    let i = 0;
    const stringResponse = response;
    const intervalId = setInterval(() => {
      setDisplayResponse(stringResponse?.slice(0, i));
      i++;
      if (i > stringResponse?.length) {
        clearInterval(intervalId);
        setCompletedTyping(true);
        setDisplayResponse('');
        onFinish();
      }
    }, 10);
    return () => clearInterval(intervalId);
  };

  return {
    completedTyping,
    displayResponse,
    handleRenderResponse,
  };
};
