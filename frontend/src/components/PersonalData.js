import React, { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

const PersonalData = ({ user }) => {
  const [updateUser, setUpdateUser] = useState({
    name: '',
    lastName: '',
    email: '',
  })

  const submitFile = (e) => {
    const fd = new FormData()
    fd.append('src', e.target.files[0])
  }
  return (
    <div>
      Personal Data
      <Box
        component='form'
        sx={{
          '& > :not(style)': { m: 1, width: '25vh' },
        }}
        noValidate
        autoComplete='off'
      >
        <TextField type='text' label='Outlined' variant='outlined' />
        <TextField type='text' label='Outlined' variant='outlined' />
        <TextField type='email' label='Outlined' variant='outlined' />
        <TextField style={{ width: '50vw' }} type='file' label='Outlined' variant='outlined' />
      </Box>
    </div>
  )
}

export default PersonalData
