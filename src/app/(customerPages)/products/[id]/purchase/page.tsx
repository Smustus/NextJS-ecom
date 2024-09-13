import prisma from "@/db/db";
import { notFound } from "next/navigation";
import Stripe from "stripe";
import CheckoutForm from "@/components/checkoutForm/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
//https://docs.stripe.com/api/payment_intents

//SERVER SIDE
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function PurchaseItemPage({params: {id}}: {params: {id: string}}){
  const product = await prisma.product.findUnique({where: {id}});
  if (product == null) return notFound();

  const paymentIntent = await stripe.paymentIntents.create({
    metadata: {productId: product.id},
    amount: product.priceHundredth,
    currency: "SEK"
  });
  console.log(paymentIntent);

  if(paymentIntent.client_secret == null){
    throw Error('Stripe couldnt create payment intent');
  }
  
  return (
    <CheckoutForm product={product} clientSecret={paymentIntent.client_secret} />
  )
  
}