import { useLocation } from 'react-router-dom';
import VerifySmsOTP from '#/shared/components/Authentication/VerifySmsOTP';
import AuthLayout from '#/shared/components/layout/AuthLayout';

function VerifySmsOTPPage() {
  const { search } = useLocation();
  const phoneNumber = search.split('=')?.[1];

  return (
    <AuthLayout>
      <VerifySmsOTP phoneNumber={phoneNumber} />
    </AuthLayout>
  );
}

export default VerifySmsOTPPage;
