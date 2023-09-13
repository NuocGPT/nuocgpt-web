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

export interface CountRatings {
  likes?: number | string;
  dis_likes?: number | string;
}

export interface TFeedbacks {
  items:
    | {
        _id: string;
        conversation: {
          id: string;
          title: string;
        };
        question: {
          id: string;
          content: string;
        };
        message: {
          id: string;
          content: string;
        };
        user: {
          id: string;
          email: string;
        };
        rating: string;
        tags: string[];
        text: string;
        created_at: string;
      }[]
    | never;
  last: number;
  next: number;
  page: number;
  previous: number;
  size: number;
  total: number;
}

export interface TFeedback {
  _id: string;
  conversation: {
    id: string;
    title: string;
  };
  question: {
    id: string;
    content: string;
  };
  message: {
    id: string;
    content: string;
  };
  user: {
    id: string;
    email: string;
  };
  rating: string;
  tags: string[];
  text: string;
  created_at: string;
}

export interface AddFeedbackDto {
  conversation: {
    id: string;
    title: string;
  };
  message: {
    id: string;
    content: string;
  };
  rating: Rating;
  tags?: FeedbackTag[];
  text?: string;
  question?: {
    id: string;
    content: string;
  };
}

export interface UpdateFeedbackDto {
  tags?: FeedbackTag[];
  text?: string;
}
