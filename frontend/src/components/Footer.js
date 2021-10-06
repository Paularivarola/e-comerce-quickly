import styles from '../styles/footer.module.css'

const Footer = () => {
  return (
    <footer>
      <div className={styles.containerFooter}>
        <div className={styles.boxIcons}>
          <div>
            <img className={styles.logo} src='/assets/logo-cocina-prueba.png' alt='logo' />
          </div>
          <div>
            <img className={styles.iconsFooter} src='/assets/facebook.png' alt='Facebook' />
            <img className={styles.iconsFooter} src='/assets/twitter.png' alt='Twitter' />
            <img className={styles.iconsFooter} src='../assets/pinterest.png' alt='Pinterest' />
            <img className={styles.iconsFooter} src='/assets/instagram.png' alt='Instagram' />
          </div>
        </div>

        <div className={styles.parrafo}>
          <p>9 W Philadelphia ST. York. PA 17401</p>
          <p>order@nutsaboutgranola.com</p>
          <p>717-814-9648</p>
        </div>
        <div className={styles.parrafo}>
          <p>Shop Now</p>
          <p>My Account</p>
          <p>Shopping Cart</p>
        </div>
        <div className={styles.parrafo}>
          <p>Where To Buy</p>
          <p>Wholesale</p>
          <p>Contact Us</p>
        </div>
        {/* <img className={styles.map} src="../assets/mapa-prueba.png" alt="map" /> */}
      </div>
    </footer>
  )
}

export default Footer
