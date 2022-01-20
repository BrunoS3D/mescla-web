import { GetServerSideProps } from 'next';

import type { User } from '@/types';

import resolveAuth from '@/services/auth';

export type HomeProps = {
  user: User;
};

export default function Home({ user }: HomeProps) {
  return (
    <div>
      <h1>index</h1>
      <p>{user.username}</p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { user, redirect } = await resolveAuth(ctx);

  if (!user) {
    return { redirect };
  }

  return {
    props: { user },
  };
};
