import axios from "axios"

const userActions = {
    createUser: (newUser) => {
        return async (dispatch) => {
            let res = await axios.post("http://localhost:4000/api/users",{...newUser})
            if(res.data.success){
                dispatch({type:"CREATE_USER", payload: res.data.response})
            }
            return res
        }
    },
    logUser: () => {
        return () => {
            console.log("log in")
        }
    }
}

export default userActions