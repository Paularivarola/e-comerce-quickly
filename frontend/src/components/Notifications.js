import React from 'react'
import { connect } from 'react-redux'
import userActions from '../redux/actions/userActions'

const Notifications = () => {
  return <div>Notifications</div>
}
const mapDispatchToProps = {
  updateUser: userActions.updateUser,
}

export default connect(null, mapDispatchToProps)(Notifications)
