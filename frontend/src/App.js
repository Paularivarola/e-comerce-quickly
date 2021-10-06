import './App.css'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Products from './pages/Products'
import NotFound from './pages/NotFound'
import Profile from './pages/Profile'
import AdminPanel from './components/Admin/AdminPanel'
import SignForm from './pages/SignForm'
import Header from './components/Header'
import Footer from './components/Footer'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { connect } from 'react-redux'
import socketActions from './redux/actions/socketActions'

const App = (props) => {
  const [socket, setSocket] = useState(null)
  useEffect(() => {
    if (!localStorage.getItem('socket') && !localStorage.getItem('token')) {
      setSocket(io('http://localhost:4000'))
    }
  }, [])

  useEffect(() => {
    if (socket && !localStorage.getItem('socket')) {
      socket.on('socketId', ({ socketId }) => {
        localStorage.setItem('socket', socketId)
        let socketLS = io('http://localhost:4000', { query: { socketId } })
        props.setSocketLS(socketLS)
      })
    }
  }, [socket])

  if (socket && localStorage.getItem('socket')) {
    socket.on('createOrder', () => {
      console.log('hola')
    })
  }

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
        <Route path='/dashboard' component={AdminPanel} />
        <Redirect to='/notfound' />
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}

const mapDispatchToProps = {
  setSocketLS: socketActions.setSocketLS,
}

export default connect(null, mapDispatchToProps)(App)
