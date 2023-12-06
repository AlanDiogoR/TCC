import { styled } from '@/styles';

export const Main = styled('section', {
  display: 'flex',
  gap: '1rem',
  width: '80vw',
  margin: '3rem auto',
});

export const Titulo = styled('h1', {
  fontSize: '2rem',
  color: '#A7CF44',
});

export const ContainerCart = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  width: '60%',
  color: '$gray900',
});

export const ContainerCartT = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1rem',
  width: '100%',
  color: '$gray900',
});

export const Nothing = styled('p', {
  display: 'flex',
  flexDirection: 'column',

  color: '$gray300',
  marginTop: '16%',
  fontSize: '$2xl'
});

export const ContainerCarts = styled('div', {
  display: 'flex',
  height: '250px',
  justifyContent: 'space-around',
  flexDirection: 'row-reverse',

  padding: '1rem',

  border: '1px solid #ccc',
  borderRadius: '5px',
  backgroundColor: '#F5F5F5',
  boxShadow: '2px 3px 5px 0px #ccc',
});

export const ProductImg = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',

  img: {
    height: '180px',
    width: '180px',
    objectFit: 'contain'
  }
});

export const ProductDetailsCart = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
});

export const NameProduct = styled('p', {
  fontSize: '1.2rem',
  fontWeight: 'bolder',
});

export const Infomrations = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  width: '40%',
});

export const DetailsInformation = styled('div', {
  display: 'flex',
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '16px',
  flexDirection: 'column',

  border: '1px solid #ccc',
  borderRadius: '5px',
  backgroundColor: '#F5F5F5',
  boxShadow: '2px 3px 5px 0px #ccc',

  h1: {
    display: 'flex',
    fontSize: '$lg',
    color: '$gray300',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginTop: '8%',

    borderBottom: '2px solid $gray300'
  },

  div: {
    marginTop: '8%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottom: '2px solid $gray300',


    h2: {
      display: 'flex',
      fontSize: '$lg',
      color: '$gray800',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: '100%',
    },

    footer: {
      display: 'flex',
      width: '100%',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',

      p: {
        color: '$greenMenta300'
      }
    },

  }
});

export const Value = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  borderBottom: '2px solid $gray300',
  marginTop: '8%',
  marginBottom: '8%',

  h2: {
    display: 'flex',
    fontSize: '$lg',
    color: '$gray800',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },

  p: {
    width: '100%',
    color: '$greenMenta300',
    textAlign:'center',
  }
});

export const ContainerInput = styled('div', {
  height: '5px',
  display: 'flex',
  width: '100%',

  div: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    div: {
      display: 'flex',
      flexDirection: 'column',
    }
  },

  p: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: '1rem',
    color: '$gray800'
  },
});

export const TrashButton = styled('button', {
  background: 'transparent',
  border: '0',
  color: '$gray900',
  cursor: 'pointer',
  lineHeight: 0,
  borderRadius: '2px',

  '&:hover': {
    color: 'red',
  }
});
