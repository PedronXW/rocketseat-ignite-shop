import { CartContext, Product } from '@/src/contexts/CartContext'
import { stripe } from '@/src/lib/stripe'
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '@/src/styles/pages/product'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import Stripe from 'stripe'

interface ProductProps {
  product: Product
}

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter()

  const { addToCart } = useContext(CartContext)

  if (isFallback) {
    return <p>Carregando...</p>
  }

  function handleBuyProduct() {
    addToCart(product)
  }

  return (
    <>
      <Head>
        <title>Arroz | Ignite Shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} alt="" width={520} height={480} />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(product.price)}
          </span>
          <p>{product.description}</p>
          <button onClick={handleBuyProduct}>Comprar</button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: 'price_1JGJ8tGKZvKYlo2C0X0X0X0X' } }],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params!.id

  const product = await stripe.products.retrieve(productId!, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: price.unit_amount! / 100,
        description: product.description,
        defaultPriceId: price.id,
      } as Product,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}
