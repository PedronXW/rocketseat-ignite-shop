import type { AppProps } from 'next/app'
import Image from 'next/image'
import { useContext, useState } from 'react'
import logo from '../assets/logo.svg'
import { Cart } from '../components/Cart/Cart'
import { CartContext, CartProvider } from '../contexts/CartContext'
import { globalStyles } from '../styles/global'
import { Container, Header } from '../styles/pages/app'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  const { cart } = useContext(CartContext)
  const [cartCount, setCartCount] = useState(cart ? cart.length : 0)

  return (
    <Container>
      <CartProvider>
        <Header>
          <Image src={logo} alt="logo" />
          <Cart />
        </Header>
        <Component {...pageProps} />
      </CartProvider>
    </Container>
  )
}
