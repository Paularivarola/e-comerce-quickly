import axios from 'axios'
const HOST = 'http://localhost:4000'

const productActions = {
  getProducts: () => {
    return async (dispatch) => {
      try {
        const response = await axios.get(`${HOST}/api/products`)
        if (!response.data.success) throw new Error(response.data.error)
        await dispatch({
          type: 'GET_PRODUCTS',
          payload: response.data.response,
        })
        return { success: true, response: response.data.response }
      } catch (e) {
        return { success: false, response: null, error: e.message }
      }
    }
  },
}

export default productActions
