import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import nookies from 'nookies';

import { api } from '@/services/api';
import { CookieNames } from '@/enums';

export type AuthCallbackProps = {
  token: string;
};

export default function AuthCallback({ token }: AuthCallbackProps) {
  const router = useRouter();

  if (process.browser) {
    api.defaults.headers[`Authorization`] = `Bearer ${token}`;
    router.push(`/`);
  }

  return <></>;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = ctx.query;

  if (!token || Array.isArray(token)) {
    return {
      redirect: {
        destination: `/login`,
        permanent: false,
      },
    };
  }

  nookies.set(ctx, CookieNames.token, token, {
    path: `/`,
    maxAge: parseInt(process.env.COOKIE_TOKEN_MAX_AGE || `3600`, 10),
  });

  return {
    props: { token },
  };
};
