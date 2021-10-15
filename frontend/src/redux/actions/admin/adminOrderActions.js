import axios from 'axios'
const HOST = 'http://localhost:4000'

const adminOrderActions = {
  getOrders: () => {
    console.log('entro')
    let token = localStorage.getItem('token')
    return async (dispatch) => {
      let response = await axios.get(`${HOST}/api/admin/orders`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      console.log(response)
      if (response.data.success) {
        console.log(response.data.response)
        await dispatch({ type: 'GET_ORDERS', payload: response.data.response })
        return response.data
      }
    }
  },
  updateOrder: (updated, orderId) => {
    console.log(updated, orderId)
    let token = localStorage.getItem('token')
    return async (dispatch) => {
      let response = await axios.put(`${HOST}/api/admin/order/` + orderId, { status: updated }, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      console.log(response.data)
      if (response.data.success) {
        dispatch({ type: 'EMIT_UPDATE', payload: response.data.response })
        dispatch({ type: 'UPDATE_ADMIN_ORDER', payload: response.data.response })
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
