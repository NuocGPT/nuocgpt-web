import * as fetcher from '../utils/fetcher';
import type { AddFeedbackDto, UpdateFeedbackDto } from './interfaces';

async function addFeedback({
  conversation_id,
  message_id,
  rating,
  tags,
  text,
}: AddFeedbackDto) {
  const data = await fetcher.post(
    `${import.meta.env.VITE_BASE_URL}/feedbacks`,
    {
      conversation_id,
      message_id,
      rating,
      tags,
      text,
    },
  );
  return data;
}

async function updateFeedback(id: string, { tags, text }: UpdateFeedbackDto) {
  const data = await fetcher.put(
    `${import.meta.env.VITE_BASE_URL}/feedbacks/${id}`,
    {
      tags,
      text,
    },
  );
  return data;
}

export { addFeedback, updateFeedback };
