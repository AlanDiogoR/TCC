import { styled } from '..';

export const Container = styled('section', {
  width: '100%',
  height: '100%',
  background: '$gray100',

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

export const ContainerInput = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: 'auto',

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

  h2: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginLeft: '0',
    marginRight: '0',
    paddingLeft: '0',
    paddingRight:'0'
  },

  h3: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '30%',
    color: '$gray900',
  },


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
    color: '$gray900',
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
    color: '$gray900'
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
    color: '$gray800',
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
