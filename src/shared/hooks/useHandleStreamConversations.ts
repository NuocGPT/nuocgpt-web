import { useState } from 'react';
import { notification } from 'antd';
import { getToken } from '../utils/token';

interface Props {
  message: string;
  onFinish?: () => void;
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

  const handleStream = async () => {
    const token = getToken();
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/conversations/${id}/messages`,
      {
        body: JSON.stringify({
          message,
        }),
        headers: {
          Accept: 'text/event-stream',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      },
    );

    const stream = response.body;
    const reader = stream?.getReader();
    let chunkAnswer = '';

    const readChunk = () => {
      reader
        ?.read()
        .then(({ value, done }) => {
          if (done) {
            onFinish?.();
            setCompletedTyping(true);
            setIsTyping(false);
            return;
          }
          const chunkString = new TextDecoder().decode(value);
          chunkAnswer += chunkString;
          setAnswer(chunkAnswer);
          readChunk();
        })
        .catch(error => {
          notification.error({
            message: error,
          });
        });
    };

    readChunk();
  };

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
