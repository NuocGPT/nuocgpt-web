import { showError } from '@enouvo/react-uikit';
import { useMutation } from '@tanstack/react-query';
import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as LockSVG } from '#/assets/svg/lock.svg';
import { ReactComponent as SmsSVG } from '#/assets/svg/sms.svg';
import { signUp } from '#/services/auth';
import type { SignUpDto, SignUpResponse } from '#/services/auth/interfaces';
import { MUTATION } from '#/services/constants';
import { handleShowErrorMessage } from '#/services/utils/resultCodeCheck';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';
import { showSuccess } from '#/shared/utils/tools';
import { getPasswordRules } from '#/shared/utils/validations';

function SignUp() {
  const { t } = useTypeSafeTranslation();
  const navigate = useNavigate();
  const { mutate: signUpMutation, isLoading: signUpLoading } = useMutation(
    MUTATION.signUp,
    signUp,
    {
      onError(error: Error) {
        showError(handleShowErrorMessage(error.message));
      },
      onSuccess(data: SignUpResponse) {
        showSuccess(t('success.title'), t('success.signUp'));
        navigate(`/verify-otp?email=${encodeURIComponent(data?.email)}`);
      },
    },
  );

  const handleSignUp = (values: SignUpDto) => {
    signUpMutation(values);
  };

  return (
    <>
      <Typography.Title className="mb-4 text-primary-color" level={3}>
        {t('authentication.signUp')}
      </Typography.Title>
      <Form layout="vertical" onFinish={handleSignUp} scrollToFirstError>
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
                  message: t('error.required.title'),
                  required: true,
                  whitespace: true,
                },
                ...getPasswordRules(),
              ]}
            >
              <Input.Password
                className="rounded-lg"
                placeholder={t('placeholder.password')}
                prefix={<LockSVG />}
              />
            </Form.Item>
          </Col>
          <Col className="text-center" span={24}>
            <Typography.Text className="pr-2">
              {t('authentication.alreadyHaveAccount')}
            </Typography.Text>
            <Link className="primary underline" to="/login">
              {t('authentication.login')}
            </Link>
          </Col>
          <Col className="mt-8" span={24}>
            <Form.Item>
              <Button
                block
                className="rounded-lg p-2 font-semibold text-secondary-color"
                htmlType="submit"
                loading={signUpLoading}
                type="primary"
              >
                {t('button.proceed')}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default SignUp;
