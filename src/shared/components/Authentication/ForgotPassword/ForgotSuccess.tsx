import { Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as CheckMailSVG } from '#/assets/svg/check-mail.svg';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';

interface ForgotPasswordSuccessProps {
  email: string;
}

function ForgotPasswordSuccess({ email }: ForgotPasswordSuccessProps) {
  const { t } = useTypeSafeTranslation();
  const navigate = useNavigate();

  const handleRedirectToVerifyOTPPage = () => {
    navigate(`/verify-otp?email=${encodeURIComponent(email)}&type=forgot`);
  };

  return (
    <>
      <div className="mb-4 flex justify-center">
        <CheckMailSVG className="text-center" />
      </div>
      <Typography.Title
        className="mb-4 text-center text-primary-color"
        level={3}
      >
        {t('authentication.checkMail')}
      </Typography.Title>
      <Typography.Paragraph className="text-center text-base text-color-neutral-2">
        {t('authentication.checkMailDescription', {
          email,
        })}
      </Typography.Paragraph>
      <Button
        block
        className="rounded-lg p-2 font-semibold text-secondary-color"
        onClick={handleRedirectToVerifyOTPPage}
        type="primary"
      >
        {t('button.enterOTP')}
      </Button>
    </>
  );
}

export default ForgotPasswordSuccess;
