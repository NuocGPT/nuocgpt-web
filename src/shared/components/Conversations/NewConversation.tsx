import { useEffect, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Avatar, Button, Image, Input, Typography } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import { useLocation } from 'react-router-dom';
import LoadingGif from '#/assets/images/loading.gif';
import LogoGrey from '#/assets/images/logo-grey.png';
import { ReactComponent as CursorIcon } from '#/assets/svg/cursor.svg';
import GPTAvatar from '#/assets/svg/gpt-avatar.svg';
import { ReactComponent as SendIcon } from '#/assets/svg/send.svg';
import { queryClient } from '#/services/client';
import { MUTATION, QUERY } from '#/services/constants';
import {
  addConversation,
  addMessage,
  fetchSummarizeQuestion,
} from '#/services/conversations';
import type { Message } from '#/services/conversations/interfaces';
import {
  AuthorType,
  ConversationType,
} from '#/services/conversations/interfaces';
import MessageItem from '#/shared/components/Chat/MessageItem';
import { useRenderResponse } from '#/shared/hooks/useRenderResponse';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';
import { formatDateUTC } from '#/shared/utils/date';
import { scrollToConversationBottom } from '../Chat';

function NewConversation() {
  const { t } = useTypeSafeTranslation();
  const [message, setMessage] = useState('');
  const conversationId = useRef('');
  const [disableChat, setDisableChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [content, setContent] = useState<Message[]>([]);
  const location = useLocation();

  const handleFinishRenderResponse = () => {
    setMessage('');
    setDisableChat(false);
    queryClient.invalidateQueries(QUERY.getConversations).then(() => {
      window.history.replaceState({}, '', `/c/${conversationId.current}`);
    });
  };

  const { completedTyping, displayResponse, handleRenderResponse } =
    useRenderResponse({
      onFinish: handleFinishRenderResponse,
    });

  const user: Message = {
    _id: String(Math.random() * 1000),
    author: {
      id: '',
      role: AuthorType.USER,
    },
    content: {
      content_type: ConversationType.TEXT,
      parts: [message],
    },
    conversation_id: conversationId.current,
    created_at: new Date().toISOString(),
    revision_id: null,
  };

  const {
    mutate: addConversationMutation,
    isLoading: addConversationLoading,
    isError: addConversationError,
  } = useMutation(
    MUTATION.addConversation,
    () =>
      addConversation({
        message,
        title: '',
      }),
    {
      onError() {
        setMessage('');
        setDisableChat(false);
      },
      onSuccess(data) {
        conversationId.current = data?.conversation_id;
        fetchSummarizeQuestion({
          conversationId: data?.conversation_id,
        });
        handleRenderResponse(data?.content?.parts[0]);
        const newContent = content?.concat(data as unknown as Message[]);
        setContent([user, ...newContent]);
      },
    },
  );

  const {
    mutate: addMessageMutation,
    isLoading: addMessageLoading,
    isError: addMessageError,
  } = useMutation(
    MUTATION.addMessage,
    () =>
      addMessage(String(conversationId.current), {
        message,
      }),
    {
      onError() {
        setMessage('');
        scrollToConversationBottom();
        setDisableChat(false);
      },
      onSuccess(data) {
        conversationId.current = data?.conversation_id;
        handleRenderResponse(data.content.parts[0]);
        const newContent = content?.concat(data as unknown as Message[]);
        setContent([user, ...newContent]);
      },
    },
  );

  const renderResponse = (response: string, loading: boolean) => {
    if (!loading && response) {
      return (
        <>
          <div className="flex">
            <MessageItem message={user} />
          </div>
          <div className="w-full bg-color-neutral-5">
            <div className="mx-auto flex max-w-[960px] justify-between gap-4 px-4 py-4 sm:px-0">
              <div className="flex items-start gap-4">
                <Avatar className="flex-shrink-0" size={32} src={GPTAvatar} />
                <Typography.Paragraph className="text-color-neutral-1">
                  {response}
                  {!completedTyping && <CursorIcon />}
                </Typography.Paragraph>
              </div>
            </div>
          </div>
        </>
      );
    }
  };

  const onSendMessage = () =>
    Number(messages?.length) > 0
      ? addMessageMutation()
      : addConversationMutation();

  useEffect(() => {
    if (completedTyping) {
      if (messages.length > 0) {
        setMessages(content);
      } else {
        const newMessage = messages?.concat(content);
        setMessages(newMessage);
      }
      if (location.state === conversationId.current) {
        setMessages([]);
        setContent([]);
      }
    }
  }, [completedTyping, location]); // eslint-disable-line

  const conversationMessages: Message[] = messages.sort(
    (prev, next) =>
      Number(formatDateUTC(prev.created_at)) -
      Number(formatDateUTC(next.created_at)),
  );

  return (
    <>
      <div className="mt-8 max-h-[80vh] overflow-auto pb-28" id="messages">
        {Number(messages?.length) > 0 || displayResponse ? (
          conversationMessages?.map(message => (
            <div
              className="flex"
              key={`${String(Math.random() * 1000)}_${message._id}`}
            >
              <MessageItem message={message} />
            </div>
          ))
        ) : (
          <div className="mt-[16rem] flex flex-col items-center justify-center">
            <Image height={114} preview={false} src={LogoGrey} />
          </div>
        )}

        <div>
          {Number(messages?.length) > 0
            ? renderResponse(displayResponse, addMessageLoading)
            : renderResponse(displayResponse, addConversationLoading)}
        </div>

        {(addConversationLoading || addMessageLoading) && (
          <>
            <div className="flex">
              <MessageItem message={user} />
            </div>
            <div className="mt-2 flex flex-col items-center justify-center py-2">
              <Image height={64} preview={false} src={LoadingGif} />
              {t('common.loadingData')}
            </div>
          </>
        )}

        {(addConversationError || addMessageError) && (
          <div className="mt-2 flex flex-col items-center justify-center bg-info-color-soft py-2">
            {t('error.title')}
          </div>
        )}

        <Footer className="fixed bottom-0 h-40 w-full bg-[#fff] px-4 sm:w-[88vw] sm:px-[50px]">
          <div className="mx-auto max-w-[960px]">
            <Input
              className="rounded-lg p-4 shadow-lg"
              disabled={disableChat}
              onChange={e => {
                setMessage(e.target.value);
              }}
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  if (message) {
                    setDisableChat(true);
                    e.preventDefault();
                    scrollToConversationBottom();
                    onSendMessage();
                  }
                }
              }}
              placeholder={t('placeholder.sendMessage')}
              size="large"
              suffix={
                <Button
                  className="h-fit w-fit border-none p-0"
                  icon={<SendIcon />}
                  onClick={onSendMessage}
                />
              }
              value={disableChat ? '' : message}
            />
            <Typography.Paragraph className="mt-2 text-center text-xs text-color-neutral-3">
              {t('common.description')}
            </Typography.Paragraph>
          </div>
        </Footer>
      </div>
    </>
  );
}

export default NewConversation;
