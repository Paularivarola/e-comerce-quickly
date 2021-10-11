import React, { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js'
import { connect } from 'react-redux'
import axios from 'axios'

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#c4f0ff',
      color: '#fff',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
        color: '#fce883',
      },
      '::placeholder': {
        color: '#87bbfd',
      },
    },
    invalid: {
      iconColor: '#ffc7ee',
      color: '#ffc7ee',
    },
  },
}

const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: 'https://fonts.googleapis.com/css?family=Roboto',
    },
  ],
}

const stripePromise = loadStripe(
  'pk_test_51JiHmiD8MtlvyDMXOy1Xz9IRz7S6hXvSX3YorvlFJSNbByoEHqgmIhvVuOuYgA3PiOR9hxBM0QzQcf6OlJs4VYgI00pB5OSjXZ'
)

const Card2 = ({ userData, index }) => (
  <>
    {console.log(userData)}
    <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
      <CheckoutForm2 paymentMethod={userData?.paymentCards[index]} customer={userData?.data?.customerId} />
    </Elements>
  </>
)
const mapStateToProps = (state) => {
  return { userData: state.users.userData }
}

export default connect(mapStateToProps)(Card2)

const CheckoutForm2 = ({ paymentMethod, customer }) => {
  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState(null)
  const [processing, setProcessing] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [paymentIntent, setpaymentIntent] = useState('')
  const stripe = useStripe()

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    customer && createPayment()
  }, [customer])

  const createPayment = async () => {
    const cart = JSON.parse(localStorage.getItem('cart'))
    console.log('hola')
    let res = await axios.post('http://localhost:4000/api/create-payment-intent', { cart, customer })
    console.log(res.data)
    setpaymentIntent(res.data.paymentIntent.id)
  }

  const handleChange = async (event) => {
    setDisabled(event.empty)
    setError(event.error ? event.error.message : '')
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    setProcessing(true)

    const payload = await axios.post('http://localhost:4000/api/confirm-payment-intent', {
      paymentIntent,
      payment_method: paymentMethod.id,
      customer,
    })

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`)
      setProcessing(false)
    } else {
      setError(null)
      setProcessing(false)
      setSucceeded(true)
    }
  }

  return (
    <form id='payment-form' onSubmit={handleSubmit}>
      {/* <CardElement
        id='card-element'
        options={CARD_OPTIONS}
        onChange={handleChange}
      /> */}
      <button disabled={processing || disabled || succeeded} id='submit'>
        <span id='button-text'>
          {processing ? <div className='spinner' id='spinner'></div> : succeeded ? 'Gracias por tu compra' : 'Pagá ahora'}
        </span>
      </button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className='card-error' role='alert'>
          {error}
        </div>
      )}
    </form>
  )
}
