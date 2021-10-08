import styles from '../styles/checkOut.module.css'
import { connect } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import Addresses from "../components/Addresses"

const CheackOut = ({userData}) => {
	const [delivery, setDelivery] = useState("")
	const [viewAddress, setViewAddress] = useState("")

	const changeDelivery = (delivery) => {
		setDelivery(delivery)
	}
	const [user, setUser] =useState({
		firstName: userData?.data.firstName || "",
		lastName: userData?.data.lastName || "",
		email: userData?.data.email || "",
	})
	const [addAddress, setAddAddress] = useState({
		alias: "",
		street: "",
		number: "",
		neighborhood: ""
	})
	useEffect(() => {
		setUser({
			firstName: userData?.data.firstName || "",
			lastName: userData?.data.lastName || "",
			email: userData?.data.email || "",
		})
	},[userData])

	const array = [{
		name: "juan",
		calle: "roberto",
		numero: "tuvieja",
		id: 1
	},
	{
		name: "juan",
		calle: "roberto",
		numero: "tuvieja",
		id: 2
	},
	{
		name: "juan",
		calle: "roberto",
		numero: "tuvieja",
		id: 3
	}
	]
	const neighborhoodArray = ["Lomas de Zamora","Palermo","Bandfield", "Temperley", "Lanús", "Glew", "Monte Grande"]
	const inputHandler = e => {
		setUser({
			...user,
			[e.target.name]: e.target.value
		})
	}

	const formProfile = <div className={styles.containFormDeliveryHeader} >
							<div className={styles.FormDeliveryHeader}>
								<input type="text" placeholder="Nombre" defaultValue={userData?.data.firstName} name="firstName" onChange={inputHandler}/>
								<input type="text" placeholder="Apellido" defaultValue={userData?.data.lastName} name="lastName" onChange={inputHandler}/>
							</div>
							<div className={styles.FormDeliveryBody}>
								<input type="text" placeholder="Email" defaultValue={userData?.data.email} name="email" onChange={inputHandler}/>
								<input type="text" placeholder="Telofono (opcional)" onChange={inputHandler}/>
							</div>	
						</div> 	
	
	 

	const inputHandlerAddress = e => {
		setAddAddress({
			...addAddress,
			[e.target.name] : e.target.value
		})
	}
	const formAddress = <div className={styles.containFormAddress}>
							<div className={styles.contiainInputsHeader}>
								<div className={styles.FormAddressHeader}>
									<input className={styles.inputAddress} name="street" type="text" placeholder="Direccion" onChange={inputHandlerAddress} />
								</div>
								<div>
									<input className={styles.inputNumber} name="number" type="Number" placeholder="Numero" onChange={inputHandlerAddress} />
								</div>
							</div>
							<div className={styles.FormAddressBody}>
							<input type="text" placeholder="Alias/Referencia" name="alias" onChange={inputHandlerAddress}/>
								<select name="neighborhood" onChange={inputHandlerAddress}>
									<option>seleciona tu localidad perro</option>
										{neighborhoodArray.map((neigh, index) => <option key={index}>{neigh}</option>)}
								</select>
							</div>	
						</div> 
	
	const changeViewAddress = (action) => {
		setViewAddress(action)
	}
	
	const emailRef = useRef()
	const sendForm = () => {
		if(emailRef.current?.value !== user.email) return alert("tenes el mail mal pa")
		let verificationAddress = Object.values(addAddress).some(add => add === "")
		let verificationUser = Object.values(user).some(user => user === "")
		if(verificationUser || verificationAddress) return alert("Tenes que completar todos los campos paaaa")
		
	}
	console.log(emailRef.current?.value)
	return(
		<div className={styles.containAll}>
			<div className={styles.containForm}>
				<div className={styles.containButtonsDelivery}>
					<button onClick={() =>changeDelivery("withdraw")}>Retirar</button>
					<button onClick={() =>changeDelivery("send")}>Envio</button>
				</div>
				<div className={styles.containFormDelivery}>
				{!userData && <h3 className={styles.titleLogIn} >si tenes cuenta, ingresa</h3>}
					{delivery !== "" && formProfile}
					{delivery === "withdraw" 
					? 
					<h1 >estamos en retirar</h1>
					: 
					delivery === "send" 
					? 
					<div>
						{userData 
						? 
						<div>
							<div className={styles.containButtonsDelivery}>
								<button onClick={() => changeViewAddress("add")}>Agregar Direccion</button>
								<button onClick={() => changeViewAddress("get")}>Mis Direcciones</button>	
							</div> 
							{viewAddress === "" 
							? 
							<div className={styles.tittleSelect}>
								<h1>Selecciona un metodo para la direccion</h1>	
							</div>
							:
							viewAddress === "add" 
								? formAddress 
								:<div className={styles.containAddressCard}>
									{array.map(map => <Addresses map={map} key={map.id}/>)} 
								 </div>
							}
							<div>

							</div>
						</div>		
						: 
						<h1>no tenes cuenta perri</h1>}
					</div>
					: 
					<div  className={styles.tittleSelect}>
						<h1>Ingrese por favor como retirar</h1>
					</div>}
				</div>
				<div></div>
				<div></div>
			</div>
			<div className={styles.containFormSend}>
				<div className={styles.containList}>

				</div>
				<div className={styles.containSend}>
					<div className={styles.containInfoSend}>
						<div className={styles.containInfoName}>
							<h3>Nombre: {user.firstName}</h3>
							<h3>Apellido: {user.lastName}</h3>
						</div>	
						<div className={styles.containInfoinput}>	
							<h3>Confirme su email</h3>
							<input type="text" placeholder="Email" name="email" ref={emailRef} className={styles.inputConfirmEmail}/>
						</div>
					</div>
					<div className={styles.containButtonSend}>
						<button onClick={() => sendForm()}>Send</button>
					</div>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
	  userData: state.users.userData,
	}
}

const mapDispachToProps = {

}

export default connect(mapStateToProps, mapDispachToProps)(CheackOut) 