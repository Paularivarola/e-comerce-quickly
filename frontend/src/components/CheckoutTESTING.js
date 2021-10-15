import React, { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { connect } from 'react-redux'
import axios from 'axios'
import orderActions from '../redux/actions/orderActions'
const HOST = 'https://quickly-food.herokuapp.com'

const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: 'https://fonts.googleapis.com/css?family=Roboto',
    },
  ],
}

const stripePromise = loadStripe('pk_test_51JiHmiD8MtlvyDMXOy1Xz9IRz7S6hXvSX3YorvlFJSNbByoEHqgmIhvVuOuYgA3PiOR9hxBM0QzQcf6OlJs4VYgI00pB5OSjXZ')

const Card2 = ({ userData, index, cart, deliveryAddress, ...props }) => (
  <>
    <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
      <CheckoutForm2 paymentMethod={userData?.paymentCards[index]} customer={userData?.data?.customerId} userData={userData} cart={cart} deliveryAddress={deliveryAddress} {...props} />
    </Elements>
  </>
)
const mapStateToProps = (state) => {
  return { userData: state.users.userData, cart: state.users.cart }
}

const mapDispatchToProps = {
  createOrder: orderActions.createOrder,
}

export default connect(mapStateToProps, mapDispatchToProps)(Card2)

const CheckoutForm2 = ({ userData, paymentMethod, customer, createOrder, deliveryAddress, cart, ...props }) => {
  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState(null)
  const [processing, setProcessing] = useState('')
  const [paymentIntent, setpaymentIntent] = useState(null)

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    customer && createPayment()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customer])

  const createPayment = async () => {
    const cart = JSON.parse(localStorage.getItem('cart'))
    let res = await axios.post(`${HOST}/api/create-payment-intent`, { cart, customer })
    setpaymentIntent(res.data.paymentIntent.id)
  }


  const handleSubmit = async (ev) => {
    ev.preventDefault()
    setProcessing(true)

    if (!paymentIntent) return false

    const payload = await axios.post(`${HOST}/api/confirm-payment-intent`, {
      paymentIntent,
      payment_method: paymentMethod.id,
      customer,
    })

    const order = {
      purchased: cart,
      customerId: customer,
      metadata: payload,
      userId: userData._id,
      paymentMethod,
      deliveryAddress,
    }
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`)
      setProcessing(false)
    } else {
      setError(null)
      setProcessing(false)
      setSucceeded(true)
      createOrder(props, order)
    }
  }

  return (
    <form id='payment-form' onSubmit={handleSubmit}>
      <button disabled={processing || succeeded} id='submit'>
        <span id='button-text'>{processing ? <div className='spinner' id='spinner'></div> : succeeded ? 'Gracias por tu compra' : 'Pagá ahora'}</span>
      </button>
      {error && (
        <div className='card-error' role='alert'>
          {error}
        </div>
      )}
    </form>
  )
}
