import { useState } from 'react';
import CheckOutlined from '@ant-design/icons/lib/icons/CheckOutlined';
import CloseOutlined from '@ant-design/icons/lib/icons/CloseOutlined';
import DeleteOutlined from '@ant-design/icons/lib/icons/DeleteOutlined';
import EditOutlined from '@ant-design/icons/lib/icons/EditOutlined';
import { Button, Input, Modal, Tooltip, Typography } from 'antd';
import { Trans } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ChatIcon } from '#/assets/svg/chat.svg';
import type { Conversation } from '#/services/conversations/interfaces';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';
import { truncateText } from '#/shared/utils/tools';

interface Props {
  id: string;
  conversationId: string;
  conversations: Conversation[];
  onClose?: () => void;
}

function ConversationItem({
  id,
  conversationId,
  conversations,
  onClose,
}: Props) {
  const { t } = useTypeSafeTranslation();
  const navigate = useNavigate();
  const [editingMessageId, setEditingMessageId] = useState<string>();
  const [editedText, setEditedText] = useState('');

  const handleEditClick = (messageId: string, messageText: string) => {
    setEditingMessageId(messageId);
    setEditedText(messageText);
  };

  const handleEditSave = () => {
    if (editedText.trim() !== '') {
      setEditingMessageId(undefined);
      setEditedText('');
    }
  };

  const handleDelete = (id: string, title: string | null) => {
    Modal.confirm({
      cancelText: t('button.cancel'),
      centered: true,
      closable: true,
      content: (
        <Typography.Text>
          <Trans
            components={{
              b: <strong />,
            }}
            i18nKey={t('conversation.deleteContent', {
              title: String(title),
            })}
          />
        </Typography.Text>
      ),
      icon: false,
      maskClosable: true,
      onOk() {
        console.log('Delete successfully!');
      },
      title: t('conversation.deleteTitle'),
    });
  };

  const onNavigateToChat = (conversationId: string) => {
    if (id !== conversationId) {
      navigate(`/c/${conversationId}`);
      onClose?.();
    }
  };

  return (
    <div>
      {conversations.map(conversation => (
        <Typography.Text
          className={`flex cursor-pointer items-center gap-2 rounded-lg ${
            id === conversation._id || conversationId === conversation._id
              ? 'bg-primary-color-light-10'
              : ''
          } p-2 text-secondary-color`}
          key={conversation._id}
          onClick={() => onNavigateToChat(conversation._id)}
        >
          <div className="w-fit">
            <ChatIcon />
          </div>
          {editingMessageId === conversation._id ? (
            <>
              <div className="w-36">
                <Input
                  autoFocus
                  className="bg-transparent p-0 text-sm text-secondary-color"
                  onChange={e => setEditedText(e.target.value)}
                  type="text"
                  value={editedText}
                />
              </div>
              <div className="flex w-9 items-center gap-1">
                <Button
                  className="h-fit w-fit border-none bg-transparent text-secondary-color shadow-none"
                  icon={<CheckOutlined />}
                  onClick={handleEditSave}
                />
                <Button
                  className="h-fit w-fit border-none bg-transparent text-secondary-color shadow-none"
                  icon={<CloseOutlined />}
                  onClick={handleEditSave}
                />
              </div>
            </>
          ) : (
            <>
              <div className="w-36">
                {conversation.title ? (
                  <Tooltip placement="left" title={conversation.title}>
                    {truncateText(String(conversation.title), 17)}
                  </Tooltip>
                ) : (
                  t('conversation.newTitle')
                )}
              </div>

              {id === conversation._id && (
                <div className="flex w-9 items-center gap-1">
                  <Button
                    className="h-fit w-fit border-none bg-transparent text-secondary-color shadow-none"
                    icon={<EditOutlined />}
                    onClick={() =>
                      handleEditClick(
                        conversation._id,
                        String(conversation?.title),
                      )
                    }
                  />
                  <Button
                    className="h-fit w-fit border-none bg-transparent text-secondary-color shadow-none"
                    icon={<DeleteOutlined />}
                    onClick={() =>
                      handleDelete(conversation._id, conversation.title)
                    }
                  />
                </div>
              )}
            </>
          )}
        </Typography.Text>
      ))}
    </div>
  );
}

export default ConversationItem;
