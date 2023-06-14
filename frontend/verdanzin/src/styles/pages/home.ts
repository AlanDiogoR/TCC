import { styled } from '..';

export const NavSearch = styled('div', {
  background: '$gray900',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: '1.8rem'
});

export const Research = styled('div', {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  height: '40px',

  button: {
    height: '40px',
    background: '$green500',
    padding: '10.5px',
    borderRadius: '5px',
    border: '1px solid $green500',
    outline: 'none',

    transition: '0.2s',

    input: {
      padding: '10.5px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      outline: 'none',
      width: '30rem',
      transition: '0.2s',

      '&:hover': {
        border: '1px solid $green500',
        outline: '1px solid $green500',
      }
    },,

    button: {
      position: 'absolute',
      top: '0',
      right: '0',
      padding: '9px',
      borderRadius: '5px',
      background: '$gray100',
    }


  }

});

export const NavIcons = styled('div', {

});

export const NavCategories = styled('nav', {
  display: 'flex',

  ul: {
    display: 'flex',
    flexDirection: 'row',


  }

});
