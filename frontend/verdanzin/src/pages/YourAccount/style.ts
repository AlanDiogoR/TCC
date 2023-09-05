import { styled } from '@/styles';

export const AccountConatiner = styled('div', {
  color: '$gray900',
  display: 'flex',
  flexDirection: 'column',
  margin: 'auto',
  width: '100%',

  h1: {
    margin: '1rem',
    fontSize: '$2xl',
    fontFamily: '$roboto'
  },
});

export const NavAccount = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',

  h2: {
    fontSize: '$lg',
    fontFamily: '$poppins'
  },

  div: {

  }
});
