import { useSearchParams } from 'react-router-dom';
import VerifyOTP from '#/shared/components/Authentication/VerifyOTP';
import AuthLayout from '#/shared/components/layout/AuthLayout';

function VerifyOTPPage() {
  const [searchParams] = useSearchParams();

  const email = decodeURIComponent(searchParams.get('email') || '');

  return (
    <AuthLayout>
      <VerifyOTP email={email} />
    </AuthLayout>
  );
}

export default VerifyOTPPage;
