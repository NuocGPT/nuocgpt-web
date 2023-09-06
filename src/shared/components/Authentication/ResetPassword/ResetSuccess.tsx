import { Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as LockOTPSVG } from '#/assets/svg/lock-otp.svg';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';

function ResetPasswordSuccess() {
  const { t } = useTypeSafeTranslation();
  const navigate = useNavigate();

  const handleRedirectToLoginPage = () => {
    navigate(`/login`);
  };

  return (
    <>
      <div className="mb-4 flex justify-center">
        <LockOTPSVG className="text-center" />
      </div>
      <Typography.Paragraph className="text-center text-base text-color-neutral-2">
        {t('authentication.passwordUpdated')}
      </Typography.Paragraph>
      <Button
        block
        className="rounded-lg p-2 font-semibold text-secondary-color"
        onClick={handleRedirectToLoginPage}
        type="primary"
      >
        {t('button.login')}
      </Button>
    </>
  );
}

export default ResetPasswordSuccess;
