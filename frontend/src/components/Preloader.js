import styles from '../styles/preloader.module.css'

const Preloader = () => {
	return(
		<div className={styles.preloader}>
            <img src={"/assets/preloader.gif"} alt='loader'/>
		</div>
	)
}

export default Preloader