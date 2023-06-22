import { styled } from '..';

export const NavSearch = styled('div', {
  background: '$gray900',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: '1.8rem',
});

export const ButtonAll = styled('button', {
  background: '$gray100',
  padding: '10.5px',
  borderRadius: '5px 0 0 5px',
  border: '1px solid $gray100',
  outline: 'none',

});

export const Research = styled('div', {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  height: '40px',

  button: {
    height: '39px',
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
    width: '30rem',
    transition: '0.2s',

    '&:hover': {
      border: '1px solid $greenMenta300',
      outline: '1px solid $greenMenta300',
    },
  },

  '@media (max-width: 1000px)': {
    display: 'none',
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
  justifyContent: 'space-between',
  alignItems: 'center',

  a: {
    listStyle: 'none',
    textDecoration: 'none',
    fontSize: '2rem',
    color: '$gray100',
    paddingLeft: '1rem',
    transition: '0.2s',

    '&:hover': {
      color: '$greenMenta300',
    }
  },

  '@media (max-width: 1000px)': {
    display: 'none',
  },
});

export const MenuHamburguer = styled('div', {
  width: '30px',
  height: '20px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  cursor: 'pointer',

  span: {
    width: '100%',
    height: '3px',
    backgroundColor: '$gray100',
    transition: 'transform 0.2s, opacity 0.2s',
  },

  '&.open': {
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
  },

  '@media (min-width: 1001px)': {
    display: 'none',
  },
});
