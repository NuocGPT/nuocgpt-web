import { useEffect, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Avatar, Button, Image, Input, Typography } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingGif from '#/assets/images/loading.gif';
import LogoGrey from '#/assets/images/logo-grey.png';
import GPTAvatar from '#/assets/svg/gpt-avatar.svg';
import { ReactComponent as SendIcon } from '#/assets/svg/send.svg';
import { queryClient } from '#/services/client';
import { MUTATION, QUERY } from '#/services/constants';
import {
  addConversation,
  fetchSummarizeQuestion,
  updateConversationAnswer,
} from '#/services/conversations';
import type { Message } from '#/services/conversations/interfaces';
import {
  AuthorType,
  ConversationType,
} from '#/services/conversations/interfaces';
import MessageItem from '#/shared/components/Chat/MessageItem';
import { useHandleStreamMessages } from '#/shared/hooks/useHandleStreamMessages';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';
import { scrollToConversationBottom } from '../Chat';

function Conversation() {
  const { t } = useTypeSafeTranslation();
  const [message, setMessage] = useState('');
  const conversationId = useRef('');
  const [disableChat, setDisableChat] = useState(false);
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFinishRenderResponse = () => {
    queryClient.invalidateQueries(QUERY.getConversations).then(() => {
      // window.history.replaceState({}, '', `/c/${conversationId.current}`);

      navigate(`/c/${conversationId.current}`);
    });
  };

  const {
    answer,
    completedTyping,
    handleStream,
    setCompletedTyping,
    setIsTyping,
  } = useHandleStreamMessages({
    message,
    onFinish() {
      setDisableChat(false);
    },
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

  const { mutate: addConversationMutation, isError: addConversationError } =
    useMutation(
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
        onSettled: handleStream,
        onSuccess(data) {
          conversationId.current = data?._id;
          fetchSummarizeQuestion({
            conversationId: data?._id,
          });
        },
      },
    );

  const { mutate: updateConversationAnswerMutation } = useMutation(
    MUTATION.updateConversationAnswer,
    () =>
      updateConversationAnswer({
        answer,
        id: conversationId?.current,
      }),
    {
      onError() {
        setMessage('');
        setDisableChat(false);
      },
      onSuccess() {
        scrollToConversationBottom();
        handleFinishRenderResponse();
        setCompletedTyping(false);
      },
    },
  );

  const renderResponse = (response: string) => {
    if (response) {
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
                </Typography.Paragraph>
              </div>
            </div>
          </div>
        </>
      );
    }
    return (
      <div className="mt-[16rem] flex flex-col items-center justify-center">
        <Image height={114} preview={false} src={LogoGrey} />
      </div>
    );
  };

  const onSendMessage = () => {
    setLoading(true);
    setDisableChat(true);
    setIsTyping(true);
    addConversationMutation();
  };

  useEffect(() => {
    if (completedTyping) {
      setDisableChat(false);
      updateConversationAnswerMutation();
    }
    if (answer) {
      setLoading(false);
    }
  }, [completedTyping, location, answer]); // eslint-disable-line

  return (
    <>
      <div className="mt-8 max-h-[80vh] overflow-auto pb-28" id="messages">
        <div>{renderResponse(answer)}</div>

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

        {addConversationError && (
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
                  if (message && message.trim() !== '') {
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
                  className="h-fit w-fit border-none bg-transparent p-0"
                  disabled={message.length === 0 || message.trim() === ''}
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

export default Conversation;