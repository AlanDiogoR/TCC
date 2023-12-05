import { styled } from '..';

export const MainContainer = styled('div', {
  display: 'flex',
  margin: '1rem',
  background: '$gray100',

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
  gap: '3rem',
  width: '50%',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  marginLeft: 'auto',
  marginTop: '3rem',
  height: '520px',

  h1: {
    color: 'Black',
  }
});

export const ProductSLider = styled('a', {
  height: '40px',
  display: 'flex',
  flexDirection: 'row',
  background: 'white',
  borderRadius: 8,
  cursor: 'pointer',
  position: 'relative',

  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'contain',
    aspectRatio: '16 / 9', // Substitua pelo aspect ratio desejado
    width: '80%',
  },

  footer: {
    position: 'absolute',
    bottom: '0.25rem',
    left: '0.25rem',
    right: '0.25rem',
    padding: '1rem', // Reduzi o padding do rodapé, você pode ajustar conforme necessário

    borderRadius: 8,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    transform: 'translateY(110%)',
    opacity: 0,
    transition: 'all 0.2s ease-in-out',

    strong: {
      fontSize: '$md', // Ajustei o tamanho da fonte para médio, você pode ajustar conforme necessário
      color: 'Black',
    },

    span: {
      fontSize: '$lg', // Ajustei o tamanho da fonte para grande, você pode ajustar conforme necessário
      fontWeight: 'bold',
      color: '$greenMenta300',
    }
  },

  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1,
    }
  }
});

