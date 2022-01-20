import { GetServerSideProps } from 'next';

import resolveAuth from '@/services/auth';

export default function Login() {
  return (
    <>
      <main>
        <a href={`${process.env.NEXT_PUBLIC_API_URL}/api/auth/github`}>
          Entrar com o GitHub
        </a>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { user } = await resolveAuth(ctx);

  if (user) {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
