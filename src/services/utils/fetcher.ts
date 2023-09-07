import { clearToken } from '#/shared/utils/token';
import { getHeaders } from './auth-header';
import { ResponseStatusAPI } from './resultCodeCheck';

const REQUEST_TIMEOUT_IN_SECS = 30 * 1000; //Request timeout in 30 secs

async function http<T>(path: string, config: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(
    () => controller.abort(),
    REQUEST_TIMEOUT_IN_SECS,
  );

  const response = await fetch(path, {
    ...config,
    signal: controller.signal,
  });

  clearTimeout(timeoutId);

  if (response.status === ResponseStatusAPI?.TokenExpired) {
    clearToken();
    window.location.href = '/login';
  }

  if (response.status !== ResponseStatusAPI?.SuccessOK) {
    const error = await response.json();
    throw new Error((error as { detail: string }).detail);
  }

  return response.json();
}

export async function get<T>(path: string, config?: RequestInit): Promise<T> {
  const init = {
    headers: getHeaders(),
    method: 'get',
    ...config,
  };
  return await http<T>(path, init);
}

export async function post<T, U>(
  path: string,
  body: T,
  config?: RequestInit,
): Promise<U> {
  const init = {
    body: JSON.stringify(body),
    headers: getHeaders(),
    method: 'post',
    ...config,
  };
  return await http<U>(path, init);
}

export async function put<T, U>(
  path: string,
  body: T,
  config?: RequestInit,
): Promise<U> {
  const init = {
    body: JSON.stringify(body),
    headers: getHeaders(),
    method: 'put',
    ...config,
  };
  return await http<U>(path, init);
}
