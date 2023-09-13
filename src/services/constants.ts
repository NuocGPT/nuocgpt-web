import type { QueryKey } from '@tanstack/react-query';

export const QUERY: Record<string, QueryKey> = {
  getConversations: ['GET_CONVERSATIONS'],
  getCountRatings: ['GET_COUNT_RATINGS'],
  getFeedbacks: ['GET_FEEDBACKS'],
  getMe: ['GET_ME'],
  getMessages: ['GET_MESSAGES'],
};

export const MUTATION = {
  addConversation: ['ADD_CONVERSATION'],
  addFeedback: ['ADD_FEEDBACK'],
  addMessage: ['ADD_MESSAGE'],
  resendVerifyOTP: ['RESEND_VERIFY_OTP'],
  resetPassword: ['RESET_PASSWORD'],
  sendVerifyOTPForgotPassword: ['SEND_VERIFY_OTP_FORGOT_PASSWORD'],
  signIn: ['SIGN_IN'],
  signUp: ['SIGN_UP'],
  updateFeedback: ['UPDATE_FEEDBACK'],
  verifyOTP: ['VERIFY_OTP'],
  verifyOTPForgotPassword: ['VERIFY_OTP_FORGOT_PASSWORD'],
};
