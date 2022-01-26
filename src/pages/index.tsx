import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import type { Guild, Paginate, User } from '@/types';

import resolveAuth from '@/services/auth';

import { Container } from '@/components';

import styles from '@/styles/pages/home.module.css';

export type HomeProps = {
  user: User;
  guilds: Guild[];
};

export default function Home({ user, guilds }: HomeProps) {
  return (
    <main className={styles.main}>
      <Container className={styles.container}>
        <div className={styles.user}>
          <div className={styles.avatar}>
            {user.avatarUrl && (
              <Image src={user.avatarUrl} alt="avatar" width="64" height="64" />
            )}
          </div>
          <p>{user.username}</p>
        </div>

        <Link href="/guilds/create">
          <a className={styles.newGuildButton}>New Guild</a>
        </Link>

        <div className={styles.guilds}>
          {guilds.map((guild) => (
            <Link href={`/guilds/${guild.slug}`} key={guild.slug}>
              <a className={styles.guildCard}>
                <h3 className={styles.guildName}>{guild.name}</h3>
                <p className={styles.guildDescription}>{guild.description}</p>
              </a>
            </Link>
          ))}
        </div>
      </Container>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { user, redirect, apiClient } = await resolveAuth(ctx);

  if (!user) {
    return { redirect };
  }

  const {
    data: { data: guilds },
  } = await apiClient.get<Paginate<Guild[]>>(`/guilds`).catch(() => ({
    data: { data: [] },
  }));

  return {
    props: { user, guilds },
  };
};
