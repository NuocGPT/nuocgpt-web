import { useState } from 'react';
import { notification } from 'antd';
import { STREAM_MESSAGES_API } from '../utils/constant';
import { getToken } from '../utils/token';

interface Props {
  message: string;
  onFinish: () => void;
}

export const useHandleStreamMessages = ({ message, onFinish }: Props) => {
  const [completedTyping, setCompletedTyping] = useState(false);
  const [answer, setAnswer] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const handleStream = async () => {
    const token = getToken();
    const response = await fetch(STREAM_MESSAGES_API, {
      body: JSON.stringify({
        message,
      }),
      headers: {
        Accept: 'text/event-stream',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

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
    setCompletedTyping,
    setIsTyping,
  };
};
