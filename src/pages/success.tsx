import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useContext, useEffect } from 'react'
import Stripe from 'stripe'
import { CartContext } from '../contexts/CartContext'
import { stripe } from '../lib/stripe'
import {
  ImageContainer,
  ProductsImagesContainer,
  SuccessContainer,
} from '../styles/pages/success'

interface ProductSuccess {
  id: string
  name: string
  imageUrl: string
}

interface SuccessProps {
  customerName: string
  products: Array<ProductSuccess>
}

export default function Success({ customerName, products }: SuccessProps) {
  const { removeFromCart } = useContext(CartContext)

  useEffect(() => {
    products.forEach((product) => {
      removeFromCart(product.id)
    })
  }, [])

  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <h1>Compra efetuada com sucesso!</h1>
        <ProductsImagesContainer>
          {products.map((product) => (
            <ImageContainer key={product.name}>
              <Image src={product.imageUrl} alt="" width={120} height={110} />
            </ImageContainer>
          ))}
        </ProductsImagesContainer>

        <p>
          Uhuul <strong>{customerName}</strong>, sua{' '}
          <strong>
            {products.reduce(
              (acc, product, index) =>
                acc +
                product.name +
                (products.length - 2 === index
                  ? ' e '
                  : products.length - 1 === index
                  ? ' '
                  : ', '),
              '',
            )}
          </strong>{' '}
          já está a caminho da sua casa.{' '}
        </p>
        <Link href={''}>Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const customerName = session.customer_details!.name
  const products = session.line_items!.data.map(
    (data) => data.price!.product as Stripe.Product,
  )

  return {
    props: {
      customerName,
      products: products.map((product) => ({
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
      })),
    },
  }
}
