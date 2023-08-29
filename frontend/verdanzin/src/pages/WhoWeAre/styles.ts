import { styled } from '@/styles';

export const ContainerWhoIs = styled('div', {
  color: '$gray900',
  display: 'flex',
  height: '100vh',
  width: '100vw',
  flexDirection: 'column'
});

export const ContainerAbout = styled('div', {
  display: 'flex',
  margin: '3rem 3rem 3rem 3rem',
  justifyContent: 'space-between',

  h1: {
    fontFamily: '$poppins',
    fontSize: '$2xl',
    marginRight: '3rem',
    color: '$greenMenta300',
  },

  div:{
    fontFamily: '$poppins',
    width: '50%'
  }
});

