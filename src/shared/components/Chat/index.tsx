import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Avatar, Button, Image, Input, Typography } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import LoadingGif from '#/assets/images/loading.gif';
import LogoGrey from '#/assets/images/logo-grey.png';
import { ReactComponent as CursorIcon } from '#/assets/svg/cursor.svg';
import GPTAvatar from '#/assets/svg/gpt-avatar.svg';
import { ReactComponent as SendIcon } from '#/assets/svg/send.svg';
import NotFoundPage from '#/pages/404';
import { queryClient } from '#/services/client';
import { MUTATION, QUERY } from '#/services/constants';
import { addMessage, fetchMessages } from '#/services/conversations';
import type { Message } from '#/services/conversations/interfaces';
import {
  AuthorType,
  ConversationType,
} from '#/services/conversations/interfaces';
import { useRenderResponse } from '#/shared/hooks/useRenderResponse';
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
  const { completedTyping, displayResponse, handleRenderResponse } =
    useRenderResponse({
      onFinish: () => {
        setMessage('');
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

  useEffect(() => {
    refetch();
  }, [conversationId, refetch]);

  const {
    mutate: addMessageMutation,
    isLoading: addMessageLoading,
    isError: addMessageError,
  } = useMutation(
    MUTATION.addMessage,
    () =>
      addMessage(String(conversationId), {
        message,
      }),
    {
      onError() {
        setMessage('');
        scrollToConversationBottom();
        setDisableChat(false);
      },
      onSuccess(data) {
        handleRenderResponse(data.content.parts[0]);
      },
    },
  );

  const conversationMessages: Message[] =
    fetchMessagesResponse?.items?.sort(
      (prev, next) =>
        Number(new Date(prev.created_at)) - Number(new Date(next.created_at)),
    ) ?? [];

  const handleAddMessage = () => {
    if (conversationId) {
      scrollToConversationBottom();
      addMessageMutation();
    }
  };

  return conversationMessages ? (
    <>
      <div className="mt-8 max-h-[80vh] overflow-auto pb-28" id="messages">
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

        {displayResponse && (
          <>
            <div className="flex">
              <MessageItem message={user} />
            </div>
            <div className={`w-full bg-color-neutral-5`}>
              <div className="mx-auto flex max-w-[960px] justify-between gap-4 px-4 py-4 sm:px-0">
                <div className="flex items-start gap-4">
                  <Avatar className="flex-shrink-0" size={32} src={GPTAvatar} />
                  <Typography.Paragraph className="text-color-neutral-1">
                    {displayResponse}
                    {!completedTyping && <CursorIcon />}
                  </Typography.Paragraph>
                </div>
              </div>
            </div>
          </>
        )}

        {addMessageLoading && (
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
                  handleAddMessage();
                }
              }
            }}
            placeholder={t('placeholder.sendMessage')}
            size="large"
            suffix={
              <Button
                className="h-fit w-fit border-none p-0"
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
