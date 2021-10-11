import styles from '../styles/contact.module.css'

const Contact = () => {
  return (
    <div>
      <div className={styles.containerContact}>
        <div className={styles.containerImage}>
          <img className={styles.deliveryImage} src='/assets/sobre.png' alt='delivery' />
        </div>
        <div className={styles.form}>
          <h1 className={styles.titleContact}>Contacto</h1>
          <input type='text' placeholder='nombre' />
          <input type='text' placeholder='email' />
          <input type='text' placeholder='apellido' />
          <textarea placeholder='mensaje' />
          <div>
            <button>Enviar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
