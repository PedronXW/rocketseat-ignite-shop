import { Product } from '@/src/contexts/CartContext'
import { stripe } from '@/src/lib/stripe'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json('Method not allowed')
  }

  const { products } = req.body

  if (!products) {
    return res.status(400).json({ error: 'Products not found' })
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_URL}/`

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: products.map((product: Product) => ({
      price: product.defaultPriceId,
      quantity: product.quantity,
    })),
  })
  return res.status(201).json({ checkoutUrl: checkoutSession.url })
}
