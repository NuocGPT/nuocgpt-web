import type { Dispatch, SetStateAction } from 'react';
import { notification } from 'antd';
import { getToken } from './token';

interface Props {
  api: string;
  message: string;
  onFinish: () => void;
  setCompletedTyping: Dispatch<SetStateAction<boolean>>;
  setIsTyping: Dispatch<SetStateAction<boolean>>;
  setAnswer: Dispatch<SetStateAction<string>>;
}

export const handleStreaming = async ({
  api,
  message,
  onFinish,
  setCompletedTyping,
  setIsTyping,
  setAnswer,
}: Props) => {
  const token = getToken();
  const response = await fetch(api, {
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
          onFinish();
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
