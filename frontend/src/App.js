import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Products from './pages/Products'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import NotFound from './pages/NotFound'


const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/contact' component={Contact} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={SignUp} />
        <Route path='/product/:id' component={Product} />
        <Route path='/notfound' component={NotFound} />
        <Redirect to='/notfound' />
      </Switch>
    </BrowserRouter>
  )
}

export default App
