import styles from '../styles/cardAccept.module.css'
const CardAccep = () => {
	const accept = () => {
		console.log("accept")
	}

	const deny = () => {
		console.log("nope")
	}
	return(
		<div className={styles.containCard}>	
			<div className={styles.containImage}>
				<div className={styles.imageBack}>	
				</div>
			</div>
			<div className={styles.containText}>
				<div className={styles.text}> 	
					<h2>Estas seguro ?</h2>
					<p>Vas a perder los cambios no guardados</p>		
				</div>
			</div>
			<div className={styles.containButtons}>
				<button onClick={accept}>Si</button>
				<button onClick={deny}>No</button>
			</div>
		</div>
	)
}
export default CardAccep