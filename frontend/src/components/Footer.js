import styles from "../styles/footer.module.css";

const Footer = () => {
  return (
    <footer>
      <div class={styles.containerFooter}>
        <div class={styles.boxIcons}>
          <div>
            <img
              class={styles.logo}
              src="/assets/logo-cocina-prueba.png"
              alt="logo"
            />
          </div>
          <div>
            <img
              class={styles.iconsFooter}
              src="/assets/facebook.png"
              alt="Facebook"
            />
            <img
              class={styles.iconsFooter}
              src="/assets/twitter.png"
              alt="Twitter"
            />
            <img
              class={styles.iconsFooter}
              src="../assets/pinterest.png"
              alt="Pinterest"
            />
            <img
              class={styles.iconsFooter}
              src="/assets/instagram.png"
              alt="Instagram"
            />
          </div>
        </div>

        <div class={styles.parrafo}>
          <p>9 W Philadelphia ST. York. PA 17401</p>
          <p>order@nutsaboutgranola.com</p>
          <p>717-814-9648</p>
        </div>
        <div class={styles.parrafo}>
          <p>Shop Now</p>
          <p>My Account</p>
          <p>Shopping Cart</p>
        </div>
        <div class={styles.parrafo}>
          <p>Where To Buy</p>
          <p>Wholesale</p>
          <p>Contact Us</p>
        </div>
        {/* <img class={styles.map} src="../assets/mapa-prueba.png" alt="map" /> */}
      </div>
    </footer>
  );
};

export default Footer;
