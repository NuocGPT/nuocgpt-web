import { Checkbox, Form, Input, Modal, Typography } from 'antd';
import { ReactComponent as DislikeIcon } from '#/assets/svg/dislike-rounded.svg';
import { ReactComponent as LikeIcon } from '#/assets/svg/like-rounded.svg';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';

interface ModalFeedbackProps {
  messageId: string;
  isPositive: boolean;
  visible: boolean;
  onClose: () => void;
}

function ModalFeedback({
  messageId,
  isPositive,
  visible,
  onClose,
}: ModalFeedbackProps) {
  const { t } = useTypeSafeTranslation();
  const [form] = Form.useForm();

  const handleFinish = () => {
    console.log(messageId);
  };

  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      cancelButtonProps={{ hidden: true }}
      destroyOnClose
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
      <Form form={form} onFinish={handleFinish}>
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
          <Form.Item name="type" rules={[{ required: true }]}>
            <Checkbox.Group className="flex flex-col gap-2">
              <Checkbox value="1">Điều này có hại/không an toàn</Checkbox>
              <Checkbox className="m-0" value="2">
                Điều này không đúng
              </Checkbox>
              <Checkbox className="m-0" value="3">
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
