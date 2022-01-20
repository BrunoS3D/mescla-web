import axios from 'axios';
import { parseCookies } from 'nookies';

import { CookieNames } from '@/enums';

export function getAPIClient(ctx?: any) {
  const { [CookieNames.token]: token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  });

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }

  return api;
}
