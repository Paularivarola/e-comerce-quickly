import axios from 'axios'
const HOST = 'http://localhost:4000'

const orderActions = {
  getUserOders: (userId) => {
    return async (dispatch) => {
      try {
        const res = await axios.get(`${HOST}/api/orders`, userId)
        if (!res.data.success) throw new Error(res.data.error)
        dispatch({ type: 'GET_USER_ORDERS', payload: res.data.response })
        return { success: true, response: res.data.response, error: null }
      } catch (e) {
        return { success: false, response: null, error: e.message }
      }
    }
  },
  createOrder: (props, order) => {
    return async (dispatch) => {
      console.log(order)
      try {
        const res = await axios.post(`${HOST}/api/orders`, order)
        if (!res.data.success) throw new Error(res.data.error)
        const { newOrder, userData } = res.data.response
        dispatch({ type: 'CREATE_ORDER', payload: { newOrder, userData } })
        return props.history.push('/profile/his')
      } catch (e) {
        return { success: false, response: null, error: e.message }
      }
    }
  },
  cancellOrder: (orderId) => {
    return async (dispatch) => {
      try {
        const res = await axios.put(`${HOST}/api/order/` + orderId)
        if (!res.data.success) throw new Error(res.data.error)
        const { orderCancelled } = res.data.response
        return dispatch({ type: 'CANCELL_ORDER', payload: { orderCancelled } })
      } catch (e) {
        console.log(e.message)
        return { success: false, response: null, error: e.message }
      }
    }
  },
}

export default orderActions
