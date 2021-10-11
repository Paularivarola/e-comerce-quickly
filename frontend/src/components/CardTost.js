import { useEffect, useState } from "react"
import styles from '../styles/cardTost.module.css'


const CardTost = ({properties, setCardTost}) => {
	const {time, icon, text, view} = properties
	const [typeTost, setTypeTost] = useState(icon)
	const [imageTost, setImageTost] = useState("")
	const [iconTost, setIconTost] = useState("")
	const [textTost, setTextTost] = useState(text)
	const [render, setRender] = useState(view)

	useEffect(() => {
		// setRender(pasar por props, una variable de estado en false, y que pase a true cuando este pase a true.)
	},[])

	if(render){	
		setTimeout(() => {
			setRender(false)
			setCardTost({
				icon: "",
				text: "",
				view: false,
			})
		}, time)
	}
	

	useEffect(() => {
		if(typeTost === "success"){
			setImageTost("https://i.postimg.cc/4dr1ZcmV/papasfritas1.jpg")
			setIconTost("https://i.postimg.cc/J4nh2sQx/ok.png")
		}else if(typeTost === "error"){
			setImageTost("https://i.postimg.cc/xjzR564R/papasfritas2.jpg")
			setIconTost("https://i.postimg.cc/fRhTdPQ9/error.png")
		}else if(typeTost === "leave"){
			setImageTost("https://us.123rf.com/450wm/alvincadiz/alvincadiz1604/alvincadiz160400275/55827798-ilustraci%C3%B3n-del-vector-de-la-mascota-del-pan-del-pan.jpg?ver=6")
			setIconTost("https://i.postimg.cc/J4nh2sQx/ok.png")
		}else if(typeTost === "warning"){
			setImageTost("")
			setIconTost("")
		}
	},[])
	

	return(
		<div className={styles.containCard}>
			<div className={styles.imageIcon} style={{backgroundImage: `url("${iconTost}")`}}> 
			</div>
			<div>
				<h4>{textTost}</h4>
			</div>
			<div className={styles.imageTost} style={{backgroundImage: `url("${imageTost}")`}}>
			</div>
		</div>
	)
}

export default CardTost