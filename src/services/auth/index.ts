import * as fetcher from '../utils/fetcher';
import type {
  ForgotPasswordDto,
  ResendVerifyOTPDto,
  ResendVerifyOTPResponse,
  ResendVerifySmsOTPDto,
  ResetPasswordDto,
  SignInBySmsDto,
  SignInDto,
  SignInResponse,
  SignUpDto,
  SignUpResponse,
  VerifyOTPDto,
  VerifyOTPForgotPasswordDto,
  VerifyOTPForgotPasswordResponse,
  VerifyOTPResponse,
  VerifySmsOTPDto,
} from './interfaces';

async function signIn(signInInput: SignInDto) {
  const data = await fetcher.post<SignInDto, SignInResponse>(
    `${import.meta.env.VITE_BASE_URL}/auth/sign-in`,
    {
      ...signInInput,
    },
  );
  return data;
}

async function signInBySms(signInInput: SignInBySmsDto) {
  const data = await fetcher.post<SignInBySmsDto, string>(
    `${import.meta.env.VITE_BASE_URL}/auth/sign-in-with-phone-number`,
    {
      ...signInInput,
    },
  );
  return data;
}

async function signUp(signUpInput: SignUpDto) {
  const data = await fetcher.post<SignUpDto, SignUpResponse>(
    `${import.meta.env.VITE_BASE_URL}/auth/sign-up`,
    {
      ...signUpInput,
    },
  );
  return data;
}

async function verifyOTP(verifyOTPInput: VerifyOTPDto) {
  const data = await fetcher.post<VerifyOTPDto, VerifyOTPResponse>(
    `${import.meta.env.VITE_BASE_URL}/auth/verify-otp`,
    {
      ...verifyOTPInput,
    },
  );
  return data;
}

async function verifySmsOTP(verifyOTPInput: VerifySmsOTPDto) {
  const data = await fetcher.post<VerifySmsOTPDto, VerifyOTPResponse>(
    `${import.meta.env.VITE_BASE_URL}/auth/sms_verify-otp`,
    {
      ...verifyOTPInput,
    },
  );
  return data;
}

async function resendVerifyOTP(resendVerifyOTPInput: ResendVerifyOTPDto) {
  const data = await fetcher.post<ResendVerifyOTPDto, ResendVerifyOTPResponse>(
    `${import.meta.env.VITE_BASE_URL}/auth/resend-verify-otp`,
    {
      ...resendVerifyOTPInput,
    },
  );
  return data;
}

async function resendVerifySmsOTP(resendVerifyOTPInput: ResendVerifySmsOTPDto) {
  const data = await fetcher.post<
    ResendVerifySmsOTPDto,
    ResendVerifyOTPResponse
  >(`${import.meta.env.VITE_BASE_URL}/auth/resend-sms-verify-otp`, {
    ...resendVerifyOTPInput,
  });
  return data;
}

async function forgotPassword(forgotPasswordInput: ForgotPasswordDto) {
  const data = await fetcher.post<ForgotPasswordDto, boolean>(
    `${import.meta.env.VITE_BASE_URL}/auth/send-verify-otp-forgot-password`,
    {
      ...forgotPasswordInput,
    },
  );
  return data;
}

async function verifyOTPForgotPassword(
  verifyOTPForgotPasswordInput: VerifyOTPForgotPasswordDto,
) {
  const data = await fetcher.post<
    VerifyOTPForgotPasswordDto,
    VerifyOTPForgotPasswordResponse
  >(`${import.meta.env.VITE_BASE_URL}/auth/verify-otp-forgot-password`, {
    ...verifyOTPForgotPasswordInput,
  });
  return data;
}

async function resetPassword(resetPasswordInput: ResetPasswordDto) {
  const data = await fetcher.post<ResetPasswordDto, boolean>(
    `${import.meta.env.VITE_BASE_URL}/auth/new-password-forgot-password`,
    {
      ...resetPasswordInput,
    },
  );
  return data;
}

export {
  signIn,
  signUp,
  signInBySms,
  verifySmsOTP,
  resendVerifySmsOTP,
  verifyOTP,
  resendVerifyOTP,
  forgotPassword,
  verifyOTPForgotPassword,
  resetPassword,
};
