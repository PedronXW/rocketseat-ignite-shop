import { styled } from '../..'

export const CartMenuContainer = styled('div', {
  width: 480,
  position: 'fixed',
  top: 0,
  right: 0,
  height: '100vh',
  zIndex: 10,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '$gray800',
  boxShadow: '-4px 0px 30px 0px rgba(0, 0, 0, 0.80)',
  padding: '3rem',
  transform: 'translateX(0%)',
  opacity: 100,
  transition: 'all 0.2s ease-in-out',
})

export const CloseButton = styled('button', {
  display: 'flex',
  color: '$gray100',
  alignSelf: 'flex-end',
  position: 'absolute',
  top: '1.5rem',
  right: '1.5rem',
  background: 'none',
  cursor: 'pointer',
  border: 'none',
})

export const ListTitle = styled('h1', {
  color: '$gray100',
  fontSize: '$lg',
  fontWeight: 'bold',
  marginBottom: '1rem',
  marginTop: '1.5rem',
})

export const ItemsList = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  marginTop: '1.5rem',
  overflowY: 'scroll',
  flex: 1,
})

export const ResumeContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  marginTop: '1.5rem',
  gap: '1.5rem',

  div: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    span: {
      color: '$gray300',
      fontSize: '$md',
    },

    strong: {
      color: '$gray100',
      fontSize: '$lg',
      fontWeight: 'bold',
    },
  },
})

export const CheckoutButton = styled('button', {
  marginTop: '3.438rem',
  background: '$green500',
  border: 0,
  borderRadius: 8,
  color: '$white',
  padding: '1.25rem',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '$md',

  '&:disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },

  '&:not(:disabled):hover': {
    backgroundColor: '$green300',
  },
})
