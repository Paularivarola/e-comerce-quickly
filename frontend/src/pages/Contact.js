import styles from '../styles/contact.module.css'
import TextField from '@mui/material/TextField'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import { useState } from 'react'
import ticketActions from '../redux/actions/admin/ticketActions'
import { connect } from 'react-redux'

const Contact = ({ createTicket }) => {
  const initialTicket = { name: '', email: '', message: '' }
  const [ticket, setTicket] = useState(initialTicket)

  const inputHandler = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value })
  }

  return (
    <div className={styles.containerContact}>
      <div className={styles.containerImage}>
        <img className={styles.deliveryImage} src='https://i.postimg.cc/MpyDVQNk/woman-Contact.png' alt='delivery' />
      </div>
      <div className={styles.form}>
        <h1 className={styles.titleContact}>Contacto</h1>
        <div className={styles.boxInputs}>
          <TextField required onChange={inputHandler} value={ticket.name} label='Nombre' type='text' name='name' color='warning' size='small' fullWidth />
          <TextField required onChange={inputHandler} value={ticket.email} label='Email' type='email' name='email' color='warning' size='small' fullWidth />
          <TextareaAutosize
            className={styles.textArea}
            onChange={inputHandler}
            value={ticket.message}
            name='message'
            aria-label='empty textarea'
            placeholder='Mensaje'
            style={{ width: '100%', height: 150 }}
          />
        </div>
        <div>
          <button
            onClick={() => {
              createTicket(ticket)
              setTicket(initialTicket)
            }}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = {
  createTicket: ticketActions.createTicket,
}

export default connect(null, mapDispatchToProps)(Contact)
