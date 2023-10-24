import { styled } from '@/styles';

export const Container = styled('div', {
  display: 'flex',
  flex: '1',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '16px',
  color: '$gray900',
  flexDirection: 'column',
  height: '650px',
  margin: 'auto'
});

export const ContainerPassword = styled('div', {
  width: '25%',
  height: '70%',
  margin:   'auto',
  justifyContent: 'center',
  alignItems: 'center',
  border: '2px solid #868686',
  borderRadius: '4px',
  padding: '16px',

  h1: {
    fontFamily: '$poppins',

  },

  label: {
    fontFamily: '$roboto',
  }
});
