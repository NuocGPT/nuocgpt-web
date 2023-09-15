import type { QueryParams } from '#/services/common/interfaces';

export const useGetSearchParams = (queryParams: QueryParams) => {
  const searchParams = new URLSearchParams();

  const { search, rating } = queryParams;

  if (search !== undefined && search !== '') {
    searchParams.append('search', search);
  }
  if (rating !== undefined) {
    searchParams.append('rating', rating);
  }

  const queryString = searchParams.toString();

  return { queryString };
};
