import { styled } from '@/styles';

export const ContainerCart = styled('div', {
  background: '$gray100',
  color: '$gray900',
  display: 'flex',
  height: '100vh',
  width: '100vw',
  flexDirection: 'column',
  alignItems: 'center',

  h1: {
    margin: '2rem'
  },

  div: {
    display: 'flex',
    width: '90%',
    justifyContent: 'space-around',
  }
});

export const ContainerCarts= styled('div', {
  display: 'flex',
  width: '90%',
  justifyContent: 'space-around',
  border: '2px solid #868686',
  padding: '20px',
  borderRadius: '8px',
  marginTop: '36px'
});

export const ProductDetailsCart = styled('div', {
  marginTop: '1rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: '0.875rem'
});
