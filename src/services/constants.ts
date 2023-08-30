import type { QueryKey } from '@tanstack/react-query';

export const QUERY: Record<string, QueryKey> = {
  getConversations: ['GET_CONVERSATIONS'],
  getMessages: ['GET_MESSAGES'],
};

export const MUTATION = {
  addConversation: ['ADD_CONVERSATION'],
  addFeedback: ['ADD_FEEDBACK'],
  addMessage: ['ADD_MESSAGE'],
  updateFeedback: ['UPDATE_FEEDBACK'],
};
