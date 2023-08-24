import type { Conversation } from './interfaces/conversations';

export const conversations: Conversation[] = [
  {
    createdAt: '2022-01-01T00:00:00.000Z',
    id: '0',
    messages: [],
    name: 'Cuộc trò chuyện mới',
  },
  {
    createdAt: '2023-01-01T00:00:00.000Z',
    id: '1',
    messages: [
      {
        createdAt: '2023-01-01T00:00:00.000Z',
        id: '1',
        isGPTResponse: false,
        text: 'What is NuocGPT?',
      },
      {
        createdAt: '2023-01-01T00:01:00.000Z',
        id: '2',
        isGPTResponse: true,
        text: 'NuocGPT is looking for a tech partner to build the conversational UI that answers questions about water and climate in Vietnam, with a specific focus on salinity intrusion. To retrieve information and answer questions, NuocGPT will leverage Large Language Models.',
      },
      {
        createdAt: '2023-01-01T00:02:00.000Z',
        id: '3',
        isGPTResponse: false,
        text: 'Who are target audiences?',
      },
      {
        createdAt: '2023-01-01T00:03:00.000Z',
        id: '4',
        isGPTResponse: true,
        text: 'Farmer-entrepreneurs and Users at Mekong River Delta',
      },
      {
        createdAt: '2023-01-01T00:04:00.000Z',
        id: '5',
        isGPTResponse: false,
        text: 'What are User Needs and Goals?',
      },
      {
        createdAt: '2023-01-01T00:05:00.000Z',
        id: '6',
        isGPTResponse: true,
        text: 'User authenticates (“logging in”) and interfaces with our system through a client-facing UI. There should be a chat component that allows the user to type in questions (called “prompts") related to water and climate (in Vietnamese or English). The user prompt is sent to a backend server for processing; our backend server can scan the user prompt for malicious or unsupported prompts. The backend server sends the user prompt to a QA retrieval service and k most relevant QA pairs are retrieved and added to the prompt. The augmented prompt is sent over the LLMs to generate a response. The generated response is sent to a critique model to evaluate whether it conforms with our policy guidelines; the final response is returned to the user. The user can choose to log the prompt and response together with the feedback to a log database; these collected data can be used to train and finetune and evaluate our future models.',
      },
      {
        createdAt: '2023-01-01T00:00:00.000Z',
        id: '7',
        isGPTResponse: false,
        text: 'What is NuocGPT?',
      },
      {
        createdAt: '2023-01-01T00:01:00.000Z',
        id: '8',
        isGPTResponse: true,
        text: 'NuocGPT is looking for a tech partner to build the conversational UI that answers questions about water and climate in Vietnam, with a specific focus on salinity intrusion. To retrieve information and answer questions, NuocGPT will leverage Large Language Models.',
      },
      {
        createdAt: '2023-01-01T00:02:00.000Z',
        id: '9',
        isGPTResponse: false,
        text: 'Who are target audiences?',
      },
      {
        createdAt: '2023-01-01T00:03:00.000Z',
        id: '10',
        isGPTResponse: true,
        text: 'Farmer-entrepreneurs and Users at Mekong River Delta',
      },
      {
        createdAt: '2023-01-01T00:04:00.000Z',
        id: '11',
        isGPTResponse: false,
        text: 'What are User Needs and Goals?',
      },
      {
        createdAt: '2023-01-01T00:05:00.000Z',
        id: '12',
        isGPTResponse: true,
        text: 'User authenticates (“logging in”) and interfaces with our system through a client-facing UI. There should be a chat component that allows the user to type in questions (called “prompts") related to water and climate (in Vietnamese or English). The user prompt is sent to a backend server for processing; our backend server can scan the user prompt for malicious or unsupported prompts. The backend server sends the user prompt to a QA retrieval service and k most relevant QA pairs are retrieved and added to the prompt. The augmented prompt is sent over the LLMs to generate a response. The generated response is sent to a critique model to evaluate whether it conforms with our policy guidelines; the final response is returned to the user. The user can choose to log the prompt and response together with the feedback to a log database; these collected data can be used to train and finetune and evaluate our future models.',
      },
    ],
    name: 'NuocGPT là gì?',
  },
  {
    createdAt: '2023-01-02T00:00:00.000Z',
    id: '2',
    messages: [
      {
        createdAt: '2023-01-01T00:00:00.000Z',
        id: '1',
        isGPTResponse: false,
        text: 'What is NuocGPT?',
      },
      {
        createdAt: '2023-01-01T00:01:00.000Z',
        id: '2',
        isGPTResponse: true,
        text: 'NuocGPT is looking for a tech partner to build the conversational UI that answers questions about water and climate in Vietnam, with a specific focus on salinity intrusion. To retrieve information and answer questions, NuocGPT will leverage Large Language Models.',
      },
    ],
    name: 'NuocGPT?',
  },
];
