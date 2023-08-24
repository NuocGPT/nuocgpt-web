export interface Message {
  id: string;
  text: string;
  createdAt: string;
  isGPTResponse: boolean;
}

export interface Conversation {
  id: string;
  name: string;
  createdAt: string;
  messages: Message[];
}
