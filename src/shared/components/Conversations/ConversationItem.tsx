import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import CloseOutlined from '@ant-design/icons/lib/icons/CloseOutlined';
import DeleteOutlined from '@ant-design/icons/lib/icons/DeleteOutlined';
import EditOutlined from '@ant-design/icons/lib/icons/EditOutlined';
import { Button, Input, Modal, Tooltip, Typography } from 'antd';
import { Trans } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ChatIcon } from '#/assets/svg/chat.svg';
import { ReactComponent as CheckIcon } from '#/assets/svg/check.svg';
import { queryClient } from '#/services/client';
import { QUERY } from '#/services/constants';
import {
  deleteConversation,
  updateConversation,
} from '#/services/conversations';
import type { Conversation } from '#/services/conversations/interfaces';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';
import { truncateText } from '#/shared/utils/tools';
import { ActionWrapper, TitleWrapper } from './styles';

interface Props {
  id: string;
  conversationId: string;
  conversations: Conversation[];
  conversationItems: Conversation[];
  onClose?: () => void;
  setConversationItems: Dispatch<SetStateAction<Conversation[]>>;
}

function ConversationItem({
  id,
  conversationId,
  conversations,
  onClose,
  conversationItems,
  setConversationItems,
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
    const updatedItems = conversationItems?.map(item => {
      if (item._id === conversationId) {
        return { ...item, title: editedText };
      }
      return item;
    });
    updateConversation(conversationId, editedText).then(() => {
      setConversationItems(updatedItems);
      queryClient.invalidateQueries(QUERY.getConversations);
    });
  };

  const onCancel = () => {
    setEditingMessageId(undefined);
    setEditedText('');
  };

  const handleDelete = (id: string, title: string | null) => {
    Modal.confirm({
      cancelButtonProps: {
        className:
          'rounded-lg bg-color-neutral-5 border-none font-bold px-4 py-2 h-fit',
      },
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
      okButtonProps: {
        className:
          'rounded-lg bg-error-color border-none font-bold px-4 py-2 h-fit',
      },
      okText: t('button.delete'),
      onOk() {
        deleteConversation(id).then(() => {
          queryClient.refetchQueries(QUERY.getConversations);
          setConversationItems(prevItems =>
            prevItems?.filter(item => item._id !== id),
          );
        });
      },
      title: t('conversation.deleteTitle'),
    });
  };

  const onNavigateToChat = (conversationId: string) => {
    if (id !== conversationId) {
      navigate(`/c/${conversationId}`);
      onClose?.();
      setEditingMessageId(undefined);
      setEditedText('');
    }
  };

  return (
    <div>
      {conversations?.map(conversation => (
        <Typography.Text
          className={`my-1 flex min-h-[42px] cursor-pointer items-center gap-1 rounded-lg hover:bg-primary-color-light-10 ${
            id === conversation?._id || conversationId === conversation?._id
              ? 'bg-primary-color-light-10'
              : ''
          } p-2 text-secondary-color`}
          key={conversation?._id}
          onClick={() => onNavigateToChat(conversation?._id)}
        >
          <div className="w-fit">
            <ChatIcon />
          </div>
          {editingMessageId === conversation?._id ? (
            <>
              <div className="w-48">
                <Input
                  autoFocus
                  className="bg-transparent p-0 text-sm text-secondary-color"
                  onChange={e => setEditedText(e.target.value)}
                  onKeyPress={e => {
                    if (e.key === 'Enter') {
                      if (editedText && editedText.trim() !== '') {
                        e.preventDefault();
                        handleEditSave();
                      }
                    }
                  }}
                  type="text"
                  value={editedText}
                />
              </div>
              <div className="flex items-center gap-1">
                <Button
                  className="h-fit w-fit border-none bg-transparent text-secondary-color shadow-none"
                  icon={<CheckIcon />}
                  onClick={handleEditSave}
                />
                <Button
                  className="h-fit w-fit border-none bg-transparent text-secondary-color shadow-none"
                  icon={<CloseOutlined className="text-base" />}
                  onClick={onCancel}
                />
              </div>
            </>
          ) : (
            <>
              <TitleWrapper className="w-48 overflow-auto whitespace-nowrap">
                {conversation.title ? (
                  <Tooltip
                    overlayClassName="max-w-[37rem]"
                    placement="left"
                    title={conversation.title}
                  >
                    {truncateText(conversation.title, 30)}
                  </Tooltip>
                ) : (
                  t('conversation.newTitle')
                )}
              </TitleWrapper>

              {id === conversation._id && (
                <ActionWrapper className="flex items-center gap-1">
                  <Button
                    className="h-fit w-fit border-none bg-transparent text-secondary-color shadow-none"
                    icon={<EditOutlined className="text-base" />}
                    onClick={() =>
                      handleEditClick(
                        conversation._id,
                        String(conversation?.title),
                      )
                    }
                  />
                  <Button
                    className="h-fit w-fit border-none bg-transparent text-secondary-color shadow-none"
                    icon={<DeleteOutlined className="text-base" />}
                    onClick={() =>
                      handleDelete(conversation._id, conversation.title)
                    }
                  />
                </ActionWrapper>
              )}
            </>
          )}
        </Typography.Text>
      ))}
    </div>
  );
}

export default ConversationItem;
