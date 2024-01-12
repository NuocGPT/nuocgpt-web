import { useState } from 'react';
import { STREAM_MESSAGES_API } from '../utils/constant';
import { handleStreaming } from '../utils/stream';

interface Props {
  message: string;
  onFinish: () => void;
}

export const useHandleStreamMessages = ({ message, onFinish }: Props) => {
  const [completedTyping, setCompletedTyping] = useState(false);
  const [answer, setAnswer] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const handleStream = () =>
    handleStreaming({
      api: STREAM_MESSAGES_API,
      message,
      onFinish,
      setAnswer,
      setCompletedTyping,
      setIsTyping,
    });

  return {
    answer,
    completedTyping,
    handleStream,
    isTyping,
    setAnswer,
    setCompletedTyping,
    setIsTyping,
  };
};
