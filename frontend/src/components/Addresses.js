import React from 'react'
import { connect } from 'react-redux'
import userActions from '../redux/actions/userActions'

const Addresses = () => {
  return <div>Addresses</div>
}
const mapDispatchToProps = {
  updateUser: userActions.updateUser,
}

export default connect(null, mapDispatchToProps)(Addresses)
