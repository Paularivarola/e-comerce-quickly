import './App.css'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Products from './pages/Products'
import NotFound from './pages/NotFound'
import Profile from './pages/Profile'
import stylesCris from './styles/stylesCris.css'
import AdminPanel from './components/Admin/AdminPanel'
import SignForm from './pages/SignForm'
import Header from './components/Header'
import Footer from './components/Footer'

const App = (props) => {
  console.log(props)
  return (
    <BrowserRouter>
      {!window.location.pathname.includes('/admin') && <Header />}
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/contact' component={Contact} />
        <Route path='/sign-forms/:susi' component={SignForm} />
        <Route path='/product/:id' component={Product} />
        <Route path='/profile' component={Profile} />
        <Route path='/notfound' component={NotFound} />
        <Route path='/admin/dashboard' render={() => <AdminPanel view={'Escritorio'} />} />
        <Route exact path='/admin/clientes' render={() => <AdminPanel view={'Clientes'} />} />
        <Route exact path='/admin/pedidos' render={() => <AdminPanel view={'Pedidos'} />} />
        <Route exact path='/admin/productos' render={() => <AdminPanel view={'Productos'} />} />
        <Route exact path='/admin/productos/nuevo' render={() => <AdminPanel view={'Nuevo Producto'} />} />
        <Redirect to='/notfound' />
      </Switch>
      {!window.location.pathname.includes('/admin') && <Footer />}
    </BrowserRouter>
  )
}

export default App
