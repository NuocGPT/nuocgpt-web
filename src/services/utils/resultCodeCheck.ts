export enum ResponseStatusAPI {
  SuccessOK = 200,
  Unauthorized = 401,
  ValidationError = 422,
  ServerError = 500,
}

/*
 * export const resultCodeCheck = async (res: Record<string, unknown>) => {
 *   let response: Record<string, unknown>;
 *   if (res.status === ResponseStatusAPI.Unauthorized) {
 *     response = {
 *       message: {
 *         detail: 'Token Expired',
 *         isSuccess: false,
 *       },
 *       status: res.status,
 *     };
 *     // can put another logic to handle different status code here
 *   } else {
 *     response = await res.json();
 *     response.status = res.status;
 *   }
 *   return response;
 * };
 */
