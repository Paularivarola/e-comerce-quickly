import './App.css'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Products from './pages/Products'
import NotFound from './pages/NotFound'
import Profile from './pages/Profile'
import CheackOut from './pages/CheckOut'
import AdminPanel from './components/Admin/AdminPanel'
import SignForm from './pages/SignForm'
import Header from './components/Header'
import Footer from './components/Footer'
import { connect } from 'react-redux'
import BuyConfirmation from './components/BuyConfirmation'
import Cart from './pages/Cart'
import Card2 from './components/CheckoutTESTING'
import adminOrderActions from './redux/actions/admin/adminOrderActions'
import userActions from './redux/actions/userActions'

const App = (props) => {
  if (props.socket) {
    if (props.userData?.data?.admin?.flag) {
      props.socket.on('createOrder', () => {
        console.log('createOrder')
        props.getOrders()
      })
      props.socket.on('cancellOrder', () => {
        props.getOrders()
        console.log('order cancelled')
      })
    }
    props.socket.on('updateOrders', () => {
      console.log('updateOrders')
      props.updateOrders()
    })
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
        <Route path='/cart' component={Cart} />
        <Route path='/profile/:page' component={Profile} />
        <Route path='/notfound' component={NotFound} />
        <Route path='/cart' component={Cart} />
        <Route exact path='/checkout/:page' component={CheackOut} />
        <Route path='/compra' component={BuyConfirmation} />
        {props?.userData?.data?.admin?.flag && (
          <>
            <Route path='/admin/dashboard' render={() => <AdminPanel view={'Escritorio'} />} />
            <Route exact path='/admin/clientes' render={() => <AdminPanel view={'Clientes'} />} />
            <Route exact path='/admin/clientes/nuevo' render={() => <AdminPanel view={'Nuevo Usuario'} />} />
            <Route exact path='/admin/pedidos' render={() => <AdminPanel view={'Pedidos'} />} />
            <Route exact path='/admin/productos' render={() => <AdminPanel view={'Productos'} />} />
            <Route exact path='/admin/productos/nuevo' render={() => <AdminPanel view={'Nuevo Producto'} />} />
            <Route path='/admin/productos/editar/:id' render={() => <AdminPanel view={'Editar Producto'} />} />
            <Route path='/admin/cliente/:id' render={() => <AdminPanel view={'Información de Cliente'} />} />
          </>
        )}
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
  getOrders: adminOrderActions.getOrders,
  updateOrders: userActions.updateOrders,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
