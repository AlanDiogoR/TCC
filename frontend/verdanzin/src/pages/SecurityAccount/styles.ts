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

export const ContainerAccount = styled('div', {
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

export const ContainerForm = styled('form', {
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

export const ContainerInputs = styled('div', {
  display: 'flex',
  marginTop: '20px',
  justifyContent: 'space-between',
  border: '1px solid #868686',
  padding: '10px',
  borderRadius: '8px',

  div: {
    p: {
      marginTop: '5px',
    }
  }
});

export const ButtonEdit = styled('button', {
  border: '1px solid black',
  padding: '8px 20px 8px 20px',
  background: '$gray100',
  borderRadius: '10px',

  '&:hover': {
    boxShadow: '0px 0.5px 10px 0.5px #737373',
  }, 

  a: {
    textDecoration: 'none',
    listStyle: 'none',
    color: '$gray900',
    fontWeight: 'bold',
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

