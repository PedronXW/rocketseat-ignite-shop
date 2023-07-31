import { CartContext } from '@/src/contexts/CartContext'
import {
    CartButton,
    CartButtonCounter,
    CartIconContainer,
} from '@/src/styles/components/CartButton/CartButton'
import { Handbag } from 'phosphor-react'
import { useContext, useState } from 'react'
import CartMenu from '../CartMenu/CartMenu'

export function Cart() {
  const { cart } = useContext(CartContext)

  const [cartMenuStatus, setCartMenuStatus] = useState(false)

  function handleChangeCartMenuStatus() {
    setCartMenuStatus((prev) => true)
  }
  return (
    <CartIconContainer>
      <CartButton onClick={handleChangeCartMenuStatus}>
        <Handbag size={24} />
      </CartButton>
      <CartButtonCounter>{cart.length}</CartButtonCounter>
      <CartMenu status={cartMenuStatus} changeStatus={setCartMenuStatus} />
    </CartIconContainer>
  )
}
