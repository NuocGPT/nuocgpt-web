import * as fetcher from '../utils/fetcher';
import type {
  AddConversationDto,
  AddConversationResponse,
  AddMessageDto,
  AddMessageResponse,
  Conversations,
  Messages,
} from './interfaces';

async function fetchConversations() {
  const data = await fetcher.get<Conversations>(
    `${import.meta.env.VITE_BASE_URL}/conversations`,
  );
  return data;
}

async function fetchMessages({ conversationId }: { conversationId?: string }) {
  if (!conversationId) return;
  const data = await fetcher.get<Messages>(
    `${import.meta.env.VITE_BASE_URL}/conversations/${conversationId}/messages`,
  );
  return data;
}

async function addConversation(addConversationInput: AddConversationDto) {
  const data = await fetcher.post<AddConversationDto, AddConversationResponse>(
    `${import.meta.env.VITE_BASE_URL}/conversations`,
    {
      ...addConversationInput,
    },
  );
  return data;
}

async function addMessage(conversationId: string, { message }: AddMessageDto) {
  const data = await fetcher.post<AddMessageDto, AddMessageResponse>(
    `${import.meta.env.VITE_BASE_URL}/conversations/${conversationId}/messages`,
    {
      message,
    },
  );
  return data;
}

export { fetchConversations, fetchMessages, addConversation, addMessage };
