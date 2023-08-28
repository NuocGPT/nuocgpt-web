import { useState } from 'react';
import { Button, Typography } from 'antd';
import { ReactComponent as CursorIcon } from '#/assets/svg/cursor.svg';
import { ReactComponent as Dislike } from '#/assets/svg/dislike-outlined.svg';
import GPTAvatar from '#/assets/svg/gpt-avatar.svg';
import { ReactComponent as Like } from '#/assets/svg/like-outlined.svg';
import type { Message } from '#/mocks/interfaces/conversations';
import { currentUser } from '#/mocks/users';
import { Avatar } from '#/shared/components/common';
import ModalPositiveFeedback from './components/ModalFeedback';

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
      <div className="mx-auto flex max-w-[960px] justify-between gap-4 py-4">
        <div className="flex items-start gap-4">
          <Avatar className="flex-shrink-0" size={32} src={GPTAvatar} />
          <CursorIcon />
        </div>
      </div>
    </div>
  ) : (
    <div
      className={`w-full ${message.isGPTResponse ? 'bg-color-neutral-5' : ''}`}
    >
      <div className="mx-auto flex max-w-[960px] justify-between gap-4 py-4">
        <div className="flex items-start gap-4">
          <Avatar
            className="flex-shrink-0"
            size={32}
            src={message.isGPTResponse ? GPTAvatar : currentUser.avatar}
          />
          <Typography.Paragraph className="text-color-neutral-1">
            {message.text}
          </Typography.Paragraph>
        </div>
        {message.isGPTResponse && (
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
      <ModalPositiveFeedback
        isPositive={feedbackType === FeedbackTypes.LIKE}
        messageId={message.id}
        onClose={handleClose}
        visible={!!feedbackType}
      />
    </div>
  );
}

export default MessageItem;
