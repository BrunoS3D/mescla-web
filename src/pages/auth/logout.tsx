import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { destroyCookie } from 'nookies';

import { api } from '@/services/api';
import { CookieNames } from '@/enums';

export default function AuthLogoutCallback() {
  const router = useRouter();

  if (process.browser) {
    delete api.defaults.headers[`Authorization`];
    router.push(`/login`);
  }

  return <></>;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  destroyCookie(ctx, CookieNames.token, { path: `/` });

  return {
    redirect: {
      destination: `/login`,
      permanent: false,
    },
  };
};
