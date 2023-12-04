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
  width: '100%',
  height: '100%',

  border: '1px solid #ccc',
  borderRadius: '5px',
  backgroundColor: '#F5F5F5',
  boxShadow: '2px 3px 5px 0px #ccc',

  p: {
    fontSize: '$2xl',
    color: 'black',
  }
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
