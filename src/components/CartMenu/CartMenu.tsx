'use client'

import { CartContext } from '@/src/contexts/CartContext'
import {
  CartMenuContainer,
  CheckoutButton,
  CloseButton,
  ItemsList,
  ListTitle,
  ResumeContainer,
} from '@/src/styles/components/CartMenu/CartMenu'
import { X } from 'phosphor-react'
import { useContext } from 'react'
import CartMenuItem from './CartMenuItem'

interface CartMenuProps {
  status: boolean
  changeStatus: (newStatus: boolean) => void
}

export default function CartMenu({ status, changeStatus }: CartMenuProps) {
  const { cart, cartCount, cartTotal, buyCart } = useContext(CartContext)

  function handleChangeStatus() {
    changeStatus(false)
  }

  return (
    <CartMenuContainer
      css={{
        transform: status ? 'translateX(0%)' : 'translateX(110%)',
        opacity: status ? 1 : 0,
      }}
    >
      <CloseButton onClick={handleChangeStatus}>
        <X size={24} />
      </CloseButton>

      <ListTitle>Sacola de Compras</ListTitle>
      <ItemsList>
        {cart.length !== 0 ? (
          cart.map((item) => <CartMenuItem key={item.id} item={item} />)
        ) : (
          <p>Nenhum item no carrinho</p>
        )}
      </ItemsList>
      <ResumeContainer>
        <div>
          <span>Quantidade</span>
          <span>{cartCount()} items</span>
        </div>
        <div>
          <strong>Total</strong>
          <strong>
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(cartTotal())}
          </strong>
        </div>
      </ResumeContainer>
      <CheckoutButton disabled={cartCount() === 0} onClick={buyCart}>
        Finalizar Compra
      </CheckoutButton>
    </CartMenuContainer>
  )
}
