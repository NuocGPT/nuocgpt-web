import type { Dispatch, SetStateAction } from 'react';
import { showError } from '@enouvo/react-uikit';
import { useMutation } from '@tanstack/react-query';
import { Checkbox, Form, Input, Modal, Typography } from 'antd';
import { ReactComponent as DislikeIcon } from '#/assets/svg/dislike-rounded.svg';
import { ReactComponent as LikeIcon } from '#/assets/svg/like-rounded.svg';
import { MUTATION } from '#/services/constants';
import type { Message } from '#/services/conversations/interfaces';
import { addFeedback } from '#/services/feedbacks';
import type { AddFeedbackDto, Feedback } from '#/services/feedbacks/interfaces';
import { FeedbackTag, Rating } from '#/services/feedbacks/interfaces';
import { handleShowErrorMessage } from '#/services/utils/resultCodeCheck';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';
import { showSuccess } from '#/shared/utils/tools';

interface ModalFeedbackProps {
  message: Message;
  conversationId: string;
  isPositive: boolean;
  visible: boolean;
  onClose: () => void;
  setFeedback?: Dispatch<SetStateAction<Feedback | undefined>>;
}

function ModalFeedback({
  message,
  conversationId,
  isPositive,
  visible,
  onClose,
  setFeedback,
}: ModalFeedbackProps) {
  const { t } = useTypeSafeTranslation();
  const [form] = Form.useForm();

  const text = Form.useWatch('text', form);

  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  const { mutate: addFeedbackMutation, isLoading: addFeedbackLoading } =
    useMutation(MUTATION.addFeedback, addFeedback, {
      onError(error: Error) {
        showError(handleShowErrorMessage(error.message));
      },
      onSuccess(data) {
        setFeedback?.(data as Feedback);
        showSuccess(t('success.title'), t('success.feedback'));
        handleClose();
      },
    });

  const handleFinish = (values: Partial<AddFeedbackDto>) => {
    addFeedbackMutation({
      ...values,
      conversation: {
        id: conversationId,
        title: 'Cuộc trò chuyện mới',
      },
      message: {
        content: message.content.parts[0],
        id: message._id,
      },
      question: {
        content: 'Hello',
        id: message._id,
      },
      rating: isPositive ? Rating.thumbsUp : Rating.thumbsDown,
    });
  };

  return (
    <Modal
      cancelButtonProps={{ hidden: true }}
      destroyOnClose
      okButtonProps={{
        disabled: !text,
        form: 'feedback',
        htmlType: 'submit',
        loading: addFeedbackLoading,
      }}
      okText={t('button.sendFeedback')}
      onCancel={handleClose}
      open={visible}
      title={
        <div className="flex items-center gap-4">
          {isPositive ? <LikeIcon /> : <DislikeIcon />}
          <Typography.Title className="mb-0" level={4}>
            {t('feedback.addFeedback')}
          </Typography.Title>
        </div>
      }
    >
      <Form form={form} name="feedback" onFinish={handleFinish}>
        <Form.Item name="text">
          <Input.TextArea
            className="rounded-lg text-sm"
            placeholder={
              isPositive
                ? t('feedback.placeholder.positive')
                : t('feedback.placeholder.negative')
            }
            rows={4}
          />
        </Form.Item>
        {!isPositive && (
          <Form.Item
            name="tags"
            rules={[{ message: t('validateMessage.feedback'), required: true }]}
          >
            <Checkbox.Group className="flex flex-col gap-2">
              <Checkbox value={FeedbackTag.harmful}>
                {t('feedback.harmful')}
              </Checkbox>
              <Checkbox className="m-0" value={FeedbackTag.false}>
                {t('feedback.false')}
              </Checkbox>
              <Checkbox className="m-0" value={FeedbackTag.notHelpful}>
                {t('feedback.notHelpful')}
              </Checkbox>
            </Checkbox.Group>
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
}

export default ModalFeedback;
