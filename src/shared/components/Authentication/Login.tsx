import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as LockSVG } from '#/assets/svg/lock.svg';
import { ReactComponent as SmsSVG } from '#/assets/svg/sms.svg';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';
import { setToken } from '#/shared/utils/token';

function LoginPage() {
  const { t } = useTypeSafeTranslation();
  const navigate = useNavigate();

  // TODO: Integrate with real API
  const handleLogin = (values: { email: string; password: string }) => {
    setToken(`${values.email}-${values.password}`);
    navigate('/');
  };

  return (
    <>
      <Typography.Title className="mb-4 text-primary-color" level={3}>
        👋 {t('authentication.login')}
      </Typography.Title>
      <Form layout="vertical" onFinish={handleLogin} scrollToFirstError>
        <Row align="middle" justify="center">
          <Col span={24}>
            <Form.Item
              label={t('authentication.email')}
              name="email"
              rules={[
                {
                  required: true,
                  type: 'email',
                },
              ]}
            >
              <Input
                className="rounded-lg pr-[1.875rem]"
                placeholder={t('placeholder.email')}
                prefix={<SmsSVG />}
              />
            </Form.Item>
          </Col>
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
                className="rounded-lg"
                placeholder={t('placeholder.password')}
                prefix={<LockSVG />}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Link className="primary" to="/forgot-password">
              {t('authentication.forgotPassword')}
            </Link>
          </Col>
          <Col className="mt-8" span={24}>
            <Form.Item>
              <Button
                block
                className="rounded-lg p-2 font-semibold text-secondary-color"
                htmlType="submit"
                loading={false}
                type="primary"
              >
                {t('button.proceed')}
              </Button>
            </Form.Item>
          </Col>
          <Col className="text-center" span={24}>
            <Link className="primary" to="/sign-up">
              {t('authentication.notHaveAccountYet')}{' '}
              {t('authentication.signUp')}
            </Link>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default LoginPage;
