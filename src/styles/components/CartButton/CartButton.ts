import { styled } from '../..'

export const CartButton = styled('button', {
  padding: '0.75rem',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 8,
  background: '$gray800',
  cursor: 'pointer',
  color: '$gray100',
  border: 'none',
  display: 'inline-flex',
})

export const CartIconContainer = styled('div', {
  display: 'inline-flex',
  width: '3rem',
  height: '3rem',
  alignitems: 'center',
  justifyContent: 'center',
})

export const CartButtonCounter = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minWidth: '1.25rem',
  maxHeight: '1.25rem',
  right: '0.75rem',
  top: '-0.25rem',
  flexDirection: 'column',
  position: 'relative',
  color: '$gray800',
  background: '$green300',
  borderRadius: '9999px',
  fontSize: '0.75rem',
  textAlign: 'center',
  fontWeight: 700,
  letterSpacing: '-0.72px',
})
