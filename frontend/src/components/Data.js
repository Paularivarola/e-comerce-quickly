import { useState } from "react"
import toast from "react-hot-toast"
import Cards from "./Cards"

const Data = (props) => {
	const {setCard, setUser} = props
	const [updateUser, setUpdateUser] =useState({
		name: "",
		lastName: "",
		email: "",
		password: "",
	})

	const [createCard, setCreateCard] =useState({
		cardName: "",
		cardExpDate:"",
		CVC: "",
		DNI: "",
		cardNumber: "",
	})
	
	const [viewUser, SetViewUser] =useState("profile")
	const [viewCard, setViewCard] =useState("")

	const inputHandlerProfile = (e) => {
		setUpdateUser({...updateUser, [e.target.name]: e.target.value.trim() })
		setUser({...updateUser, [e.target.name]: e.target.value.trim() })
	}

	const inputHandlerCard= (e) => {
		setCreateCard({...createCard, [e.target.name]: e.target.value.trim() })
		setCard({...createCard, [e.target.name]: e.target.value.trim() })
	}

	const cleanInputs = (name) =>{
		setUser({})
		setCard({})
		setCreateCard({})
		setUpdateUser({})
		setViewCard("")
		SetViewUser(name)
	} 
	const viewForm = (name) => {
		const user = Object.values(updateUser).some((user) => user !== '')
		const card = Object.values(createCard).some((card) => card !== '') 
		if(card || user){	
		const confirm = () => {	
			return (
			toast.custom((t) => (
				<>
				{console.log(t)}
				<div
				
					className={`${
						t.visible ? 'animate-enter' : 'animate-leave'
					} containAlerts`}
					style={{ display: "flex", alignContent: "center", alignItems: "center", padding: "20px 30px", borderRadius: "35px"}}
					>
					<div className="containerTextAlerts">
						<p className="">
							Perderas los cambios no guardados
						</p>
						<p className="">
							estas seguro ? 
						</p>
					</div>
					<div className="containButtonsAlerts">
						<button onClick={() => cleanInputs(name)} style={{backgroundColor: "red",  color: "white", padding: "10px", margin: "5px"}}>
							Si
						</button>
						<button onClick={() => toast.dismiss(t.id)} style={{backgroundColor: "red",  color: "white", padding: "10px", margin: "5px"}}>
							No
						</button>
					</div>
				</div>
				</>
			))
			)
		}
		confirm()
		return false
		}
		SetViewUser(name)
		setViewCard("")
	}

	return(
		<div className="containerData">
			<div className="containerProfile">
				<div className="imageProfile" style={{backgroundImage: 'url("/assets/profile.png")'}}>

				</div>
				<h1>NOMBRE DE LA PERSONA</h1>
				<div className="buttonsProfile">
					<button onClick={() => viewForm("profile")}>Perfil</button>
					<button onClick={() => viewForm("addCard")}>Tarjetas</button>
				</div>
			</div>
			<div className="containAllProfile">
				{viewUser === "profile"
				 ? 	
				 <div className="containerDateProfile">	
					<form>
						<h2>Tus datos principales</h2>
						<div className="inputsDataUser">
							<input type="text" placeholder="Nombre" autoComplete="nope" name="name" onChange={inputHandlerProfile}/>
						</div>
						<div className="inputsDataUser">
							<input type="text" placeholder="Apellido" autoComplete="nope" name="lastName" onChange={inputHandlerProfile}/>
						</div>
						<div className="inputsDataUser">
							<input type="text" placeholder="Correo" autoComplete="nope" name="email" onChange={inputHandlerProfile}/>
						</div>
						<div className="inputsDataUser">
							<input type="password" placeholder="Contraseña" autoComplete="nope" name="password" onChange={inputHandlerProfile}/>
						</div>
					</form>
				</div>	
				:
				<div className="containerCardProfile">
					{viewCard === ""
					 && 
					 <>
					 	<div className="imageAddViewCard" onClick={() => setViewCard("viewCard")} style={{backgroundImage: 'url("/assets/billetera.png")'}}></div>
						<div className="imageAddViewCard" onClick={() => setViewCard("addCard")} style={{backgroundImage: 'url("/assets/agregar.png")'}}></div>
					 </>
					}
					{viewCard === "addCard"
					 ?
					 <>
					 <form>
						<h2>Agregar Tarjeta</h2>
						<div className="headerInputCard">
							<div className="inputsDataUser">
								<input type="text" placeholder="Numero de tarjeta" autoComplete="nope" onChange={inputHandlerCard} name="cardNumber"/>
							</div>
							<div className="inputsDataUser">
								<input type="text" placeholder="Nombre" autoComplete="nope" onChange={inputHandlerCard} name="cardName"/>
							</div>
						</div>
						<div className="bodyInputCard">
							<div className="inputsDataUser">
								<input type="text" placeholder="Fecha de expiracion" autoComplete="nope" onChange={inputHandlerCard} name="cardExpDate"/>
							</div>
							<div className="inputsDataUser">
								<input type="password" placeholder="Código de seguridad" autoComplete="nope" onChange={inputHandlerCard} name="CVC"/>
							</div>
						</div>
						<div className="footerInputCard">
							<div className="inputsDataUser">
								<input type="text" placeholder="DNI del titular" autoComplete="nope" onChange={inputHandlerCard} name="DNI"/>
							</div>
						</div>
					</form>
					<div className="imageCard" style={{backgroundImage: 'url("/assets/tarjeta.png")'}}>
					</div>
					<div className="containImageBack">
						<div className="imageBack" style={{backgroundImage: 'url("/assets/volver.png")'}} onClick={() => viewForm("addCard")}></div>
					</div>
					</>
					:
					viewCard === "viewCard" &&
						<div className="containCardsProfile">
							<div className="cardsContain">
								<Cards/>
							</div>
							<div className="containImageBack">
								<div className="imageBack" style={{backgroundImage: 'url("/assets/volver.png")'}} onClick={() => viewForm("addCard")}></div>
							</div>
						</div>
					}	
				</div>	
				}
			</div>
		</div>
	)
}

export default Data