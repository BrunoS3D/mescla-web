import { AppProps } from 'next/app';

import { AuthProvider } from '@/contexts/AuthContext';
import '@/styles/css/global.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
