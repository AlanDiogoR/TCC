import { styled } from '@/styles';

export const ContainerModal = styled('div', {
  background: 'transparent',
  height: '100vh',
  width: '100vw',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

export const Modal = styled('form', {
  display: 'flex',
  height: '60%',
  width: '40%',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  background: '$gray900',


  h1: {
    fontSize: '$2xl',
    color: '$gray100'
  }
});

export const ButtonCreate = styled('button', {
  width: '370px',
  backgroundColor: '$greenMenta300',
  height: '35px',
  fontFamily: 'Poppins, sans-serif',
  fontSize: '18px',
  fontWeight: '600',
  color: '#473404',
  outline: '0',
  textTransform: 'uppercase',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',
  marginTop: '16px',
  marginBottom: '16px',


  '&:hover': {
    opacity: '0.8',
    border: '2px solid #868686',
  },

  '&:focus': {
    boxShadow: '0 0 0 2px rgba(255, 198, 50, 0.5)',
  },
});
