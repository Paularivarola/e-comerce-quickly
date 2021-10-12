import axios from 'axios'
import Swal from 'sweetalert2'
import io from 'socket.io-client'
const HOST = 'http://localhost:4000'

const userActions = {
  createUser: (user, props) => {
    return async (dispatch) => {
      try {
        let res = await axios.post(`${HOST}/api/user/signUp`, user)
        console.log(res)
        if (res.data.success) {
          const { user, userData, token } = res.data
          let keep = false
          localStorage.getItem('cart') &&
            JSON.parse(localStorage.getItem('cart')).length > 0 &&
            Swal.fire({
              title: 'Desea conservar el carrito actual?',
              icon: 'question',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Sí',
              denyButtonText: 'No',
            }).then((result) => {
              if (result.isConfirmed) {
                keep = true
              }
            })
          window.scrollTo(0, 0)
          props.history.push('/')
          localStorage.setItem('socket', userData._id)
          let socket = io(`${HOST}`, {
            query: { socketId: userData._id, admin: userData.data.admin.flag },
          })
          dispatch({ type: 'SET_SOCKET', payload: { socket } })
          return dispatch({
            type: 'LOG_IN',
            payload: { user, userData, token, keep },
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  logUser: (user, props) => {
    return async (dispatch) => {
      try {
        let res = await axios.post(`${HOST}/api/user/logIn`, { ...user })
        if (res.data.success) {
          const { user, userData, token } = res.data
          let keep = false
          localStorage.getItem('cart') &&
            JSON.parse(localStorage.getItem('cart')).length > 0 &&
            Swal.fire({
              title: 'Desea conservar el carrito actual?',
              icon: 'question',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Sí',
              denyButtonText: 'No',
            }).then((result) => {
              if (result.isConfirmed) {
                keep = true
              }
            })
          window.scrollTo(0, 0)
          props.history.push('/')
          localStorage.setItem('socket', userData._id)
          let socket = io(HOST, {
            query: { socketId: userData._id, admin: userData.data.admin.flag },
          })
          dispatch({ type: 'SET_SOCKET', payload: { socket } })
          return dispatch({
            type: 'LOG_IN',
            payload: { user, userData, token, keep },
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  logOut: () => {
    return (dispatch) => {
      return dispatch({ type: 'LOG_OUT' })
    }
  },
  verifyToken: () => {
    return async (dispatch) => {
      let token = localStorage.getItem('token')
      try {
        let response = await axios.get(`${HOST}/api/user/token`, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        localStorage.setItem('socket', response.data.userData._id)
        let socket = io(HOST, {
          query: {
            socketId: response.data.userData._id,
            admin: response.data.userData.data.admin.flag,
          },
        })
        dispatch({ type: 'SET_SOCKET', payload: { socket } })
        dispatch({
          type: 'LOG_IN',
          payload: { ...response.data, token },
        })
      } catch (error) {
        console.log(error)
        // return dispatch({ type: 'LOG_OUT' })
      }
    }
  },
  manageCart: (body) => {
    return async (dispatch) => {
      console.log(body)
      let token = localStorage.getItem('token')
      if (!token) {
        let cart = JSON.parse(localStorage.getItem('cart'))
        localStorage.setItem('cart', cart ? JSON.stringify([...cart, body.cartItem]) : JSON.stringify([body.cartItem]))
      } else {
        try {
          let response = await axios.put(`${HOST}/api/products`, body)
          if (!response?.data?.success) throw new Error('Algo salió mal')
          return dispatch({
            type: 'HANDLE_CART',
            payload: response.data.userData,
          })
        } catch (error) {
          console.log(error)
        }
      }
    }
  },

  favHandler: (body) => {
    return async (dispatch) => {
      let token = localStorage.getItem('token')
      try {
        let response = await axios.put(`${HOST}/api/products/favs`, body, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        if (!response?.data?.success) throw new Error('Algo salió mal')
        dispatch({
          type: 'GET_PRODUCTS',
          payload: response.data.response,
        })
        return response?.data?.success
      } catch (error) {
        console.log(error)
      }
    }
  },
  updateUser: ({ action, userData, fileImg, currentPassword, password, newPaymentCard, paymentCardId, newAddress, addressId }) => {
    return async (dispatch) => {
      let token = localStorage.getItem('token')
      let body = fileImg || {
        action,
        userData,
        currentPassword,
        password,
        newPaymentCard,
        paymentCardId,
        newAddress,
        addressId,
      }
      try {
        let res = await axios.put(`${HOST}/api/user`, body, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        return dispatch({
          type: 'LOG_IN',
          payload: { ...res.data, token, keep: true },
        })
      } catch (error) {
        console.log(error)
        // return dispatch({ type: 'LOG_OUT' })
      }
    }
  },
}

export default userActions
