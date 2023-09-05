export interface SignInDto {
  email: string;
  password: string;
}

export interface SignInResponse {
  access_token: string;
}

export interface SignUpDto {
  email: string;
  password: string;
}

export interface SignUpResponse {
  email: string;
  id: string;
}

export interface VerifyOTPDto {
  email: string;
  verify_code: string;
}

export interface VerifyOTPResponse {
  access_token: string;
}

export interface ResendVerifyOTPDto {
  email: string;
}

export interface ResendVerifyOTPResponse {
  verify_code: string;
}
