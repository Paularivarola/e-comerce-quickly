import axios from 'axios'
const HOST = 'https://quickly-food.herokuapp.com'

const adminOrderActions = {
  getOrders: () => {
    let token = localStorage.getItem('token')
    return async (dispatch) => {
      let response = await axios.get(`${HOST}/api/admin/orders`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      if (response.data.success) {
        await dispatch({ type: 'GET_ORDERS', payload: response.data.response })
        return response.data
      }
    }
  },
  updateOrder: (updated, orderId) => {
    let token = localStorage.getItem('token')
    return async (dispatch) => {
      let response = await axios.put(`${HOST}/api/admin/order/` + orderId, updated, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      if (response.data.success) {
        await dispatch({ type: 'UPDATE_ORDER', payload: updated })
        return response.data
      }
    }
  },
  deleteOrder: (orderId) => {
    let token = localStorage.getItem('token')
    return async (dispatch) => {
      let response = await axios.delete(`${HOST}/api/admin/order/` + orderId, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      if (response.data.success) {
        await dispatch({ type: 'DELETE_ORDER', payload: orderId })
        return response.data
      }
    }
  },
}

export default adminOrderActions
