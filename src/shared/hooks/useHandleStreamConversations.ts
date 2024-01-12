import { useState } from 'react';
import { handleStreaming } from '../utils/stream';

interface Props {
  message: string;
  onFinish: () => void;
  id: string;
}

export const useHandleStreamConversations = ({
  message,
  onFinish,
  id,
}: Props) => {
  const [completedTyping, setCompletedTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(true);
  const [answer, setAnswer] = useState('');

  const handleStream = () =>
    handleStreaming({
      api: `${import.meta.env.VITE_BASE_URL}/conversations/${id}/messages`,
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
