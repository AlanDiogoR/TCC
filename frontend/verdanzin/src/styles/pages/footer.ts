import { styled } from '..';


export const FooterBar = styled('footer', {
  display: 'flex',
  background: '$gray900',
  flexDirection: 'column',
  alignItems: 'center',
  color: 'white',
  fontSize: '1rem',
  flexWrap: 'wrap',
  gap: '1rem'
});

export const FooterRodape = styled('div', {
  display: 'flex',
  margin: '2rem',

  div:{
    display: 'flex',
    paddingLeft: '5rem',
    flexDirection: 'column',
    textAlign: 'center',
    gap: '0.500rem',


    h3: {
      fontSize: '1.2rem',
      textAlign: 'center',
      marginBottom: '1rem',
    },

  },


  label: {
    fontSize: '0.875rem',
    marginBottom: '1rem',

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
  },

  '@media screen and (max-width: 766px)': {
    flexDirection: 'column',

    div: {
      h3: {
        marginBottom: '0.6rem',
      },
      label: {
        marginBottom: '0.6rem',
      },
    },
  },
});
