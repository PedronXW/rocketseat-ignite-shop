import { styled } from '../..'

export const CartMenuItemContainer = styled('div', {
  display: 'flex',
  gap: '1.25rem',
})

export const ImageContainer = styled('div', {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  },
})

export const DescriptionContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  padding: '0.25rem 0',

  h1: {
    color: '$gray300',
    fontSize: '$md',
  },

  strong: {
    color: '$gray100',
    fontSize: '$md',
  },
})

export const ActionMenu = styled('div', {
  display: 'flex',
  alignItems: 'center',
  color: '$gray300',
  marginTop: 'auto',
  gap: '1.25rem',

  button: {
    marginTop: 'auto',
    color: '$green500',
    fontWeight: 'bold',
    width: 'fit-content',
    textDecoration: 'none',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: 0,

    fontSize: '$md',

    '&:hover': {
      textDecoration: 'underline',
      color: '$green300',
    },
  },
})

export const Counter = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1rem',

  span: {
    color: '$gray100',
    fontSize: '$md',
    height: 20,
  },

  button: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    padding: 0,
    color: '$gray300',
  },
})
