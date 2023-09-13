export enum Rating {
  thumbsUp = 'thumbsUp',
  thumbsDown = 'thumbsDown',
}

export interface CountRatings {
  likes?: number | string;
  dis_likes?: number | string;
}

export enum FeedbackTag {
  harmful = 'harmful',
  false = 'false',
  notHelpful = 'not-helpful',
}

export interface Feedback {
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
  rating: Rating;
  tags: FeedbackTag[];
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

export interface FeedbackInput {
  search?: string;
  rating?: string;
  page?: number;
  size?: number;
}
