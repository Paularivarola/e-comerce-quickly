import React, { useState } from 'react'
import { connect } from 'react-redux'
import userActions from '../redux/actions/userActions'
import Cards from './Cards'

const Payment = () => {
  const [createCard, setCreateCard] = useState({
    cardName: '',
    cardExpDate: '',
    CVC: '',
    DNI: '',
    cardNumber: '',
  })
  return (
    <div>
      Payment
      <Cards />
    </div>
  )
}
const mapDispatchToProps = {
  updateUser: userActions.updateUser,
}

export default connect(null, mapDispatchToProps)(Payment)
