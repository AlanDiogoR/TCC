import { styled } from '..';

export const Container = styled('section', {
  width: '100vw',
  height: '100vh',
  background: '$gray900',

});

export const ProductContainer = styled('main', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  alignItems: 'stretch',
  gap: '4rem',

  maxWidth: 1180,
  margin: '0 auto',
  paddingTop: '2%'

});

export const ContainerInput = styled('input', {
  width: '30px',
  height: '20px',
  background: '$gray100',
  borderRadius: '3px'
});

export const ImageContainer = styled('div', {
  width: '100%',
  maxWidth: 576,
  height: 656,
  background: '$gray300',
  borderRadius: 8,
  padding: '0.25rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  }
});

export const ProductDetails = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  h1: {
    fontSize: '$2xl',
    color: '$gray100',
  },

  span: {
    marginTop: '1rem',
    display: 'block',
    fontSize: '$2xl',
    color: '$gray100',
  },

  h2: {
    fontWeight: 'bold',
    marginTop: '2.5rem',
    fontSize: '$lg',
  },

  h3: {
    fontWeight: 'bolder',
    marginTop: '2.5rem',
    fontSize: '$lg',
    color: '$gray100'
  },

  p: {
    marginTop: '1rem',
    fontSize: '$md',
    lineHeight: 1.6,
    color: '$gray300',
  },

  div: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 'auto',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',

    button: {
      backgroundColor: '$greenMenta300',
      border: 0,
      color: '$white',
      borderRadius: 8,
      padding: '1.25rem',
      cursor: 'pointer',
      fontWeight: 'bold',
      fontSize: '$md',

      '&:disabled': {
        opacity: 0.6,
        cursor: 'not-allowed'
      },

      '&:not(:disabled):hover': {
        backgroundColor: '$greenMenta3002',
        cursor: 'grab'
      }
    }
  }

});
