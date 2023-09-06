import { useState } from 'react';
import type { ForgotPasswordDto } from '#/services/auth/interfaces';
import ForgotPasswordSuccess from './ForgotSuccess';
import ForgotPasswordForm from './Form';

function ForgotPassword() {
  const [hasSentForgotPasswordRequest, setHasSentForgotPasswordRequest] =
    useState(false);
  const [email, setEmail] = useState('');

  const handleForgotPassword = ({ email }: ForgotPasswordDto) => {
    setEmail(email);
    setHasSentForgotPasswordRequest(true);
    return email;
  };

  return hasSentForgotPasswordRequest ? (
    <ForgotPasswordSuccess email={email} />
  ) : (
    <ForgotPasswordForm onSubmit={handleForgotPassword} />
  );
}

export default ForgotPassword;
