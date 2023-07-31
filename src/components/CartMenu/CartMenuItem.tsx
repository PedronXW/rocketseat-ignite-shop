'use client'

import { CartContext, Product } from '@/src/contexts/CartContext'
import {
  ActionMenu,
  CartMenuItemContainer,
  Counter,
  DescriptionContainer,
  ImageContainer,
} from '@/src/styles/components/CartMenu/CartMenuItem'
import Image from 'next/image'
import { Minus, Plus } from 'phosphor-react'
import { useContext } from 'react'

interface CartMenuItemProps {
  item: Product
}

export default function CartMenuItem({ item }: CartMenuItemProps) {
  const { removeFromCart, plusQuantity, minusQuantity } =
    useContext(CartContext)

  function handleRemoveFromCart() {
    removeFromCart(item.id)
  }

  function addQuantity() {
    plusQuantity(item.id)
  }

  function removeQuantity() {
    minusQuantity(item.id)
  }

  return (
    <CartMenuItemContainer>
      <ImageContainer>
        <Image src={item.imageUrl} alt="" width={100} height={100} />
      </ImageContainer>
      <DescriptionContainer>
        <h1>{item.name}</h1>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(item.price)}
        </strong>
        <ActionMenu>
          <button onClick={handleRemoveFromCart}>Remover</button>
        </ActionMenu>
      </DescriptionContainer>
      <Counter>
        <button onClick={removeQuantity}>
          <Minus size={20} />
        </button>
        <span>{item.quantity}</span>
        <button onClick={addQuantity}>
          <Plus size={20} />
        </button>
      </Counter>
    </CartMenuItemContainer>
  )
}
