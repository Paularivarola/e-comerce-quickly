import axios from 'axios'
const HOST = 'https://quickly-food.herokuapp.com'

const adminProductActions = {
  getProducts: () => {
    return async (dispatch) => {
      try {
        const response = await axios.get(`${HOST}/api/products`)
        if (!response.data.success) throw new Error(response.data.error)
        await dispatch({ type: 'GET_PRODUCTS', payload: response.data.response })
        return { success: true, response: response.data.response }
      } catch (e) {
        return { success: false, response: null, error: e.message }
      }
    }
  },
  createProduct: (product, props) => {
    let token = localStorage.getItem('token')
    return async (dispatch) => {
      let response = await axios.post(`${HOST}/api/admin/productos`, product, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      if (response.data.success) {
        await dispatch({ type: 'ADD_PRODUCT', payload: response.data.response })
        return response.data
      }
    }
  },
  updateProduct: (updated, productId) => {
    let token = localStorage.getItem('token')
    return async (dispatch) => {
      let response = await axios.put(`${HOST}/api/admin/producto/` + productId, updated, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      if (response.data.success) {
        await dispatch({ type: 'UPDATE_PRODUCT', payload: updated })
        return response.data
      }
    }
  },
  deleteProduct: (productId) => {
    let token = localStorage.getItem('token')
    return async (dispatch) => {
      let response = await axios.delete(`${HOST}/api/admin/producto/` + productId, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      if (response.data.success) {
        await dispatch({ type: 'DELETE_PRODUCT', payload: productId })
        return response.data
      }
    }
  },
}

export default adminProductActions
