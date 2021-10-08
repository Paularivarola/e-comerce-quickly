import styles from '../styles/history.module.css'

const History = () => {
	return(
		<div className={styles.mainHistory}>
			<div className={styles.boxHistory}>
				<img src='https://i.postimg.cc/yxFkk4g3/moto.png' alt='delivery' />
				<div className={styles.boxDelivery}>
					<p className={styles.state}>Estado de pedido</p>
					<p className={styles.text}><span>Numero de orden:</span> cont. dinamico</p>
					<p className={styles.text}><span>Precio:</span> cont. dinamico</p>
					<p className={styles.text}><span>Punto de entrega:</span> cont. dinamico</p>
					<p className={styles.text}><span>Hora estimada:</span> cont. dinamico</p>
				</div>
			</div>
			<div className={styles.gridBox}>
				<div className={styles.gridHistory}>
					<div className={styles.order}>
						<p>lalalalalalalalalal</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default History