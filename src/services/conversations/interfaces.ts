import type { BaseGetAllResponse } from '#/services/common/interfaces';

export interface AddConversationDto {
  title: string | null;
  message: string;
}

export interface UpdateConversationDto {
  title: string | null;
}

export interface AddConversationAnswersDto {
  id: string;
  answer: string;
}

export interface AddConversationResponse {
  _id: string;
  conversation_id: string;
  author: Author;
  content: Content;
  created_at: string;
}

export interface AddMessageDto {
  message: string;
}

export interface AddMessageResponse {
  _id: string;
  conversation_id: string;
  author: Author;
  content: Content;
  created_at: string;
}

export interface Author {
  id: string;
  role: AuthorType;
}

export enum AuthorType {
  USER = 'user',
  SYSTEM = 'system',
}

export enum ConversationType {
  TEXT = 'text',
}

export interface Content {
  content_type: ConversationType;
  parts: string[];
}

export interface Conversation {
  _id: string;
  revision_id: string | null;
  title: string | null;
  author_id: string;
  created_at: string;
  updated_at: string;
}

export interface Message {
  _id: string;
  revision_id: string | null;
  conversation_id: string;
  author: Author;
  content: Content;
  created_at: string;
}

export type Conversations = BaseGetAllResponse<Conversation>;

export type Messages = BaseGetAllResponse<Message>;
