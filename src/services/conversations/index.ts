import * as fetcher from '../utils/fetcher';
import type {
  AddConversationAnswersDto,
  AddConversationDto,
  AddConversationResponse,
  AddMessageDto,
  AddMessageResponse,
  Conversations,
  Messages,
  UpdateConversationDto,
} from './interfaces';

async function fetchConversations({ page = 1 }) {
  const data = await fetcher.get<Conversations>(
    `${import.meta.env.VITE_BASE_URL}/conversations?page=${page}`,
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

async function updateConversation(id: string, title: string) {
  const data = await fetcher.put<UpdateConversationDto, string>(
    `${import.meta.env.VITE_BASE_URL}/conversations/${id}`,
    {
      title,
    },
  );
  return data;
}

async function updateConversationAnswer({
  id,
  answer,
}: {
  id: string;
  answer: string;
}) {
  const data = await fetcher.post<AddConversationAnswersDto, string>(
    `${import.meta.env.VITE_BASE_URL}/conversations/${id}/answers`,
    {
      answer,
      id,
    },
  );
  return data;
}

async function deleteConversation(id: string) {
  const data = await fetcher.remove<string>(
    `${import.meta.env.VITE_BASE_URL}/conversations/${id}`,
  );
  return data;
}

async function fetchSummarizeQuestion({
  conversationId,
}: {
  conversationId?: string;
}) {
  const data = await fetcher.get<string>(
    `${
      import.meta.env.VITE_BASE_URL
    }/conversations/${conversationId}/generate-title`,
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

export {
  fetchConversations,
  fetchMessages,
  addConversation,
  updateConversation,
  deleteConversation,
  addMessage,
  fetchSummarizeQuestion,
  updateConversationAnswer,
};
