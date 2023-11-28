import { AppProps } from 'next/app';
import { globalStyles } from '../styles/global';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Container } from '../styles/pages/app';
import { AuthProvider } from '@/auth/authContex';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


globalStyles();

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>

      <QueryClientProvider client={queryClient}>
        <Container>
          <Component {...pageProps} />
          <ToastContainer
            position='bottom-center'
          />
        </Container>
      </QueryClientProvider>

    </AuthProvider>

  );
}
