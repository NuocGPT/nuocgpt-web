import { useState } from 'react';
import { showError } from '@enouvo/react-uikit';
import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '#/services/auth';
import type { ResetPasswordDto } from '#/services/auth/interfaces';
import { MUTATION } from '#/services/constants';
import { handleShowErrorMessage } from '#/services/utils/resultCodeCheck';
import ResetPasswordForm from './Form';
import ResetPasswordSuccess from './ResetSuccess';

interface ResetPasswordProps {
  verifyToken: string;
}

function ResetPassword({ verifyToken }: ResetPasswordProps) {
  const [hasResetPasswordSuccess, setHasResetPasswordSuccess] = useState(false);

  const { mutate: resetPasswordMutation, isLoading: resetPasswordLoading } =
    useMutation(MUTATION.resetPassword, resetPassword, {
      onError(error: Error) {
        showError(handleShowErrorMessage(error.message));
      },
      onSuccess() {
        setHasResetPasswordSuccess(true);
      },
    });

  const handleResetPassword = (values: ResetPasswordDto) => {
    resetPasswordMutation({ ...values, verify_token: verifyToken });
  };

  return hasResetPasswordSuccess ? (
    <ResetPasswordSuccess />
  ) : (
    <ResetPasswordForm
      loading={resetPasswordLoading}
      onSubmit={handleResetPassword}
    />
  );
}

export default ResetPassword;
