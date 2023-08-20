import { styled } from '@/styles';

export const FavoriteContainer = styled('div', {
  background: '$gray900',
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
    width: '90%'
  }
});

export const ProductDetailsHeart = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
});

