import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { ReactComponent as LockSVG } from '#/assets/svg/lock.svg';
import type { ResetPasswordDto } from '#/services/auth/interfaces';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';
import {
  getConfirmPasswordRules,
  getPasswordRules,
} from '#/shared/utils/validations';

interface ResetPasswordFormProps {
  onSubmit: (values: ResetPasswordDto) => void;
}

function ResetPasswordForm({ onSubmit }: ResetPasswordFormProps) {
  const { t } = useTypeSafeTranslation();

  return (
    <>
      <Typography.Title className="mb-4 text-primary-color" level={3}>
        🔐 {t('authentication.resetPassword')}
      </Typography.Title>
      <Form layout="vertical" onFinish={onSubmit} scrollToFirstError>
        <Row align="middle" justify="center">
          <Col span={24}>
            <Form.Item
              label={t('authentication.password')}
              name="password"
              rules={[
                {
                  required: true,
                  whitespace: true,
                },
                ...getPasswordRules(),
              ]}
            >
              <Input.Password
                className="rounded-lg pr-[1.875rem]"
                placeholder={t('placeholder.password')}
                prefix={<LockSVG />}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              dependencies={['password']}
              label={t('authentication.confirmPassword')}
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  whitespace: true,
                },
                ...getConfirmPasswordRules('password'),
              ]}
            >
              <Input.Password
                className="rounded-lg pr-[1.875rem]"
                placeholder={t('placeholder.password')}
                prefix={<LockSVG />}
              />
            </Form.Item>
          </Col>
          <Col className="mt-2" span={24}>
            <Form.Item>
              <Button
                block
                className="rounded-lg p-2 font-semibold text-secondary-color"
                htmlType="submit"
                loading={false}
                type="primary"
              >
                {t('authentication.resetPassword')}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default ResetPasswordForm;
