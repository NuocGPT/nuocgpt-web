import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Avatar, Button, Image, Input, Typography } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import LoadingGif from '#/assets/images/loading.gif';
import LogoGrey from '#/assets/images/logo-grey.png';
import GPTAvatar from '#/assets/svg/gpt-avatar.svg';
import { ReactComponent as SendIcon } from '#/assets/svg/send.svg';
import NotFoundPage from '#/pages/404';
import { queryClient } from '#/services/client';
import { MUTATION, QUERY } from '#/services/constants';
import {
  fetchMessages,
  updateConversationAnswer,
} from '#/services/conversations';
import type { Message } from '#/services/conversations/interfaces';
import {
  AuthorType,
  ConversationType,
} from '#/services/conversations/interfaces';
import { useHandleStreamConversations } from '#/shared/hooks/useHandleStreamConversations';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';
import MessageItem from './MessageItem';

export const scrollToConversationBottom = () => {
  const conversation = document.getElementById('messages');
  if (conversation) {
    conversation.scrollTo({
      behavior: 'smooth',
      top: conversation.scrollHeight,
    });
  }
};

interface ChatProps {
  conversationId: string;
}

function Chat({ conversationId }: ChatProps) {
  const { t } = useTypeSafeTranslation();
  const [message, setMessage] = useState('');
  const [disableChat, setDisableChat] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    answer: messageAnswer,
    completedTyping: messageCompletedTyping,
    handleStream: messageHandleStream,
    setCompletedTyping: messageSetCompletedTyping,
    setAnswer,
  } = useHandleStreamConversations({
    id: conversationId,
    message,
    onFinish() {
      queryClient.invalidateQueries(QUERY.getMessages);
      scrollToConversationBottom();
      setDisableChat(false);
    },
  });

  const { data: fetchMessagesResponse, refetch } = useQuery(
    QUERY.getMessages,
    () => fetchMessages({ conversationId }),
    {
      enabled: !!conversationId,
      onSuccess() {
        setTimeout(() => {
          scrollToConversationBottom();
        }, 100);
      },
      staleTime: 300000,
    },
  );

  const user = {
    _id: String(Math.random() * 1000),
    author: {
      id: '',
      role: AuthorType.USER,
    },
    content: {
      content_type: ConversationType.TEXT,
      parts: [message],
    },
    conversation_id: String(conversationId),
    created_at: new Date().toISOString(),
    revision_id: null,
  };

  const {
    mutate: updateConversationAnswerMessageMutation,
    isError: addMessageError,
  } = useMutation(
    MUTATION.updateConversationAnswer,
    () =>
      updateConversationAnswer({
        answer: messageAnswer,
        id: conversationId,
      }),
    {
      onError() {
        setMessage('');
        setDisableChat(false);
      },
      onSuccess() {
        scrollToConversationBottom();
        messageSetCompletedTyping(false);
        setMessage('');
        setAnswer('');
        setLoading(false);
      },
    },
  );

  useEffect(() => {
    if (messageAnswer) {
      setLoading(false);
    }
  }, [messageAnswer]);

  useEffect(() => {
    if (messageCompletedTyping) {
      updateConversationAnswerMessageMutation();
    }
    refetch();
  }, [
    refetch,
    messageCompletedTyping,
    conversationId,
    updateConversationAnswerMessageMutation,
  ]);

  const conversationMessages: Message[] =
    fetchMessagesResponse?.items?.sort(
      (prev, next) =>
        Number(new Date(prev.created_at)) - Number(new Date(next.created_at)),
    ) ?? [];

  const handleAddMessage = () => {
    if (conversationId) {
      scrollToConversationBottom();
      setDisableChat(true);
      messageHandleStream();
      setLoading(true);
    }
  };

  return conversationMessages ? (
    <>
      <div
        className="mt-8 max-h-[75vh] min-h-[75vh] overflow-auto pb-28"
        id="messages"
      >
        {conversationMessages?.length > 0 ? (
          conversationMessages?.map(message => (
            <div className="flex" key={message._id}>
              <MessageItem message={message} />
            </div>
          ))
        ) : (
          <div className="mt-[16rem] flex flex-col items-center justify-center">
            <Image height={114} preview={false} src={LogoGrey} />
          </div>
        )}

        {messageAnswer && (
          <>
            <div className="flex">
              <MessageItem message={user} />
            </div>
            <div className="w-full bg-color-neutral-5 px-4">
              <div className="mx-auto flex max-w-[960px] justify-between gap-4 px-4 py-4 sm:px-0">
                <div className="flex items-start gap-4">
                  <Avatar className="flex-shrink-0" size={32} src={GPTAvatar} />
                  <Typography.Paragraph className="text-color-neutral-1">
                    {messageAnswer}
                  </Typography.Paragraph>
                </div>
              </div>
            </div>
          </>
        )}

        {loading && (
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

        {addMessageError && (
          <div className="mt-2 flex flex-col items-center justify-center bg-info-color-soft py-2">
            {t('error.title')}
          </div>
        )}
      </div>
      <Footer className="bottom-0 mx-auto h-40 w-full max-w-[1000px] bg-secondary-color px-[50px] xl:px-4">
        <div className="">
          <Input
            className="rounded-lg p-4 shadow-lg"
            disabled={disableChat}
            onChange={e => {
              setMessage(e.target.value);
            }}
            onKeyPress={e => {
              if (e.key === 'Enter') {
                if (message && message?.trim() !== '') {
                  e.preventDefault();
                  handleAddMessage();
                }
              }
            }}
            placeholder={t('placeholder.sendMessage')}
            size="large"
            suffix={
              <Button
                className="h-fit w-fit border-none bg-transparent p-0"
                disabled={message?.length === 0 || message?.trim() === ''}
                icon={<SendIcon />}
                onClick={() => handleAddMessage()}
              />
            }
            value={disableChat ? '' : message}
          />
          <Typography.Paragraph className="mt-2 text-center text-xs text-color-neutral-3">
            {t('common.description')}
          </Typography.Paragraph>
        </div>
      </Footer>
    </>
  ) : (
    <NotFoundPage />
  );
}

export default Chat;
