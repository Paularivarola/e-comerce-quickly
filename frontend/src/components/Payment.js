import React, { useState } from 'react'

const Payment = () => {
  const [createCard, setCreateCard] = useState({
    cardName: '',
    cardExpDate: '',
    CVC: '',
    DNI: '',
    cardNumber: '',
  })
  return <div>Payment</div>
}

export default Payment
