import styles from "../styles/footer.module.css"

const Footer = () => {
  return (
    <footer>
      <div className={styles.containerFooter}>
        <div className={styles.boxIcons}>
          <div className={styles.containerLogo}>
            <img className={styles.logo} src="/assets/logo-cocina-prueba.png" alt="logo"/>
          </div>
          <div>
            <img className={styles.iconsFooter} src="/assets/facebook.png" alt="Facebook"/>
            <img className={styles.iconsFooter}src="/assets/twitter.png" alt="Twitter"/>
            <img className={styles.iconsFooter} src="/assets/pinterest.png" alt="Pinterest"/>
            <img className={styles.iconsFooter} src="/assets/instagram.png" alt="Instagram"/>
          </div>
        </div>
<div className={styles.parrafo}>
        <div className={styles.information}>
          <p>9 W Philadelphia ST. York. PA 17401</p>
          <p>order@nutsaboutgranola.com</p>
          <p>717-814-9648</p>
        </div>
        <div>
          <p >Home</p>
          <p>Platos</p>
          <p>Promos</p>
        </div>
        <div>
          <p>Pedidos</p>
          <p>Contacto</p>
        </div>
        {/* <img className={styles.map} src="../assets/mapa-prueba.png" alt="map" /> */}
      </div>
      </div>
    </footer>
  )
}

export default Footer
