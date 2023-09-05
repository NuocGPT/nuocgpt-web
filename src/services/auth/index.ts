import * as fetcher from '../utils/fetcher';
import type {
  ResendVerifyOTPDto,
  ResendVerifyOTPResponse,
  SignInDto,
  SignInResponse,
  SignUpDto,
  SignUpResponse,
  VerifyOTPDto,
  VerifyOTPResponse,
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

async function resendVerifyOTP(resendVerifyOTPInput: ResendVerifyOTPDto) {
  const data = await fetcher.post<ResendVerifyOTPDto, ResendVerifyOTPResponse>(
    `${import.meta.env.VITE_BASE_URL}/auth/resend-verify-otp`,
    {
      ...resendVerifyOTPInput,
    },
  );
  return data;
}

export { signIn, signUp, verifyOTP, resendVerifyOTP };
