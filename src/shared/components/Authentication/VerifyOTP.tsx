import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { showError } from '@enouvo/react-uikit';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, Typography } from 'antd';
import OTPInput from 'react-otp-input';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as LockOTPSVG } from '#/assets/svg/lock-otp.svg';
import { resendVerifyOTP, verifyOTP } from '#/services/auth';
import type {
  VerifyOTPDto,
  VerifyOTPResponse,
} from '#/services/auth/interfaces';
import { MUTATION } from '#/services/constants';
import { useCountdownTimer } from '#/shared/hooks/useCountdownTimer';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';
import { setToken } from '#/shared/utils/token';
import { showSuccess } from '#/shared/utils/tools';

export const StyledOTPInput = styled.div`
  .otp-input {
    font-size: 1.5rem;
    color: var(--neutral-color-1);
    border-radius: 0.5rem;
    border: 0.0625rem solid #bab6be;
    width: 100% !important;
    height: 4rem;

    flex-shrink: 1;
    &:hover {
      border: 0.125rem solid var(--primary-color);
    }
  }
`;

interface VerifyOTPProps {
  email: string;
}

function VerifyOTP({ email }: VerifyOTPProps) {
  const { t } = useTypeSafeTranslation();
  const navigate = useNavigate();
  const [verifyCode, setVerifyCode] = useState<string>('');
  const { counter, resetCounter } = useCountdownTimer();
  const { mutate: verifyOTPMutation, isLoading: verifyOTPLoading } =
    useMutation(MUTATION.verifyOTP, verifyOTP, {
      onError() {
        showError('Đã có lỗi xảy ra!');
      },
      onSuccess(data: VerifyOTPResponse) {
        showSuccess('Thành công', 'Xác thực thành công!');
        setToken(data.access_token);
        navigate(`/`);
      },
    });

  const { mutate: resendOTPMutation, isLoading: resendOTPLoading } =
    useMutation(MUTATION.resendVerifyOTP, resendVerifyOTP, {
      onError() {
        showError('Đã có lỗi xảy ra!');
      },
      onSuccess() {
        resetCounter();
        showSuccess('Thành công', 'Gửi lại mã xác thực thành công!');
      },
    });

  useEffect(() => {
    if (!email) {
      navigate('/');
    }
  }, [email, navigate]);

  const handleVerifyOTP = (values: VerifyOTPDto) => {
    verifyOTPMutation({
      ...values,
      email,
    });
  };

  const handleResendOTP = () => {
    resendOTPMutation({ email });
  };

  return (
    <>
      <div className="mb-4 flex justify-center">
        <LockOTPSVG className="text-center" />
      </div>
      <Typography.Title
        className="mb-4 text-center text-primary-color"
        level={3}
      >
        {t('authentication.inputOTP')}
      </Typography.Title>
      <Typography.Paragraph className="text-center text-base text-color-neutral-2">
        {t('authentication.inputOTPDescription')}
      </Typography.Paragraph>
      <Form layout="vertical" onFinish={handleVerifyOTP} scrollToFirstError>
        <StyledOTPInput>
          <Form.Item name="verify_code" rules={[{ required: true }]}>
            <OTPInput
              containerStyle={{
                gap: '1.25rem',
                justifyContent: 'space-between',
              }}
              inputStyle="otp-input"
              numInputs={6}
              onChange={otp => setVerifyCode(otp)}
              renderInput={props => <input {...props} />}
              shouldAutoFocus
              value={verifyCode}
            />
          </Form.Item>
        </StyledOTPInput>
        <Form.Item>
          <Button
            block
            className="rounded-lg p-2 font-semibold text-secondary-color"
            disabled={!verifyCode || verifyCode?.length < 6}
            htmlType="submit"
            loading={verifyOTPLoading || resendOTPLoading}
            type="primary"
          >
            {t('button.proceed')}
          </Button>
        </Form.Item>
        <div className="flex items-center justify-center gap-2">
          {t('authentication.notReceiveOTP')}
          <Button
            className="p-0 text-sm"
            disabled={counter >= 0}
            onClick={handleResendOTP}
            type="link"
          >
            {counter !== -1
              ? t('authentication.resendAfterSeconds', {
                  seconds: String(counter),
                })
              : t('authentication.resendOTP')}
          </Button>
        </div>
      </Form>
    </>
  );
}

export default VerifyOTP;
