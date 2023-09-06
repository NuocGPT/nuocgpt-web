import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Avatar, Image, Input, Typography } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
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
    },
  );

  useEffect(() => {
    refetch();
  }, [conversationId, refetch]);

  const { mutate: addMessageMutation, isLoading: addMessageLoading } =
    useMutation(
      MUTATION.addMessage,
      () =>
        addMessage(String(conversationId), {
          message,
        }),
      {
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
              <MessageItem
                message={{
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
                }}
              />
            </div>
            <div className={`w-full bg-color-neutral-5`}>
              <div className="mx-auto flex max-w-[960px] justify-between gap-4 py-4">
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
              <MessageItem
                message={{
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
                }}
              />
            </div>
            <div className="flex">
              <MessageItem />
            </div>
          </>
        )}
      </div>
      <Footer className="fixed bottom-0 h-40 w-[88vw] bg-[#fff]">
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
            placeholder={'Gửi tin nhắn'}
            size="large"
            suffix={<SendIcon />}
            value={disableChat ? '' : message}
          />
          <Typography.Paragraph className="mt-2 text-center text-xs text-color-neutral-3">
            Xem trước nghiên cứu miễn phí. Mục tiêu của chúng tôi là làm cho các
            hệ thống AI trở nên tự nhiên và an toàn hơn khi tương tác. Phản hồi
            của bạn giúp chúng tôi hoàn thiện hơn.
          </Typography.Paragraph>
        </div>
      </Footer>
    </>
  ) : (
    <NotFoundPage />
  );
}

export default Chat;
