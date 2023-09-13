import * as fetcher from '../utils/fetcher';
import type {
  AddFeedbackDto,
  CountRatings,
  TFeedbacks,
  UpdateFeedbackDto,
} from './interfaces';

async function fetchFeedbacks() {
  const data = await fetcher.get<TFeedbacks>(
    `${import.meta.env.VITE_BASE_URL}/admin/feedbacks`,
  );
  return data;
}

async function fetchCountRatings() {
  const data = await fetcher.get<CountRatings>(
    `${import.meta.env.VITE_BASE_URL}/admin/count-ratings`,
  );
  return data;
}

async function addFeedback({
  conversation,
  message,
  rating,
  tags,
  text,
  question,
}: AddFeedbackDto) {
  const data = await fetcher.post(
    `${import.meta.env.VITE_BASE_URL}/feedbacks`,
    {
      conversation,
      message,
      question,
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

export { addFeedback, updateFeedback, fetchFeedbacks, fetchCountRatings };
