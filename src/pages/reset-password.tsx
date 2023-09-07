import { useSearchParams } from 'react-router-dom';
import ResetPassword from '#/shared/components/Authentication/ResetPassword';
import AuthLayout from '#/shared/components/layout/AuthLayout';

function ResetPasswordPage() {
  const [searchParams] = useSearchParams();

  const verifyToken = decodeURIComponent(
    searchParams.get('verify_token') || '',
  );

  return (
    <AuthLayout>
      <ResetPassword verifyToken={verifyToken} />
    </AuthLayout>
  );
}

export default ResetPasswordPage;
