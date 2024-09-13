"use client"
import { formatSEK } from '@/utilities/formatters';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Image from 'next/image';
import React, { FormEvent, useState } from 'react'
import Button from '../Button';

interface CheckoutFormProps {
  product: {
    title: string;
    priceHundredth: number;
    imagePath: string;
    description: string;
  },
  clientSecret: string
}

//CLIENT SIDE
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
//https://docs.stripe.com/checkout/quickstart?client=next
//https://docs.stripe.com/js/initializing

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);

function Form(){
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsloading] = useState(false);

  function handleSubmit(e: FormEvent){
    e.preventDefault();
    if(stripe == null || elements == null) return

    setIsloading(true);

  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center'>
      
      <fieldset>

      </fieldset>
      
      <fieldset className='py-6'>
        <legend className='text-slate-700 font-bold text-center relative flex items-center w-full'>
          <div className='border-t-2 border-slate-700/40 w-full' />
          <p className='mx-1'>Checkout</p>
          <div className='border-t-2 border-slate-700/40 w-full' />
        </legend>
        <PaymentElement />
      </fieldset>
      <fieldset className='flex flex-col items-center justify-between w-full'>
        <Button href='/products' className='from-slate-500 via-slate-600 to-slate-700 w-full'>Avbryt</Button>
        <Button type='submit' disabled={stripe == null || elements == null || isLoading } className='from-cyan-400 via-cyan-600 to-cyan-700 hover:from-cyan-600 hover:via-cyan-700 hover:to-cyan-800 w-full'>{isLoading ? "Bearbetar..." : "Betala"}</Button>
      </fieldset>
    </form>
  )
}

const CheckoutForm = ({product, clientSecret}: CheckoutFormProps) => {
  return (
    <section className='p-5 mx-auto max-w-2xl border-2 border-slate-700/50 rounded shadow-lg bg-gradient-to-b from-slate-200 to-slate-300'>
      <article className='m-4 text-center'>

        <h3 className='m-2 text-slate-700 font-extrabold'>{product.title}</h3>

        <figure className='m-2 aspect-video flex-shrink-0 relative'>
          <Image src={product.imagePath} alt={product.title} className='object-contain drop-shadow-lg' fill/>
        </figure>

        <section className='m-2 text-slate-700'>
          <p>{formatSEK(product.priceHundredth / 100)}</p>
          
          <p className='line-clamp-4'>{product.description}</p>
        </section>

      </article>
      <Elements stripe={stripePromise} options={{clientSecret}}>
        <Form />
      </Elements>
    </section>
  )
}

export default CheckoutForm