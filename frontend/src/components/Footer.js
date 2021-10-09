import styles from "../styles/footer.module.css"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer>
      <div className={styles.containerFooter}>
        <div className={styles.boxIcons}>
          <div className={styles.containerLogo}>
            <img className={styles.logo} src="/assets/logoLDC.png" alt="logo"/>
          </div>
          <div>
            <img className={styles.iconsFooter} src="/assets/facebook.png" alt="Facebook"/>
            <img className={styles.iconsFooter}src="/assets/twitter.png" alt="Twitter"/>
            <img className={styles.iconsFooter} src="/assets/pinterest.png" alt="Pinterest"/>
            <img className={styles.iconsFooter} src="/assets/instagram.png" alt="Instagram"/>
          </div>
        </div>

        <div className={styles.information}>
          <p>9 W Philadelphia ST. York. PA 17401</p>
          <p>order@nutsaboutgranola.com</p>
          <p>717-814-9648</p>
        </div>
        <div className={styles.navegation}>
          <Link to="/">Home</Link>
          <Link to="/">Platos</Link>
          <Link to="/">Promos</Link>
          <Link to="/contacto">Contacto</Link>
        </div>
        {/* <img className={styles.map} src="../assets/mapa-prueba.png" alt="map" /> */}
   
      </div>
    </footer>
  )
}

export default Footer
