import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import debounce from 'awesome-debounce-promise';

import type { Guild, User } from '@/types';

import { api } from '@/services/api';
import resolveAuth from '@/services/auth';

import { Container } from '@/components';

import styles from '@/styles/pages/guilds/create.module.css';

export type PageProps = {
  user: User;
};

export type FormInputs = {
  slug: string;
  name: string;
  description: string;
};

async function checkSlugAvailability(slug: string) {
  const { data } = await api.get<{ available: boolean }>(
    `/guilds/availability/${slug}`,
  );

  return data.available;
}

export default function Home({ user }: PageProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>();
  const onSubmit: SubmitHandler<FormInputs> = async (formData) => {
    console.log(formData);

    const { data: newGuild } = await api.post<Guild>(`/guilds`, formData);

    router.push(`/guilds/${newGuild.slug}`);
  };

  return (
    <main className={styles.main}>
      <Container className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <label htmlFor="slug" className={styles.label}>
            Slug
          </label>
          <input
            id="slug"
            type="text"
            className={styles.input}
            {...register(`slug`, {
              required: true,
              validate: debounce(
                async (slug: string) =>
                  (await checkSlugAvailability(slug)) ||
                  `Slug is already in use`,
                500,
              ),
            })}
          />
          {errors.slug && (
            <span className={styles.error}>{errors.slug.message}</span>
          )}

          <label htmlFor="name" className={styles.label}>
            Name
          </label>
          <input
            id="name"
            type="text"
            className={styles.input}
            {...register(`name`, { required: true })}
          />

          <label htmlFor="description" className={styles.label}>
            Description
          </label>
          <textarea
            id="description"
            className={styles.input}
            {...register(`description`, { required: true })}
          />

          <button
            type="submit"
            className={styles.submit}
            disabled={isSubmitting}
          >
            Create Guild
          </button>
        </form>
      </Container>
    </main>
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
