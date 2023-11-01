import { AppProps } from 'next/app';
import { globalStyles } from '../styles/global';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Container } from '../styles/pages/app';


globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Component {...pageProps} />
      <ToastContainer
        position='bottom-center'
      />
    </Container>
  );
}
