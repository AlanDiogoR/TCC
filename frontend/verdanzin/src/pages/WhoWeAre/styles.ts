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
  padding: '2rem',
  justifyContent: 'space-around',
  background: '$gray200',
  height: '20%',
  width: '80%',
  borderRadius: '5px',
  border: '2px solid black',
  boxShadow: '1px  1px 1px black',
  textAlign: 'justify',

  h1: {
    fontFamily: '$poppins',
    fontSize: '$2xl',
    marginRight: '3rem',
    color: '$greenMenta300',
  },

  div:{
    fontFamily: '$poppins',
    width: '50%',
    fontSize: '$md'
  }
});

export const ContainerHistory = styled('div', {
  display: 'flex',
  margin: '3rem 3rem 3rem 3rem',
  padding: '2rem',
  justifyContent: 'space-around',
  background: '$gray200',
  height: '50%',
  width: '80%',
  borderRadius: '5px',
  border: '2px solid black',
  boxShadow: '1px  1px 1px black',
  textAlign: 'justify',

  h1: {
    fontFamily: '$poppins',
    fontSize: '$2xl',
    marginRight: '3rem',
    color: '$greenMenta300',
  },

  div:{
    fontFamily: '$poppins',
    width: '50%',
    fontSize: '$md'
  }
});


