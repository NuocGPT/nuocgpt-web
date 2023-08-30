export interface BaseGetAllResponse<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
  next: string;
  previous: string;
  first: string;
  last: string;
}

interface ErrorDetail {
  loc: (string | number)[];
  msg: string;
  type: string;
}

export interface BaseErrorResponse {
  detail: ErrorDetail[];
}
