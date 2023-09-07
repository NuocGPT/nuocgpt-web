export enum ResponseStatusAPI {
  SuccessOK = 200,
  Unauthorized = 401,
  TokenExpired = 403,
  ValidationError = 422,
  ServerError = 500,
}

export enum ErrorMessage {
  IncorrectEmailOrPassword = 'INCORRECT_EMAIL_OR_PASSWORD',
  UserNotVerified = 'USER_NOT_VERIFIED',
  EmailAlreadyExists = 'EMAIL_ALREADY_EXISTS',
  OTPIncorrectOrExpired = 'OTP_INCORRECT_OR_EXPIRED',
  TokenInvalidOrExpired = 'TOKEN_INVALID_OR_EXPIRED',
  UserNotFound = 'USER_NOT_FOUND',
}

export const handleShowErrorMessage = (message: string) => {
  if (message === ErrorMessage.UserNotVerified) {
    return 'Tài khoản chưa được xác thực';
  }
  if (message === ErrorMessage.EmailAlreadyExists) {
    return 'Email đã tồn tại';
  }
  if (message === ErrorMessage.OTPIncorrectOrExpired) {
    return 'OTP không hợp lệ hoặc đã hết hạn';
  }
  if (message === ErrorMessage.TokenInvalidOrExpired) {
    return 'Token không hợp lệ hoặc đã hết hạn';
  }
  if (message === ErrorMessage.IncorrectEmailOrPassword) {
    return 'Email hoặc mật khẩu không chính xác';
  }
  if (message === ErrorMessage.UserNotFound) {
    return 'Tài khoản không tồn tại';
  }
  return message;
};

export const resultCodeCheck = async (res: Response) => {
  let response;
  if (res.status === ResponseStatusAPI.Unauthorized) {
    response = {
      message: res.statusText,
      status: res.status,
    };
    // can put another logic to handle different status code here
  } else {
    response = await res.json();
    response.status = res.status;
  }
  return response;
};
