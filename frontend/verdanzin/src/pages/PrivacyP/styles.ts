import { styled } from '@/styles';

export const Container = styled('main', {
  color: '$gray900',
  display: 'flex',
  height: '100%',
  width: '100%',
  flexDirection: 'column',
});

export const TFooter = styled('div', {
  position: 'absolute',
  borderRadius: '50px',
  background: '$gray300',
  width: '30%',
  alignSelf: 'center',
  bottom: '1px',
  justifyContent: 'center',
  alignItems: 'center',
  height: '32px',
  textAlign: 'center',
  fontSize: '$md',
});

export const ContainerSecurity = styled('div', {
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
