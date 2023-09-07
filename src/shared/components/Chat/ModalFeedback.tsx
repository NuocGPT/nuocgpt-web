import { showError } from '@enouvo/react-uikit';
import { useMutation } from '@tanstack/react-query';
import { Checkbox, Form, Input, Modal, Typography } from 'antd';
import { ReactComponent as DislikeIcon } from '#/assets/svg/dislike-rounded.svg';
import { ReactComponent as LikeIcon } from '#/assets/svg/like-rounded.svg';
import { MUTATION } from '#/services/constants';
import { addFeedback } from '#/services/feedbacks';
import type { AddFeedbackDto } from '#/services/feedbacks/interfaces';
import { FeedbackTag, Rating } from '#/services/feedbacks/interfaces';
import { handleShowErrorMessage } from '#/services/utils/resultCodeCheck';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';
import { showSuccess } from '#/shared/utils/tools';

interface ModalFeedbackProps {
  messageId: string;
  conversationId: string;
  isPositive: boolean;
  visible: boolean;
  onClose: () => void;
}

function ModalFeedback({
  messageId,
  conversationId,
  isPositive,
  visible,
  onClose,
}: ModalFeedbackProps) {
  const { t } = useTypeSafeTranslation();
  const [form] = Form.useForm();
  const { mutate: addFeedbackMutation, isLoading: addFeedbackLoading } =
    useMutation(MUTATION.addMessage, addFeedback, {
      onError(error: Error) {
        showError(handleShowErrorMessage(error.message));
      },
      onSuccess() {
        showSuccess('Thành công!', 'Gửi phản hồi thành công');
        onClose();
      },
    });

  const handleFinish = (values: Partial<AddFeedbackDto>) => {
    addFeedbackMutation({
      ...values,
      conversation_id: conversationId,
      message_id: messageId,
      rating: isPositive ? Rating.thumbsUp : Rating.thumbsDown,
    });
  };

  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      cancelButtonProps={{ hidden: true }}
      destroyOnClose
      okButtonProps={{
        form: 'feedback',
        htmlType: 'submit',
        loading: addFeedbackLoading,
      }}
      okText={t('button.confirm')}
      onCancel={handleClose}
      open={visible}
      title={
        <div className="flex items-center gap-4">
          {isPositive ? <LikeIcon /> : <DislikeIcon />}
          <Typography.Title className="mb-0" level={4}>
            Cung cấp phản hồi bổ sung
          </Typography.Title>
        </div>
      }
    >
      <Form form={form} name="feedback" onFinish={handleFinish}>
        <Form.Item name="text" rules={[{ required: true }]}>
          <Input.TextArea
            className="rounded-lg"
            placeholder={
              isPositive
                ? 'Bạn thích gì về câu trả lời?'
                : 'Vấn đề với câu trả lời là gì? Làm thế nào để câu trả lời có thể được cải thiện?            '
            }
            rows={4}
          />
        </Form.Item>
        {!isPositive && (
          <Form.Item name="tags" rules={[{ required: true }]}>
            <Checkbox.Group className="flex flex-col gap-2">
              <Checkbox value={FeedbackTag.harmful}>
                Điều này có hại/không an toàn
              </Checkbox>
              <Checkbox className="m-0" value={FeedbackTag.false}>
                Điều này không đúng
              </Checkbox>
              <Checkbox className="m-0" value={FeedbackTag.notHelpful}>
                Điều này không hữu ích
              </Checkbox>
            </Checkbox.Group>
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
}

export default ModalFeedback;