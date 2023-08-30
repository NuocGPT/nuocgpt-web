export enum Rating {
  thumbsUp = 'thumbsUp',
  thumbsDown = 'thumbsDown',
}

export enum FeedbackTag {
  harmful = 'harmful',
  false = 'false',
  notHelpful = 'not-helpful',
}

export interface Feedback {
  _id?: string;
  conversation_id: string;
  message_id: string;
  user_id?: string;
  rating: Rating;
  tags?: FeedbackTag[];
  text?: string;
  created_at?: string;
}

export interface AddFeedbackDto {
  conversation_id: string;
  message_id: string;
  rating: Rating;
  tags?: FeedbackTag[];
  text?: string;
}

export interface UpdateFeedbackDto {
  tags?: FeedbackTag[];
  text?: string;
}
