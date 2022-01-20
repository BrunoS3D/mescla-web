import { GetServerSidePropsContext } from 'next';
import { AxiosInstance } from 'axios';
import { destroyCookie, parseCookies } from 'nookies';

import { CookieNames } from '@/enums';
import { User } from '@/types';
import { getAPIClient } from './axios';

export type ResolveAuthReturn = {
  apiClient: AxiosInstance;
  token: string | undefined;
  user: User | null;
  redirect: { destination: string; permanent: boolean };
};

export default async function resolveAuth(
  ctx: GetServerSidePropsContext,
): Promise<ResolveAuthReturn> {
  const apiClient = getAPIClient(ctx);
  const { [CookieNames.token]: token } = parseCookies(ctx);

  const redirect = {
    redirect: {
      destination: `/login`,
      permanent: false,
    },
    user: null,
    token,
    apiClient,
  };

  if (!token) {
    return redirect;
  }

  const response = await apiClient.get(`/users/@me`).catch(() => null);

  if (!response?.data) {
    destroyCookie(ctx, CookieNames.token, { path: `/` });
    return redirect;
  }

  return { ...redirect, user: response?.data };
}
