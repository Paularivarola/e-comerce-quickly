import axios from "axios"
const HOST = "http://localhost:4000"

const productActions = {
	getProducts: () => {
		return async  () => {
			try{
				const res = await axios.get(`${HOST}/api/products`)
				if(!res.data.success) throw new Error(res.data.error)
				return {success: true, response: res.data.response}
			}catch(e){
				return { success: false, response: null, error: e.message }
			}
		}
	},

}

export default productActions