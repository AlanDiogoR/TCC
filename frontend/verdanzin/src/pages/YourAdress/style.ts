import { styled } from '@/styles';

export const Container = styled('div', {
  display: 'flex',
  flex: '1',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '16px',
  color: '$gray900',
  flexDirection: 'row',
  height: '650px',
  marginLeft: '20%'
});

export const Text = styled('h1', {
  marginTop: '30px',
  color: '$gray900',
  textAlign: 'center'
});

export const ContainerAdd = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '20%',
  height: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  border: '2px dashed #868686',
  borderRadius: '4px',
  padding: '16px',
  marginTop: '1px',

  p: {
    fontSize: '$2xl',
    color: '$gray300',
    fontWeight: 'bolder'
  },

  strong: {
    fontSize: '$xl',
    color: '$gray900',
    fontFamily: '$poppins',
  }


});

export const ContainerPassword = styled('div', {
  width: '20%',
  height: '50%',
  margin:   'auto',
  justifyContent: 'center',
  alignItems: 'center',
  border: '1px solid #868686',
  borderRadius: '4px',
  padding: '16px',

  header: {
    borderBottom: '1px solid #868686',
    fontWeight: 'bold',
    marginBottom: '10px'
  }

});
