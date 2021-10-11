import styles from '../styles/cardAddProduct.module.css'
const CardAddProduct = () => {
	return(
		<div className={styles.containAllCardProduct}>
			<div className={styles.containProduct}>
				<div className={styles.bordCard}>
					<div className={styles.containCard}>
						<div className={styles.containImage}>
						</div>
					</div>	
				</div>
			</div>
			<div className={styles.containTitleProduct}>
				<div className={styles.TitleProduct}>
					<h4>producto</h4>
					<div><h5>nombre del producto</h5></div>
				</div>
				<div className={styles.buttonCard}>
					<h5>ver carrito</h5>
				</div>
			</div>
			<div className={styles.closeCard}>
			✖️
			</div>	
		</div>
	)
}

export default CardAddProduct