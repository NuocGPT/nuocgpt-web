import { useSearchParams } from 'react-router-dom';
import VerifyOTP from '#/shared/components/Authentication/VerifyOTP';
import AuthLayout from '#/shared/components/layout/AuthLayout';

function VerifyOTPPage() {
  const [searchParams] = useSearchParams();

  const email = decodeURIComponent(searchParams.get('email') || '');
  const type = searchParams.get('type') || '';

  const isForgotPassword = type === 'forgot';

  return (
    <AuthLayout>
      <VerifyOTP email={email} isForgotPassword={isForgotPassword} />
    </AuthLayout>
  );
}

export default VerifyOTPPage;
