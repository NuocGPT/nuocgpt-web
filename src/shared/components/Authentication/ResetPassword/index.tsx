import { useState } from 'react';
import type { ResetPasswordDto } from '#/services/auth/interfaces';
import ResetPasswordForm from './Form';
import ResetPasswordSuccess from './ResetSuccess';

function ResetPassword() {
  const [hasResetPasswordSuccess, setHasResetPasswordSuccess] = useState(false);

  const handleResetPassword = (values: ResetPasswordDto) => {
    setHasResetPasswordSuccess(true);
    return values;
  };

  return hasResetPasswordSuccess ? (
    <ResetPasswordSuccess />
  ) : (
    <ResetPasswordForm onSubmit={handleResetPassword} />
  );
}

export default ResetPassword;
