import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { ReactComponent as SmsSVG } from '#/assets/svg/sms.svg';
import type { ForgotPasswordDto } from '#/services/auth/interfaces';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';

interface ForgotPasswordFormProps {
  onSubmit: (values: ForgotPasswordDto) => void;
  loading: boolean;
}

function ForgotPasswordForm({ onSubmit, loading }: ForgotPasswordFormProps) {
  const { t } = useTypeSafeTranslation();

  return (
    <>
      <Typography.Title className="mb-4 text-primary-color" level={3}>
        {t('authentication.forgotPassword')}
      </Typography.Title>
      <Typography.Paragraph className="text-color-neutral-2">
        {t('authentication.forgotPasswordDescription')}
      </Typography.Paragraph>
      <Form layout="vertical" onFinish={onSubmit} scrollToFirstError>
        <Row align="middle" justify="center">
          <Col span={24}>
            <Form.Item
              label={t('authentication.email')}
              name="email"
              rules={[
                {
                  message: t('error.required.email'),
                  required: true,
                  type: 'email',
                },
              ]}
            >
              <Input
                className="rounded-lg border-color-neutral-3 pr-[1.875rem]"
                placeholder={t('placeholder.email')}
                prefix={<SmsSVG />}
              />
            </Form.Item>
          </Col>
          <Col className="mt-2" span={24}>
            <Form.Item>
              <Button
                block
                className="rounded-lg p-2 font-semibold text-secondary-color"
                htmlType="submit"
                loading={loading}
                type="primary"
              >
                {t('button.continue')}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default ForgotPasswordForm;
