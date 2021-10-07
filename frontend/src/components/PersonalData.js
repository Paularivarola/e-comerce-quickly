import React, { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import styles from '../styles/personalData.module.css'


const PersonalData = ({ user }) => {
  console.log(user)
  const [updateUser, setUpdateUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
  })

  const submitFile = (e) => {
    const fd = new FormData()
    fd.append('src', e.target.files[0])
  }

  const inputHandler = e => {
    setUpdateUser({
      ...updateUser,
      [e.target.name]: e.target.value
    })    
  }

  const validatorFront = () => {
    let validate = Object.values(updateUser).some((prop) =>  prop === "")
      if (validate) {
       return alert('Todos las campos son obligatorios')
      }
           // if(user.firstName && user.lastName && user.email && user.email.includes('@') && user.password && user.repPass && user.password === user.repPass){
      //   aca sale la funcion linda
      // } 
      console.log("esta todo bien")
  }

  return (
    <div className={styles.containPersonalData}>
      <div className={styles.containImage} style={{backgroundImage: `url("${user?.src}")`}}>

      </div>
      <div className={styles.containForm}>
        <Box
          component='form'
          sx={{
            '& > :not(style)': { m: 1, width: '25vh' },
          }}
          noValidate
          autoComplete='off'
        >
          <TextField type='text' name="firstName" defaultValue={user?.firstName} label='Nombre' variant='outlined' onChange={inputHandler} />
          <TextField type='text' name="lastName" defaultValue={user?.lastName} label='Apellido' variant='outlined' onChange={inputHandler}/>
          <TextField type='email' name="email" defaultValue={user?.email} label='Email' variant='outlined' onChange={inputHandler}/>
        </Box>
        <button onClick={() => {validatorFront()}}>enviar</button>
      </div>
    </div>
  )
}

export default PersonalData
