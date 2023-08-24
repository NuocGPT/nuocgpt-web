import { Button, Typography } from 'antd';
import { ReactComponent as Dislike } from '#/assets/svg/dislike-outlined.svg';
import GPTAvatar from '#/assets/svg/gpt-avatar.svg';
import { ReactComponent as Like } from '#/assets/svg/like-outlined.svg';
import type { Message } from '#/mocks/interfaces/conversations';
import { currentUser } from '#/mocks/users';
import { Avatar } from '#/shared/components/common';

interface MessageProps {
  message: Message;
}

function MessageItem({ message }: MessageProps) {
  return (
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
        <div className="flex items-start justify-start">
          <Button size="small" type="link">
            <Like />
          </Button>
          <Button size="small" type="link">
            <Dislike />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MessageItem;
