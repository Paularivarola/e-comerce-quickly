import styles from "../styles/footer.module.css"
import { Link } from "react-router-dom"
import { AiFillInstagram, AiOutlineTwitter, AiFillPhone } from "react-icons/ai"
import { BsPinterest, BsFacebook } from "react-icons/bs"
import { FaMapMarkerAlt } from "react-icons/fa"
import { MdEmail } from "react-icons/md"

const Footer = () => {
  return (
    <footer>
      <div className={styles.containerFooter}>
        <div className={styles.boxIcons}>
          <div className={styles.containerLogo}>
            <img className={styles.logo} src="/assets/quicklyLogo.png" alt="logo"/>
          </div>
          <div className={styles.boxSocial}>
            <BsFacebook style={{color: 'rgb(156, 156, 156)', fontSize: '1.5rem'}}/>
            <AiOutlineTwitter style={{color: 'rgb(156, 156, 156)', fontSize: '1.8rem'}}/>
            <BsPinterest style={{color: 'rgb(156, 156, 156)', fontSize: '1.5rem'}}/>
            <AiFillInstagram style={{color: 'rgb(156, 156, 156)', fontSize: '1.8rem'}}/>
          </div>
        </div>

        <div className={styles.information}>
          <div className={styles.boxData}><FaMapMarkerAlt style={{color: 'tomato', fontSize: '1rem', marginRight: '2%'}}/><p className={styles.street}>Av. Alicia Moreau de Justo 1930</p></div>
          <div className={styles.boxData}><MdEmail style={{color: 'tomato', fontSize: '1rem', marginRight: '2%'}}/><p>quicky@gmail.com</p></div>
          <div className={styles.boxData}><AiFillPhone style={{color: 'tomato', fontSize: '1rem', marginRight: '2%'}}/><p>011 2496-6463</p></div>
        </div>
        <div className={styles.navegation}>
          <Link to="/">Home</Link>
          <Link to="/products">Menu</Link>
          <Link to="/contacto">Contacto</Link>
        </div>
        {/* <img className={styles.map} src="../assets/mapa-prueba.png" alt="map" /> */}
   
      </div>
    </footer>
  )
}

export default Footer
