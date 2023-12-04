import React from 'react';
import { Footer } from '@/components/Footer';
import NavBar from '@/components/NavBar/NavBar';
import { useAuth } from '@/auth/authContex';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';


export default function YourCard() {
  const {state} = useAuth();
  const router = useRouter();

  if(state.user == null) {
    toast.error('Você precisa fazer login para adcionar e ver cartões');
    router.push('Login');
  }

  return (
    <>
      <NavBar/>
      <h1>hello</h1>

      <Footer/>

    </>
  );
}
