import styles from "../styles/contact.module.css"
import Header from "../components/Header"
import Footer from "../components/Footer"
const Contact = () => {
  return (
    <div>
      <Header />
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
          <input type="text" placeholder="nombre" />
          <input type="text" placeholder="email" />
          <input type="text" placeholder="apellido" />
          <textarea placeholder="mensaje" />
          <div>
            <button>Enviar</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Contact
