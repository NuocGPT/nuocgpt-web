import * as fetcher from '../utils/fetcher';
import type { MeResponse } from './interfaces';

async function fetchMe() {
  const data = await fetcher.get<MeResponse>(
    `${import.meta.env.VITE_BASE_URL}/me`,
  );
  return data;
}

export { fetchMe };
