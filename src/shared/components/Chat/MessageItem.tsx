import { useState } from 'react';
import { Button, Typography } from 'antd';
import AvocadoAvatar from '#/assets/images/avocado.png';
import { ReactComponent as CursorIcon } from '#/assets/svg/cursor.svg';
import { ReactComponent as DislikeIcon } from '#/assets/svg/dislike-colour-md.svg';
import { ReactComponent as Dislike } from '#/assets/svg/dislike-outlined.svg';
import GPTAvatar from '#/assets/svg/gpt-avatar.svg';
import { ReactComponent as LikeIcon } from '#/assets/svg/like-colour-md.svg';
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
  const defaultAvatar = avatar ?? AvocadoAvatar;

  const handleCreatePositiveFeedback = () => {
    setFeedbackType(FeedbackTypes.LIKE);
  };

  const handleCreateNegativeFeedback = () => {
    setFeedbackType(FeedbackTypes.DISLIKE);
  };

  const handleClose = () => {
    setFeedbackType(undefined);
  };

  const content = message?.content?.parts?.[0];
  const hasNumberItem = content?.includes('1. **') || content?.includes(': 1.');

  const paragraphs = hasNumberItem
    ? content?.split(/\d+\.\s/)
    : content?.split('\n');

  return !message ? (
    <div className="w-full bg-color-neutral-5">
      <div className="mx-auto flex max-w-[960px] justify-between gap-4 px-4 py-4 sm:px-0">
        <div className="flex items-start gap-4">
          <Avatar className="flex-shrink-0" size={32} src={defaultAvatar} />
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
      <div className="mx-auto flex max-w-[960px] justify-between gap-4 px-4 py-4 xl:px-0">
        <div className="flex items-start gap-4">
          <Avatar
            className="flex-shrink-0"
            size={32}
            src={
              message.author?.role === AuthorType.SYSTEM
                ? GPTAvatar
                : defaultAvatar
            }
          />
          <div className="block">
            {paragraphs
              ?.filter(paragraph => paragraph.trim() !== '')
              ?.map((paragraph, index) => (
                <Typography.Paragraph
                  className="block text-color-neutral-1"
                  key={index}
                >
                  {index >= 1 && hasNumberItem && `${index}.`} {paragraph}
                </Typography.Paragraph>
              ))}
          </div>
        </div>
        {message.author?.role === AuthorType.SYSTEM && (
          <div className="flex items-start justify-start">
            {feedback ? (
              <Button className="bg-transparent" size="small" type="text">
                {feedback.rating === Rating.thumbsUp ? (
                  <LikeIcon />
                ) : (
                  <DislikeIcon />
                )}
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
