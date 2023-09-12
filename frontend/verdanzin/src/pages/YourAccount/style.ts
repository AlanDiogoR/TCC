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
  width: '80%',
  flexDirection: 'row',
  justifyContent: 'space-between',
  margin: 'auto',

  h2: {
    fontSize: '$lg',
    fontFamily: '$poppins'
  },
});


export const DivOptions = styled('div', {
  width: '25%',
  padding: '0.875rem',
  border: '1px solid black',
  borderRadius: '8px',
});

