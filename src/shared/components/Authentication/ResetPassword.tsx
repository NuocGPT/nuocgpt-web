import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { ReactComponent as LockSVG } from '#/assets/svg/lock.svg';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';

function ResetPassword() {
  const { t } = useTypeSafeTranslation();

  const handleResetPassword = () => {
    const values = {};
    return values;
  };

  return (
    <>
      <Typography.Title className="mb-4 text-primary-color" level={3}>
        🔐 {t('authentication.resetPassword')}
      </Typography.Title>
      <Form layout="vertical" onFinish={handleResetPassword} scrollToFirstError>
        <Row align="middle" justify="center">
          <Col span={24}>
            <Form.Item
              label={t('authentication.password')}
              name="password"
              rules={[
                {
                  required: true,
                },
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
              label={t('authentication.confirmPassword')}
              name="confirmPassword"
              rules={[
                {
                  required: true,
                },
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

export default ResetPassword;
