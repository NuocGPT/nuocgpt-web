import { useState } from 'react';
import { Button, Typography } from 'antd';
import { ReactComponent as CursorIcon } from '#/assets/svg/cursor.svg';
import { ReactComponent as Dislike } from '#/assets/svg/dislike-outlined.svg';
import GPTAvatar from '#/assets/svg/gpt-avatar.svg';
import { ReactComponent as Like } from '#/assets/svg/like-outlined.svg';
import type { Message } from '#/services/conversations/interfaces';
import { AuthorType } from '#/services/conversations/interfaces';
import { type Feedback, Rating } from '#/services/feedbacks/interfaces';
import { Avatar } from '#/shared/components/common';
import { getAvatar } from '#/shared/utils/token';
import ModalFeedback from './ModalFeedback';

interface MessageProps {
  message?: Message;
}

export enum FeedbackTypes {
  LIKE = 'LIKE',
  DISLIKE = 'DISLIKE',
}

function MessageItem({ message }: MessageProps) {
  const [feedbackType, setFeedbackType] = useState<FeedbackTypes | undefined>(
    undefined,
  );
  const [feedback, setFeedback] = useState<Feedback>();
  const avatar = getAvatar();

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
          <Avatar className="flex-shrink-0" size={32} src={avatar} />
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
              message.author?.role === AuthorType.SYSTEM ? GPTAvatar : avatar
            }
          />
          <Typography.Paragraph className="text-color-neutral-1">
            {message.content?.parts?.[0]}
          </Typography.Paragraph>
        </div>
        {message.author?.role === AuthorType.SYSTEM && (
          <div className="flex items-start justify-start">
            {feedback ? (
              <Button
                className="bg-primary-color-light-20 text-secondary-color"
                size="small"
                type="text"
              >
                {feedback.rating === Rating.thumbsUp ? <Like /> : <Dislike />}
              </Button>
            ) : (
              <>
                <Button
                  onClick={handleCreatePositiveFeedback}
                  size="small"
                  type="text"
                >
                  <Like />
                </Button>
                <Button
                  onClick={handleCreateNegativeFeedback}
                  size="small"
                  type="text"
                >
                  <Dislike />
                </Button>
              </>
            )}
          </div>
        )}
      </div>
      <ModalFeedback
        conversationId={message.conversation_id}
        isPositive={feedbackType === FeedbackTypes.LIKE}
        message={message}
        onClose={handleClose}
        setFeedback={setFeedback}
        visible={!!feedbackType}
      />
    </div>
  );
}

export default MessageItem;
