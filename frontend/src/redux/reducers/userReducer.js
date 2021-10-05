const userReducer = (state = {userId: null, token: null, name:null, profilePicture:null}, action) => {
    switch (action.type){
        case "CREATE_USER":
			alert("Registro exitoso!!")
            localStorage.setItem("token", action.payload.token)
            localStorage.setItem("name", action.payload.name)
            //localStorage.setItem("profilePicture", action.payload.profilePicture)
            localStorage.setItem("userId", action.payload.userId)
			return{
                ...state,
                token: action.payload.token,
                name: action.payload.name,
                //profilePicture: action.payload.profilePicture,
                userId: action.payload.userId
            }
        case "LOGUIN":
            localStorage.setItem("token", action.payload.token)
            localStorage.setItem("name", action.payload.name)
            //localStorage.setItem("profilePicture", action.payload.profilePicture)
            localStorage.setItem("userId", action.payload.userId)
			return{
                ...state,
                token: action.payload.token,
                name: action.payload.name,
                //profilePicture: action.payload.profilePicture,
                userId: action.payload.userId
            }
        case "LOG_OUT":
            localStorage.removeItem("token")
            localStorage.removeItem("name")
            //localStorage.removeItem("profilePicture")
            localStorage.removeItem("userId")
            return{
                ...state,
                token: null
            }
        default:
            return state
    }
}

export default userReducer