import { GetServerSideProps } from 'next';

import type { Guild, User } from '@/types';

import resolveAuth from '@/services/auth';

export type PageProps = {
  user: User;
  guild: Guild;
};

export default function Home({ user, guild }: PageProps) {
  return (
    <div>
      <h1>{guild.name}</h1>
      <p>{guild.description}</p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { user, redirect, apiClient } = await resolveAuth(ctx);
  const { slug } = ctx.query;

  if (!user) {
    return { redirect };
  }

  const { data: guild } = await apiClient
    .get<Guild>(`/guilds/${slug}`)
    .catch(() => ({ data: null }));

  if (!guild) {
    return {
      notFound: true,
    };
  }

  return {
    props: { user, guild },
  };
};
