import React, { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import styles from '../styles/personalData.module.css'
import userActions from '../redux/actions/userActions'
import { connect } from 'react-redux'
import { BsEyeSlash, BsEye } from 'react-icons/bs'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
const bcrypt = require('bcryptjs')

const MyInput = ({ input, updatePassword, setUpdatePassword }) => {
  const [passProtected, setPassProtected] = useState(true)

  const inputHandler = (e) => {
    setUpdatePassword({
      ...updatePassword,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <TextField
      type={passProtected ? 'password' : 'text'}
      name={input.name}
      label={input.label}
      value={updatePassword[input.name]}
      variant='outlined'
      InputProps={{
        endAdornment: (
          <InputAdornment position='end' style={{ width: '2rem' }}>
            <IconButton onClick={(e) => setPassProtected(!passProtected)} edge='end'>
              {passProtected ? <BsEyeSlash /> : <BsEye />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      onChange={inputHandler}
      sx={{
        '& > :not(style)': { width: '25vw' },
      }}
    />
  )
}

const ChangePassword = ({ updateUser, userData }) => {
  const inputs = [
    { name: 'currentPassword', label: 'Contraseña actual' },
    { name: 'newPassword', label: 'Nueva contraseña' },
    { name: 'validateNewPassword', label: 'Confirmar nueva contraseña' },
  ]
  let initialState = {
    currentPassword: '',
    newPassword: '',
    validateNewPassword: '',
  }
  const [updatePassword, setUpdatePassword] = useState(initialState)
  const submitHandler = () => {
    const { currentPassword, newPassword, validateNewPassword } = updatePassword
    let validate = Object.values(updatePassword).some((prop) => prop === '')
    if (validate) {
      return alert('Todos las campos son obligatorios')
    }
    if (newPassword !== validateNewPassword) {
      return alert('Las contraseñas no concuerdan')
    }
    if (!bcrypt.compareSync(currentPassword, userData?.data?.password)) {
      return alert('Contraseña incorrecta')
    }
    if (!bcrypt.compareSync(newPassword, userData?.data?.password)) {
      return alert('En serio?')
    }

    let password = bcrypt.hashSync(newPassword)

    updateUser({ action: 'updatePass', password, currentPassword })
    setUpdatePassword(initialState)
  }
  return (
    <div className={styles.containPersonalData}>
      <div className={styles.containForm}>
        <Box
          component='form'
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete='off'
        >
          {inputs.map((input) => (
            <MyInput
              input={input}
              key={input.label}
              setUpdatePassword={setUpdatePassword}
              updatePassword={updatePassword}
            />
          ))}
        </Box>
        <button onClick={submitHandler}>enviar</button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    userData: state.users.userData,
  }
}

const mapDispatchToProps = {
  updateUser: userActions.updateUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)
