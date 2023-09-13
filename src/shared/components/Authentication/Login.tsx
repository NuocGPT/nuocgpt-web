import { useRef } from 'react';
import { showError } from '@enouvo/react-uikit';
import { useMutation } from '@tanstack/react-query';
import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as LockSVG } from '#/assets/svg/lock.svg';
import { ReactComponent as SmsSVG } from '#/assets/svg/sms.svg';
import { signIn } from '#/services/auth';
import type { SignInDto, SignInResponse } from '#/services/auth/interfaces';
import { MUTATION } from '#/services/constants';
import {
  ErrorMessage,
  handleShowErrorMessage,
} from '#/services/utils/resultCodeCheck';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';
import { setIsAdmin, setToken } from '#/shared/utils/token';

function LoginPage() {
  const { t } = useTypeSafeTranslation();
  const email = useRef('');
  const navigate = useNavigate();
  const { mutate: signInMutation, isLoading: signInLoading } = useMutation(
    MUTATION.signIn,
    signIn,
    {
      onError(error: Error) {
        showError(handleShowErrorMessage(error.message));
        if (error.message === ErrorMessage.UserNotVerified) {
          navigate(`/verify-otp?email=${email.current}`);
        }
      },
      onSuccess(data: SignInResponse) {
        const isAdminRole = data.roles.includes('admin');
        if (isAdminRole) {
          setIsAdmin('admin');
        }
        setToken(data.access_token);
        navigate(`/`);
      },
    },
  );

  const handleLogin = (values: SignInDto) => {
    email.current = values.email;
    signInMutation(values);
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
                loading={signInLoading}
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
