import styles from '../styles/contact.module.css'

const Contact = () => {
  return (
    <div>
      <div class={styles.containerContact}>
        <div class={styles.containerImage}>
          <div
            class={styles.deliveryImage}
            style={{
              backgroundImage: `url('/assets/sobre.png')`,
            }}
          ></div>
        </div>
        <div class={styles.form}>
          <h1 class={styles.titleContact}>Contacto</h1>
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
