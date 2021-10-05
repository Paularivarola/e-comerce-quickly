import Data from "../components/Data"
import History from "../components/History"
import Favorites from "../components/Favorites"
import styles from "../styles/profile.module.css"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useState } from "react"




const Profile = () => {
	const [view, setView] = useState(<Data/>)
	
	return(
		<>	
			<Header/>
			<div className="containerButtonCheck">
				<button styles={styles.buttonCheck} onClick={() => setView(<Data/>)}>Datos</button>
				<button styles={styles.buttonCheck} onClick={() => setView(<Favorites/>)}>Favoritos</button>
				<button styles={styles.buttonCheck} onClick={() => setView(<History/>)}>Historial</button>	
			</div>
			<div className="containerRenderView">
				<div className="renderView">
					{view}
				</div>
				
			</div>
			<Footer/>
		</>
	)
}

export default Profile