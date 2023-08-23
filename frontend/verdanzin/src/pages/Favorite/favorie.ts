import { styled } from '@/styles';

export const FavoriteContainer = styled('div', {
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
    justifyContent: 'space-around'
  }
});

export const ProductDetailsHeart = styled('div', {
  marginTop: '1rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: '0.875rem'
});

