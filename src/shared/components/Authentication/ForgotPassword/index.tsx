import { useState } from 'react';
import { showError } from '@enouvo/react-uikit';
import { useMutation } from '@tanstack/react-query';
import { forgotPassword } from '#/services/auth';
import type { ForgotPasswordDto } from '#/services/auth/interfaces';
import { MUTATION } from '#/services/constants';
import { handleShowErrorMessage } from '#/services/utils/resultCodeCheck';
import ForgotPasswordSuccess from './ForgotSuccess';
import ForgotPasswordForm from './Form';

function ForgotPassword() {
  const [hasSentForgotPasswordRequest, setHasSentForgotPasswordRequest] =
    useState(false);
  const [email, setEmail] = useState('');

  const { mutate: forgotPasswordMutation, isLoading: forgotPasswordLoading } =
    useMutation(MUTATION.sendVerifyOTPForgotPassword, forgotPassword, {
      onError(error: Error) {
        showError(handleShowErrorMessage(error.message));
      },
      onSuccess() {
        setHasSentForgotPasswordRequest(true);
      },
    });

  const handleForgotPassword = ({ email }: ForgotPasswordDto) => {
    setEmail(email);
    forgotPasswordMutation({ email });
  };

  return hasSentForgotPasswordRequest ? (
    <ForgotPasswordSuccess email={email} />
  ) : (
    <ForgotPasswordForm
      loading={forgotPasswordLoading}
      onSubmit={handleForgotPassword}
    />
  );
}

export default ForgotPassword;
