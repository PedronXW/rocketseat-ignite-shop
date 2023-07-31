import axios from 'axios'
import { ReactNode, createContext, useEffect, useState } from 'react'
import { useStorage } from '../hooks/useStorage'

interface CartContextProps {
  children: ReactNode
}

export type Product = {
  id: string
  name: string
  imageUrl: string
  price: number
  description: string
  defaultPriceId: string
  quantity: number
}

interface CartContextProviderInterface {
  cart: Product[]
  isCreatingCheckoutSession: boolean
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  clearCart: () => void
  buyCart: () => void
  cartTotal: () => number
  cartCount: () => number
  plusQuantity: (productId: string) => void
  minusQuantity: (productId: string) => void
}

export const CartContext = createContext({} as CartContextProviderInterface)

export function CartProvider({ children }: CartContextProps) {
  const { getStorage, setStorage } = useStorage()
  const [cart, setCart] = useState<Product[]>([])

  useEffect(() => {
    const cartFromStorage = getStorage('cart')
    if (cartFromStorage) {
      setCart(cartFromStorage)
    }
  }, [])

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  function cartTotal() {
    return cart.reduce((acc, item) => {
      return acc + Number(item.price) * item.quantity
    }, 0)
  }

  function cartCount() {
    return cart.reduce((acc, item) => acc + item.quantity, 0)
  }

  function plusQuantity(productId: string) {
    const item = cart.filter((item) => item.id === productId)
    if (item.length > 0 && item[0].quantity > 0) {
      changeQuantity(productId, item[0].quantity + 1)
    }
  }

  function minusQuantity(productId: string) {
    const item = cart.filter((item) => item.id === productId)
    if (item.length > 0 && item[0].quantity === 1) {
      removeFromCart(productId)
      return
    }
    changeQuantity(productId, item[0].quantity - 1)
  }

  function addToCart(product: Product) {
    const item = cart.filter((item) => item.id === product.id)
    if (item.length > 0) {
      plusQuantity(product.id)
      return
    }
    setCart((prev) => {
      setStorage('cart', [...prev, { ...product, quantity: 1 }])
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  function changeQuantity(productId: string, quantity: number) {
    setCart((prev) => {
      const newValue = prev.map((item) => {
        if (item.id === productId) {
          return {
            ...item,
            quantity,
          }
        }
        return item
      })
      setStorage('cart', newValue)
      return newValue
    })
  }

  function removeFromCart(productId: string) {
    setCart((prev) => {
      const newValue = prev.filter((item) => item.id !== productId)
      setStorage('cart', newValue)
      return newValue
    })
  }

  function clearCart() {
    setStorage('cart', [])
    setCart([])
  }

  async function buyCart() {
    try {
      setIsCreatingCheckoutSession(true)
      const response = await axios.post('/api/checkout', {
        products: cart.map((product) => {
          return {
            defaultPriceId: product.defaultPriceId,
            quantity: product.quantity,
          }
        }),
      })
      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (err) {
      alert('Falha ao redirecionar checkout')
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        isCreatingCheckoutSession,
        addToCart,
        removeFromCart,
        clearCart,
        buyCart,
        cartTotal,
        cartCount,
        plusQuantity,
        minusQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
