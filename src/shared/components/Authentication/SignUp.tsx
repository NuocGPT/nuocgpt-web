import { useState } from 'react';
import { showError } from '@enouvo/react-uikit';
import { useMutation } from '@tanstack/react-query';
import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as CheckSVG } from '#/assets/svg/check-circle.svg';
import { ReactComponent as LockSVG } from '#/assets/svg/lock.svg';
import { ReactComponent as SmsSVG } from '#/assets/svg/sms.svg';
import { ReactComponent as TickSVG } from '#/assets/svg/tick-circle.svg';
import { signUp } from '#/services/auth';
import type { SignUpDto, SignUpResponse } from '#/services/auth/interfaces';
import { MUTATION } from '#/services/constants';
import { handleShowErrorMessage } from '#/services/utils/resultCodeCheck';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';
import { showSuccess } from '#/shared/utils/tools';
import { StyledCard } from './styles';

function SignUp() {
  const { t } = useTypeSafeTranslation();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [conditions, setConditions] = useState({
    length: false,
    lowercase: false,
    specialCharacter: false,
    uppercase: false,
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;

    // Check password conditions
    setConditions({
      length: newPassword.length >= 8,
      lowercase: /[a-z]/.test(newPassword),
      specialCharacter: /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(newPassword),
      uppercase: /[A-Z]/.test(newPassword),
    });

    setPassword(newPassword);
  };

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
    signUpMutation({
      email: values.email,
      password: password?.trim(),
    });
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
              className="mb-2"
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
              ]}
            >
              <Input.Password
                className="rounded-lg border-color-neutral-3"
                onChange={handlePasswordChange}
                placeholder={t('placeholder.password')}
                prefix={<LockSVG />}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <StyledCard className="mb-4 rounded-lg border-color-neutral-3">
              <Typography.Text className="mb-2 block text-color-neutral-1">
                {t('validateMessage.password.hint')}
              </Typography.Text>
              <div>
                <Typography.Text
                  className={`mb-2 flex items-center gap-1 ${
                    conditions.length
                      ? 'text-success-color'
                      : 'text-color-neutral-1'
                  }`}
                >
                  {conditions.length ? <TickSVG /> : <CheckSVG />}
                  {t('validateMessage.password.atLeastLength')}
                </Typography.Text>
                <Typography.Text
                  className={`mb-2 flex items-center gap-1 ${
                    conditions.lowercase && conditions.uppercase
                      ? 'text-success-color'
                      : 'text-color-neutral-1'
                  }`}
                >
                  {conditions.lowercase && conditions.uppercase ? (
                    <TickSVG />
                  ) : (
                    <CheckSVG />
                  )}{' '}
                  {t('validateMessage.password.lowercaseAndUppercase')}
                </Typography.Text>
                <Typography.Text
                  className={`mb-2 flex items-center gap-1 ${
                    conditions.specialCharacter
                      ? 'text-success-color'
                      : 'text-color-neutral-1'
                  }`}
                >
                  {conditions.specialCharacter ? <TickSVG /> : <CheckSVG />}
                  {t('validateMessage.password.specialCharacter')}
                </Typography.Text>
              </div>
            </StyledCard>
          </Col>
          <Col className="text-center" span={24}>
            <Typography.Text className="pr-2">
              {t('authentication.alreadyHaveAccount')}
            </Typography.Text>
            <Link className="primary underline" to="/login">
              {t('authentication.login')}
            </Link>
          </Col>
          <Col className="mt-4" span={24}>
            <Form.Item>
              <Button
                block
                className="rounded-lg p-2 font-semibold text-secondary-color"
                disabled={
                  !conditions.lowercase ||
                  !conditions.specialCharacter ||
                  !conditions.uppercase
                }
                htmlType="submit"
                loading={signUpLoading}
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

export default SignUp;
