import { styled } from '@/styles';

export const ContainerPassword = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '50%',
  minWidth: '375px',
  color: '$gray900',

  header: {
    margin: '24px 0 0 24px',
    cursor: 'pointer',
  },
});
