import { useState } from 'react';
import { Button, Typography } from 'antd';
import { ReactComponent as CursorIcon } from '#/assets/svg/cursor.svg';
import { ReactComponent as Dislike } from '#/assets/svg/dislike-outlined.svg';
import GPTAvatar from '#/assets/svg/gpt-avatar.svg';
import { ReactComponent as Like } from '#/assets/svg/like-outlined.svg';
import type { Message } from '#/services/conversations/interfaces';
import { AuthorType } from '#/services/conversations/interfaces';
import { Avatar } from '#/shared/components/common';
import { DEFAULT_AVATAR } from '#/shared/utils/constant';
import ModalFeedback from './ModalFeedback';

interface MessageProps {
  message?: Message;
}

enum FeedbackTypes {
  LIKE = 'LIKE',
  DISLIKE = 'DISLIKE',
}

function MessageItem({ message }: MessageProps) {
  const [feedbackType, setFeedbackType] = useState<FeedbackTypes | undefined>(
    undefined,
  );

  const handleCreatePositiveFeedback = () => {
    setFeedbackType(FeedbackTypes.LIKE);
  };

  const handleCreateNegativeFeedback = () => {
    setFeedbackType(FeedbackTypes.DISLIKE);
  };

  const handleClose = () => {
    setFeedbackType(undefined);
  };

  return !message ? (
    <div className="w-full bg-color-neutral-5">
      <div className="mx-auto flex max-w-[960px] justify-between gap-4 px-4 py-4 sm:px-0">
        <div className="flex items-start gap-4">
          <Avatar className="flex-shrink-0" size={32} src={GPTAvatar} />
          <CursorIcon />
        </div>
      </div>
    </div>
  ) : (
    <div
      className={`w-full ${
        message.author?.role === AuthorType.SYSTEM ? 'bg-color-neutral-5' : ''
      }`}
    >
      <div className="mx-auto flex max-w-[960px] justify-between gap-4 px-4 py-4 sm:px-0">
        <div className="flex items-start gap-4">
          <Avatar
            className="flex-shrink-0"
            size={32}
            src={
              message.author?.role === AuthorType.SYSTEM
                ? GPTAvatar
                : DEFAULT_AVATAR
            }
          />
          <Typography.Paragraph className="text-color-neutral-1">
            {message.content?.parts?.[0]}
          </Typography.Paragraph>
        </div>
        {message.author?.role === AuthorType.SYSTEM && (
          <div className="flex items-start justify-start">
            <Button
              onClick={handleCreatePositiveFeedback}
              size="small"
              type="link"
            >
              <Like />
            </Button>
            <Button
              onClick={handleCreateNegativeFeedback}
              size="small"
              type="link"
            >
              <Dislike />
            </Button>
          </div>
        )}
      </div>
      <ModalFeedback
        conversationId={message.conversation_id}
        isPositive={feedbackType === FeedbackTypes.LIKE}
        message={message}
        onClose={handleClose}
        visible={!!feedbackType}
      />
    </div>
  );
}

export default MessageItem;
