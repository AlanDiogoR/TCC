import { styled } from '..';

export const MainContainer = styled('div', {
  display: 'flex',
  margin: '1rem',

  h1: {
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'monospace',
    fontSize: '$2xl',
    color: 'Black',
    margin: 'auto'
  }

});

export const HomeContainer = styled('main', {
  display: 'flex',
  //gap: '3rem',
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  marginLeft: 'auto',
  marginTop: '3rem',
  minHeight: 656,

  h1: {
    color: 'Black',
  }
});

export const ProductSLider = styled('a', {
  display: 'flex',
  flexDirection: 'row',
  background: '$gray100',
  borderRadius: 8,
  //padding: '0.25rem',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  minWidth: 540,

  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  },

  footer: {
    position: 'absolute',
    bottom: '0.25rem',
    left: '0.25rem',
    right: '0.25rem',
    padding: '2rem',

    borderRadius: 8,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: 'rgba(0, 0, 0, 0.6)',

    transform: 'translateY(110%)',
    opacity: 0,
    transition: 'all 0.2s ease-in-out',

    strong: {
      fontSize: '$lg',
      color: '$gray100',
    },

    span: {
      fontSize: '$xl',
      fontWeight: 'bold',
      color: '$green300',
    }

  },

  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1,
    }
  }

});
