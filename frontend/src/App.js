import './App.css'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Products from './pages/Products'
import NotFound from './pages/NotFound'
import Profile from './pages/Profile'
import CheackOut from './pages/CheckOut'
import AdminPanel from './components/Admin/AdminPanel'
import Card from './components/CARD'
import SignForm from './pages/SignForm'
import Header from './components/Header'
import Footer from './components/Footer'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { connect } from 'react-redux'
import socketActions from './redux/actions/socketActions'
import BuyConfirmation from './components/BuyConfirmation'
import Cart from './pages/Cart'
import Card2 from './components/CheckoutTESTING'

const App = (props) => {
  const [socket, setSocket] = useState(null)
  useEffect(() => {
    if (!localStorage.getItem('socket') && !localStorage.getItem('token')) {
      setSocket(io('http://localhost:4000'))
    }
  }, [])

  useEffect(() => {
    if (socket) {
      socket.on('socketId', ({ socketId }) => {
        if (!localStorage.getItem('socket')) {
          localStorage.setItem('socket', socketId)
          props.setSocketLS(socketId)
        }
      })
    }
  }, [socket])

  if (props.socket && localStorage.getItem('socket')) {
    if (props.userData?.data?.admin?.flag) {
      props.socket.on('createOrder', () => {
        console.log('order created')
      })
      props.socket.on('cancellOrder', () => {
        console.log('order cancelled')
      })
    } else {
      props.socket.on('updateOrders', () => {
        console.log('order updated')
      })
    }
  }

  return (
    <BrowserRouter>
      {!window.location.pathname.includes('/admin') && <Header />}
      {/* <button onClick={() => props.socket.emit('createOrder')}>create</button>
        <button onClick={() => props.socket.emit('cancellOrder')}>cancell</button>
        <button onClick={() => props.socket.emit('updateOrders')}>update</button> */}
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/contact' component={Contact} />
        <Route path='/card' component={Card2} />
        <Route path='/sign-forms/:susi' component={SignForm} />
        <Route path='/products' component={Products} />
        <Route path='/profile/:page' component={Profile} />
        <Route path='/notfound' component={NotFound} />
        <Route path='/cart' component={Cart} />
        <Route exact path='/checkout' component={CheackOut} />
        <Route path='/compra' component={BuyConfirmation} />
        <Route
          path='/admin/dashboard'
          render={() => <AdminPanel view={'Escritorio'} />}
        />
        <Route
          exact
          path='/admin/clientes'
          render={() => <AdminPanel view={'Clientes'} />}
        />
        <Route
          exact
          path='/admin/pedidos'
          render={() => <AdminPanel view={'Pedidos'} />}
        />
        <Route
          exact
          path='/admin/productos'
          render={() => <AdminPanel view={'Productos'} />}
        />
        <Route
          exact
          path='/admin/productos/nuevo'
          render={() => <AdminPanel view={'Nuevo Producto'} />}
        />
        <Redirect to='/notfound' />
      </Switch>
      {!window.location.pathname.includes('/admin') && <Footer />}
    </BrowserRouter>
  )
}

const mapStateToProps = (state) => {
  return {
    userData: state.users.userData, //PARA ADMINS
    socket: state.users.socket,
  }
}

const mapDispatchToProps = {
  setSocketLS: socketActions.setSocketLS,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
