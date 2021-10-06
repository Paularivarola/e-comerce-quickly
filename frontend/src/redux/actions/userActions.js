import axios from 'axios'
import Swal from 'sweetalert2'
const HOST = 'http://localhost:4000'

const userActions = {
  createUser: (user, props) => {
    return async (dispatch) => {
      try {
        let res = await axios.post(`${HOST}/api/user/signUp`, user)
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
          props.history.push('/')
          dispatch({ type: 'LOG_IN', payload: { user, userData, token, keep } })
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
          props.history.push('/')
          dispatch({ type: 'LOG_IN', payload: { user, userData, token, keep } })
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
        dispatch({
          type: 'LOG_IN',
          payload: { ...response.data, token },
        })
      } catch (error) {
        console.log(error)
        return dispatch({ type: 'LOG_OUT' })
      }
    }
  },
}

export default userActions
