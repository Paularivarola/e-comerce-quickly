import styles from "../styles/buyConfirmation.module.css"
import { Link } from "react-router-dom"

const BuyConfirmation = () => {
  return (
    <>
      <div className={styles.containerConfirmation}>
        <h1>Gracias por tu compra!</h1>
        <p>pronto recibiras un mail con la confirmación y detalle de compra</p>

        <img
          className={styles.Imagencompra}
          src="/assets/confirmation.png"
          alt="imagen"
        />
        <Link to="/">
          <button>volver a Home</button>
        </Link>
      </div>
    </>
  )
}

export default BuyConfirmation
