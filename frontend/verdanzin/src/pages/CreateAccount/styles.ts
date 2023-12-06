import { styled } from '@/styles';

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
  flexDirection: 'column',
  marginTop: '20px',

  div: {
    color: '#F53827',

    span: {
      marginLeft: '8px',
    }
  }
});

export const Input = styled('input', {
  padding: '3px 6px 3px 26px',
  marginTop: '4px',
  height: '34px',
  width: '335px',
  border: '2px solid #868686',
  borderRadius: '4px',
  outline: '0',
  transition: 'all .1s ease-out',

  '&:hover': {
    border: '2px solid $greenMenta300',
  },

  '&:focus':{
    border: '2px solid $greenMenta300',
  },

  '&::placeholder': {
    fontSize: '16px',
  },




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
