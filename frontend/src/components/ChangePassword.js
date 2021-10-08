import React, { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import styles from '../styles/personalData.module.css'

const ChangePassword = ({ user, setCancelForm }) => {
  const [updatePassword, setUpdatePassword] = useState({
    currentPassword: '',
    newPassword: '',
    validateNewPassword: '',
  })
  setCancelForm(updatePassword)
  const inputHandler = e => {
    setUpdatePassword({
      ...updatePassword,
      [e.target.name]: e.target.value
    })    
  }

  const validatorFront = () => {
    let validate = Object.values(updatePassword).some((prop) =>  prop === "")
      if (validate) {
       return alert('Todos las campos son obligatorios')
      }
      console.log("esta todo bien")
  }
  return (
    <div className={styles.containPersonalData}>
      <div className={styles.containForm}>   
        <Box
          component='form'
          sx={{
            '& > :not(style)': { m: 1, width: '25vh' },
          }}
          noValidate
          autoComplete='off'
        >
          <TextField type='password' name="Contraseña vieja"  label='Contraseña Vieja' variant='outlined' onChange={inputHandler} 
          sx={{
            '& > :not(style)': { width: '25vw' },
          }}/>
          <TextField type='password' name="lastName"  label='Contraseña Nueva' variant='outlined' onChange={inputHandler}
                    sx={{
                      '& > :not(style)': { width: '25vw'},
                    }}/>
          <TextField type='password' name="email"  label='Confirmar Contraseña' variant='outlined' onChange={inputHandler}    sx={{
                      '& > :not(style)': { width: '25vw'},
                    }}/>
        </Box>
        <button onClick={() => validatorFront()}>enviar</button>
      </div>
  </div>
  )
}

export default ChangePassword
