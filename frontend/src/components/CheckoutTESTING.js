{
  /* <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
        <CheckoutForm2 paymentMethod={paymentMethod} />
      </Elements> */
}

const CheckoutForm2 = ({ paymentMethod }) => {
  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState(null)
  const [processing, setProcessing] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [clientSecret, setClientSecret] = useState('')
  const stripe = useStripe()
  const elements = useElements()

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    createPayment()
  }, [])

  const createPayment = async () => {
    let res = await axios.post(
      'http://localhost:4000/api/create-payment-intent',
      { items: [{ id: 'xl-tshirt' }] }
    )
    console.log(res.data)
    setClientSecret(res.data.clientSecret)
  }

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty)
    setError(event.error ? event.error.message : '')
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    setProcessing(true)

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
    })
    // console.log(elements.getElement(CardElement))
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
      <CardElement
        id='card-element'
        options={CARD_OPTIONS}
        onChange={handleChange}
      />
      <button disabled={processing || disabled || succeeded} id='submit'>
        <span id='button-text'>
          {processing ? (
            <div className='spinner' id='spinner'></div>
          ) : (
            'Pay now'
          )}
        </span>
      </button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className='card-error' role='alert'>
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      <p className={succeeded ? 'result-message' : 'result-message hidden'}>
        Payment succeeded, see the result in your
        <a href={`https://dashboard.stripe.com/test/payments`}>
          {' '}
          Stripe dashboard.
        </a>{' '}
        Refresh the page to pay again.
      </p>
    </form>
  )
}
