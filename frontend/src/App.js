import './App.css'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Product from './pages/Product'
import SignForm from './pages/SignForm'
import NotFound from './pages/NotFound'
import Profile from './pages/Profile'
import Dashboard from './components/Admin/Dashboard'
import Header from './components/Header'
import Footer from './components/Footer'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/contact' component={Contact} />
        <Route path='/sign-forms/:susi' component={SignForm} />
        <Route path='/product/:id' component={Product} />
        <Route path='/profile' component={Profile} />
        <Route path='/notfound' component={NotFound} />
        <Route path='/dashboard' component={Dashboard} />
        <Redirect to='/notfound' />
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}

export default App
