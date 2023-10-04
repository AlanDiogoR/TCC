import { styled } from '@/styles';

export const CreateContainer = styled('div', {
  display: 'flex',
  background: '$gray800',
  height: '100%',
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
})

export const CreateAccountContainer = styled('div', {
  height: '70%',
  width: '50%',
  background: '$gray100',

  h1: {
    color: 'yellow'
  }
})