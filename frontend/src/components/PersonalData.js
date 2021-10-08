import React, { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import styles from '../styles/personalData.module.css'


const PersonalData = ({ user,setCancelForm }) => {
  console.log(user?._id)
  const [updateUser, setUpdateUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
  })
  setCancelForm(updateUser)
  const [update, setUpdate] = useState(false)

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
        {update ?
        <>        
        <Box
          component='form'
          sx={{
            '& > :not(style)': { m: 1, width: '25vh' },
          }}
          noValidate
          autoComplete='off'
        >
          <TextField type='text' name="firstName" defaultValue={user?.firstName} label='Nombre' variant='outlined' onChange={inputHandler} 
           sx={{
            '& > :not(style)': { width: '25vw' },
          }}/>
          <TextField type='text' name="lastName" defaultValue={user?.lastName} label='Apellido' variant='outlined' onChange={inputHandler}
                     sx={{
                      '& > :not(style)': { width: '25vw'},
                    }}/>
          <TextField type='email' name="email" defaultValue={user?.email} label='Email' variant='outlined' onChange={inputHandler}    sx={{
                      '& > :not(style)': { width: '25vw'},
                    }}/>
        </Box>
        <button onClick={() => validatorFront()}>enviar</button>
        </>
      : 
      <div className={styles.containTitle}>
        <h2>{user?.firstName}</h2>
        <h2>{user?.lastName}</h2>
        <h2>{user?.email}</h2>
      </div> 
      }
        
      </div>
      <div className={styles.containImageEdit}>
        <div className={styles.ImageEdit} style={{backgroundImage: 'url("/assets/edit.png")'}} onClick={() => setUpdate(!update)}>
        </div>
      </div>
    </div>
  )
}

export default PersonalData
