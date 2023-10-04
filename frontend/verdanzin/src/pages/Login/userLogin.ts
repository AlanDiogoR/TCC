import { styled } from '@/styles';

export const ContainerLogin = styled('div', {
  background: '$gray900',
  display: 'flex',
  height: '100%',
  width: '100%',
});

export const MainContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '50%',
  minWidth: '375px',

  header: {
    margin: '24px 0 0 24px',
    cursor: 'pointer',
  },
});

export const FormContainer = styled('form', {
  background: '$gray800',
  width: '80%',
  height: '70%',
  borderRadius: '4px',
  margin: 'auto',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',

  button: {
    width: '335px',
    backgroundColor: '$greenMenta300',
    height: '51px',
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

    '&:hover': {
      opacity: '0.8',
    },

    '&:focus': {
      boxShadow: '0 0 0 2px rgba(255, 198, 50, 0.5)',
    },
  },

  a: {
    textDecoration: 'none',
    listStyle: 'none',
    color: 'rgba(255, 255, 255, 0.726)',
  },

  'a:hover': {
    borderBottom: '1px solid rgba(255, 255, 255, 0.726)',
    content: '',
    transition: '0.1s',
  },

  div: {
    margin: '0.5rem'
  },

  p: {
    marginTop: '0.5rem',

    a: {
      display: 'none'
    }
  }
});

export const ContainerTitle = styled('div', {
  display: 'flex',
  justifyContent: 'baseline',
  gap: '16px',
  margin: '16px',

  h1: {
    fontSize: '2rem',
    fontWeight: '600',
    color: 'white',
    fontFamily: '$poppins',
  },
});

export const TextInfo = styled('p', {
  color: '$gray300',
  fontFamily: '$roboto',
  fontSize: '16px',
  fontWeight: '400',
});

export const Subtitle = styled('p', {
  margin: '8px 0',
});

export const InputContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '335px',
  margin: '8px 0 4px 0',
  position: 'relative',

  label : {
    color: '$gray300'
  },

  input: {
    padding: '3px 6px 3px 26px',
    marginTop: '4px',
    height: '34px',
    width: '335px',
    border: '2px solid #868686',
    borderRadius: '4px',
    outline: '0',
    transition: 'all .1s ease-out',

    '&:hover': {
      border: '4px solid $greenMenta300',
    },

    '&::placeholder': {
      fontSize: '16px',
    },
  }
});

export const PasswordImage = styled('img', {
  position: 'absolute',
  margin: '35px 0 0 90%',
  cursor: 'pointer',
  color: '$green500'
});

export const VerdanSection = styled('section', {
  margin: 0,
  padding: 0,
  height: '100vh',
  width: '50%',
});

