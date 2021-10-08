import React, { useState } from 'react'
import { connect } from 'react-redux'
import userActions from '../redux/actions/userActions'

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
const mapDispatchToProps = {
  updateUser: userActions.updateUser,
}

export default connect(null, mapDispatchToProps)(Payment)
