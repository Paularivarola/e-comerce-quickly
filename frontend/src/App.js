import "./App.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Products from "./pages/Products";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import stylesCris from "./styles/stylesCris.css";
import Dashboard from "./components/Admin/Dashboard";


const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/contact' component={Contact} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={SignUp} />
        <Route path='/product/:id' component={Product} />
        <Route path='/profile' component={Profile} />
        <Route path='/notfound' component={NotFound} />
        <Route path='/dashboard' component={Dashboard} />
        <Redirect to='/notfound' />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
