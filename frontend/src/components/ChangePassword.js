import React, { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import styles from '../styles/personalData.module.css'
import styles2 from '../styles/changePassword.module.css'
import userActions from '../redux/actions/userActions'
import { connect } from 'react-redux'
import { BsEyeSlash, BsEye } from 'react-icons/bs'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import CardTost from './CardTost'
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
      color='warning'
      InputProps={{
        endAdornment: (
          <InputAdornment position='end' style={{ width: '2rem' }}>
            <IconButton onClick={(e) => setPassProtected(!passProtected)} edge='end'>
              {passProtected ? <BsEyeSlash style={{ size: '1.5em', color: 'tomato' }} /> : <BsEye style={{ size: '1.5em', color: 'tomato' }} />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      onChange={inputHandler}
    />
  )
}

const ChangePassword = ({ updateUser, userData }) => {
  const [cardTost, setCardTost] = useState({
    time: '',
    icon: '',
    text: '',
    view: false,
  })

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
      return setCardTost({ time: 1500, icon: 'error', text: 'Complete todos los campos', view: true })
    }
    if (newPassword !== validateNewPassword) {
      return setCardTost({ time: 1500, icon: 'error', text: 'Las contraseñas no concuerdan', view: true })
    }
    if (!bcrypt.compareSync(currentPassword, userData?.data?.password)) {
      return setCardTost({ time: 1500, icon: 'error', text: 'Contraseñas incorrecta', view: true })
    }
    if (!bcrypt.compareSync(newPassword, userData?.data?.password)) {
      return setCardTost({ time: 1500, icon: 'error', text: 'No se que poner aca', view: true })
    }

    let password = bcrypt.hashSync(newPassword)

    updateUser({ action: 'updatePass', password, currentPassword })
    setUpdatePassword(initialState)
  }
  return (
    <div className={styles.mainPersonalData}>
      {cardTost.view && <CardTost properties={cardTost} setCardTost={setCardTost} />}
      <div className={styles.formBox2}>
        <div className={styles.key} alt='key'></div>
        <div className={styles2.containerPassword}>
          <Box
            component='form'
            sx={{
              '& .MuiTextField-root': { m: 1, width: '30ch' },
            }}
            noValidate
            autoComplete='off'
          >
            {inputs.map((input) => (
              <MyInput input={input} key={input.label} setUpdatePassword={setUpdatePassword} updatePassword={updatePassword} />
            ))}
          </Box>
          <div className={styles.buttonBox}>
            <button style={{ padding: '.5rem 2rem' }} onClick={submitHandler}>
              enviar
            </button>
          </div>
        </div>
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
