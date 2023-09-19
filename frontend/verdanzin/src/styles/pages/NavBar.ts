import { styled } from '..';

export const NavSearch = styled('div', {
  background: '$gray900',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: '1.8rem',
});

export const Research = styled('div', {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  height: '2.5rem',
  width: '50%',

  button: {
    height: '2.437rem',
    border: 'none',
    outline: 'none',
    padding: '0.75rem',

    transition: '0.2s',

    '&:hover': {
      opacity: '0.8',
    },
  },

  input: {
    padding: '10.5px',
    borderTopRightRadius: '5px',
    borderBottomRightRadius: '5px',
    border: '1px solid #ccc',
    outline: 'none',
    width: '100%',

    '&:hover': {
      border: '1px solid $greenMenta300',
      outline: '1px solid $greenMenta300',
    },
  },

  '@media (max-width: 850px)': {
    display: 'none',
  },

});

export const ButtonAll = styled('select', {
  height: '2.437rem',
  border: 'none',
  outline: 'none',
  padding: '0.75rem',
  display: 'flex',
  background: '$gray100',
  width: '6rem',
  borderRadius: '5px 0 0 5px',
  transition: '.2s',

  option: {
    background: '$gray100',
  },

  '&:hover': {
    opacity: '0.8',
  },
});

export const ButtonHome = styled('button', {
  height: '2.437rem',
  border: '1px solid $greenMenta300',
  borderRadius: '5px 0 0 5px',
  background: '$gray100',
  outline: 'none',
  padding: '0.75rem',
  display: 'flex',
  width: '3rem',
  transition: '.2s',

  option: {
    background: '$gray100',
  },

  '&:hover': {
    opacity: '0.8',
  },
});

export const IconSearch = styled('button', {
  position: 'absolute',
  top: '0',
  right: '0',
  border: '1px solid $greenMenta300',
  borderRadius: '0 5px 5px 0',
  background: '$greenMenta300',
});

export const NavIcons = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',

  a: {
    listStyle: 'none',
    textDecoration: 'none',
    fontSize: '2rem',
    color: '$gray100',
    transition: '.2s',

    '&:hover': {
      color: '$greenMenta300',
    }
  },

  '@media (max-width: 850px)': {
    display: 'none',
  },
});

export const MenuHamburguer = styled('div', {
  display: 'none',

  '@media (max-width: 850px)': {
    display: 'flex',

    div: {
      display: 'flex',
      width: '30px',
      height: '20px',
      flexDirection: 'column',
      justifyContent: 'space-between',
      cursor: 'pointer',

      span: {
        width: '100%',
        height: '3px',
        backgroundColor: '$gray100',
        transition: 'transform 0.2s, opacity 0.2s',
      },
    },



    '&.open': {
      margin: 'auto',
      display: 'flex',
      flexDirection: 'column',
      div: {
        span: {
          '&:first-child': {
            transform: 'rotate(45deg) translate(0px, 12px)',
          },
          '&:nth-child(2)': {
            opacity: '0',
          },
          '&:last-child': {
            transform: 'rotate(-45deg) translate(0px, -12px)',
          },
        },
      }
    },
  },
});

export const ListHamburguer = styled('div', {
  display: 'fixed',

  background: 'Yellow',
});

export const MenuItem = styled('li', {

});

