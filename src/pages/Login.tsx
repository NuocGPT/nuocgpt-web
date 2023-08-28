/*
 * import Icon from '@ant-design/icons';
 * import styled from '@emotion/styled';
 */
import { Button, Card, Col, Form, Input, Row, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { ReactComponent as LockSVG } from '#/assets/svg/lock.svg';
import { ReactComponent as SmsSVG } from '#/assets/svg/sms.svg';
import AuthLayout from '#/shared/components/layout/AuthLayout';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';

/*
 * const FormWrapper = styled.div`
 *   label {
 *     font-size: 1.125rem;
 *     font-weight: 600;
 *     color: rgb(7, 6, 50);
 *     line-height: 1.5rem;
 *   }
 *   .ant-input-affix-wrapper {
 *     border: 0.063rem solid #d4d2f450;
 *     border-radius: 0.5rem;
 *     padding: 0 0.625rem 0 0.625rem;
 *     input {
 *       padding: 0.75rem 1rem;
 *       padding-left: 0.313rem;
 *     }
 *   }
 *   .ant-btn-lg {
 *     height: 100%;
 *   }
 * `;
 */

function LoginForm() {
  const { t } = useTypeSafeTranslation();

  return (
    <>
      <Form layout="vertical" onFinish={() => null} scrollToFirstError>
        <Row align="middle" justify="center">
          <Col span={24}>
            <Form.Item
              label={t('login.email')}
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
              label={t('login.password')}
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
              {t('login.forgotPassword')}
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
                {t('login.loginBtn')}
              </Button>
            </Form.Item>
          </Col>
          <Col className="text-center" span={24}>
            <Link className="primary" to="/sign-up">
              Không có tài khoản? Đăng ký
            </Link>
          </Col>
        </Row>
      </Form>
    </>
  );
}

function Login() {
  const { t } = useTypeSafeTranslation();
  return (
    <AuthLayout>
      <Row align="middle" className="h-full" justify="start">
        <Card className="w-full border-0 p-0">
          <Typography.Title className="mb-4 text-primary-color" level={3}>
            👋 {t('login.subTitle')}
          </Typography.Title>
          <LoginForm />
        </Card>
      </Row>
    </AuthLayout>
  );
}

export default Login;
