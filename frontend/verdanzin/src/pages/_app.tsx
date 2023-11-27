import { AppProps } from 'next/app';
import { globalStyles } from '../styles/global';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Container } from '../styles/pages/app';
import { AuthProvider } from '@/auth/authContex';


globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Container>
        <Component {...pageProps} />
        <ToastContainer
          position='bottom-center'
        />
      </Container>
    </AuthProvider>

  );
}
