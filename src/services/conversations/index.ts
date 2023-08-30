import axios from 'axios';
import type { AddConversationDto, AddMessageDto } from './interfaces';

async function fetchConversations() {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/conversations`,
  );
  return data;
}

async function fetchMessages({ conversationId }: { conversationId?: string }) {
  if (!conversationId) return;
  const { data } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/conversations/${conversationId}/messages`,
  );
  return data;
}

async function addConversation({
  title,
  author_id,
  message,
}: AddConversationDto) {
  const { data } = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/conversations`,
    {
      author_id,
      message,
      title,
    },
  );
  return data;
}

async function addMessage(
  conversationId: string,
  { message, author_id }: AddMessageDto,
) {
  const { data } = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/conversations/${conversationId}/messages`,
    {
      author_id,
      message,
    },
  );
  return data;
}

export { fetchConversations, fetchMessages, addConversation, addMessage };
