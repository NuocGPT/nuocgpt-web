import type { QueryParams } from '#/services/common/interfaces';

export const useGetSearchParams = (queryParams: QueryParams) => {
  const searchParams = new URLSearchParams();

  // Add query parameters with values (non-undefined)
  const { search, rating } = queryParams;

  if (search !== undefined) {
    searchParams.append('search', search);
  }

  if (rating !== undefined) {
    searchParams.append('rating', rating);
  }

  // Construct the query string
  const queryString = searchParams.toString();

  return { queryString };
};
