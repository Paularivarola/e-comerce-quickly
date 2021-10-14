import styles from '../styles/contact.module.css'
import TextField from '@mui/material/TextField'
import TextareaAutosize from '@mui/material/TextareaAutosize'

const Contact = () => {
  return (
      <div className={styles.containerContact}>
        <div className={styles.containerImage}>
          <img className={styles.deliveryImage} src='https://i.postimg.cc/MpyDVQNk/woman-Contact.png' alt='delivery' />
        </div>
        <div className={styles.form}>
          <h1 className={styles.titleContact}>Contacto</h1>
          <div className={styles.boxInputs}>
            <TextField
              required
              label='Nombre'
              type='text'
              name='nombre'
              color='warning'
              size='small'
              fullWidth
            />
            <TextField
              required
              label='Email'
              type='email'
              name='email'
              color='warning'
              size='small'
              fullWidth
            />
            <TextField
              required
              label='Apellido'
              type='text'
              name='apellido'
              color='warning'
              size='small'
              fullWidth
            />
            <TextareaAutosize
              className={styles.textArea}
              aria-label="empty textarea"
              placeholder="Mensaje"
              style={{width: '100%', height: 150}}
              // fullWidth
            />
          </div>
          {/* <div className={styles.boxTextArea}>
          </div> */}
          <div>
            <button>Enviar</button>
          </div>
        </div>
      </div>
  )
}

export default Contact
