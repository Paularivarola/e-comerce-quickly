import React, { useState } from 'react'

const ChangePassword = ({ user }) => {
  const [updatePassword, setUpdatePassword] = useState({
    currentPassword: '',
    newPassword: '',
    validateNewPassword: '',
  })
  return <div>ChangePassword</div>
}

export default ChangePassword
