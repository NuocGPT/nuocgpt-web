import type { QueryParams } from '#/services/common/interfaces';

export const useGetSearchParams = (queryParams: QueryParams) => {
  const searchParams = new URLSearchParams();

  const { search, rating, pagination } = queryParams;

  if (search !== undefined && search !== '') {
    searchParams.append('search', search);
  }
  if (rating !== undefined) {
    searchParams.append('rating', rating);
  }
  if (pagination?.page !== undefined) {
    searchParams.append('page', String(pagination?.page));
  }
  if (pagination?.size !== undefined) {
    searchParams.append('size', String(pagination?.size));
  }

  const queryString = searchParams.toString();

  return { queryString };
};
