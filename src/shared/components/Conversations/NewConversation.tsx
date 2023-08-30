import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Avatar, Image, Input, Typography } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import { useNavigate } from 'react-router-dom';
import LogoGrey from '#/assets/images/logo-grey.png';
import { ReactComponent as CursorIcon } from '#/assets/svg/cursor.svg';
import GPTAvatar from '#/assets/svg/gpt-avatar.svg';
import { ReactComponent as SendIcon } from '#/assets/svg/send.svg';
import { currentUser } from '#/mocks/users';
import MessageItem from '#/pages/Dashboard/MessageItem';
import { queryClient } from '#/services/client';
import { MUTATION, QUERY } from '#/services/constants';
import { addConversation } from '#/services/conversations';
import {
  AuthorType,
  ConversationType,
} from '#/services/conversations/interfaces';
import { useRenderResponse } from '#/shared/hooks/useRenderResponse';

function NewConversation() {
  const [message, setMessage] = useState('');
  const [disableChat, setDisableChat] = useState(false);
  const navigate = useNavigate();

  const handleFinishRenderResponse = () => {
    setMessage('');
    setDisableChat(false);
    queryClient.invalidateQueries(QUERY.getConversations);
    navigate(`/`);
  };

  const { completedTyping, displayResponse, handleRenderResponse } =
    useRenderResponse({
      onFinish: handleFinishRenderResponse,
    });

  const { mutate: addConversationMutation, isLoading: addConversationLoading } =
    useMutation(
      MUTATION.addConversation,
      () =>
        addConversation({
          author_id: String(currentUser.id),
          message,
          title: 'New Conversation',
        }),
      {
        onSuccess(data) {
          handleRenderResponse(data.content.parts[0]);
        },
      },
    );

  return (
    <>
      <div className="mt-8 max-h-[80vh] overflow-auto pb-28" id="messages">
        {!addConversationLoading && displayResponse ? (
          <>
            <div className="flex">
              <MessageItem
                message={{
                  _id: String(Math.random() * 1000),
                  author: {
                    id: String(currentUser.id),
                    role: AuthorType.USER,
                  },
                  content: {
                    content_type: ConversationType.TEXT,
                    parts: [message],
                  },
                  conversation_id: '',
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
        ) : (
          <div className="mt-[16rem] flex flex-col items-center justify-center">
            <Image height={114} preview={false} src={LogoGrey} />
          </div>
        )}

        {addConversationLoading && (
          <>
            <div className="flex">
              <MessageItem
                message={{
                  _id: String(Math.random() * 1000),
                  author: {
                    id: String(currentUser.id),
                    role: AuthorType.USER,
                  },
                  content: {
                    content_type: ConversationType.TEXT,
                    parts: [message],
                  },
                  conversation_id: '',
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
                    addConversationMutation();
                  }
                }
              }}
              placeholder={'Gửi tin nhắn'}
              size="large"
              suffix={<SendIcon />}
              value={message}
            />
            <Typography.Paragraph className="mt-2 text-center text-xs text-color-neutral-3">
              Xem trước nghiên cứu miễn phí. Mục tiêu của chúng tôi là làm cho
              các hệ thống AI trở nên tự nhiên và an toàn hơn khi tương tác.
              Phản hồi của bạn giúp chúng tôi hoàn thiện hơn.
            </Typography.Paragraph>
          </div>
        </Footer>
      </div>
    </>
  );
}

export default NewConversation;
