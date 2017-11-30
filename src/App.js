import React, { Component } from 'react';
import Home from './Home.js';
import SignUp from './components/SignUp.js';
import SignOut from './components/SignOut.js';
import ChangePassword from './components/ChangePassword.js';
import ManageLogin from './components/ManageLogin.js';
import ManageProducts from './components/products/ManageProducts.js';
import UpdateProduct from './components/products/UpdateProduct.js';
import AddProduct from './components/products/AddProduct.js';
import ManageShopping from './components/shopping/ManageShopping.js';
import CartView from './components/shopping/CartView.js';
import OrderView from './components/shopping/OrderView.js';
import OrderHistory from './components/shopping/OrderHistory.js';
import OrderDisplay from './components/shopping/OrderDisplay.js';
import About from './components/About.js';
import Contact from './components/Contact.js';
import { Navbar } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar inverse collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/karts">Welcome to KArts</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
            <Navbar.Header>
              <ul className="nav navbar-nav">
                <li><Link to="/karts/sign-in" id="sign-in-link">Sign In / Register</Link></li>
                <li><Link to="/karts/shopping" id="products">Shopping</Link></li>
                <li><Link to="/karts/about" id="about">About</Link></li>
                <li><Link to="/karts/contact" id="contact">Contact</Link></li>
                <li><Link to="/karts/order-history" id="order-history" className="hidden">Order History</Link></li>
              </ul>
            </Navbar.Header>
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <Link to="/karts/cart-view" id="cart-view">
                      <span id="cart-count" className="glyphicon glyphicon-shopping-cart badge">0</span>
                  </Link>
                </li>
                <li><Link to="/karts/products" id="manage-products" className="hidden">Manage Products</Link></li>
                <li><Link to="/karts/change-password" id="change-pwd-link" className="hidden">Change Password</Link></li>
                <li><Link to="/karts/sign-out" id="sign-out-link" className="hidden">Sign Out</Link></li>
              </ul>
            </Navbar.Collapse>
          </Navbar>

          <Route exact path="/karts" component={Home}/>
          <Route exact path="/karts/sign-up" component={SignUp}/>
          <Route exact path="/karts/change-password" component={ChangePassword}/>
          <Route exact path="/karts/sign-in" component={ManageLogin}/>
          <Route exact path="/karts/sign-out" component={SignOut}/>
          <Route exact path="/karts/products" component={ManageProducts}/>
          <Route exact path="/karts/products/update-item" component={UpdateProduct}/>
          <Route exact path="/karts/products/add" component={AddProduct}/>
          <Route exact path="/karts/shopping" component={ManageShopping}/>
          <Route exact path="/karts/cart-view" component={CartView}/>
          <Route exact path="/karts/order-view" component={OrderView}/>
          <Route exact path="/karts/order-history" component={OrderHistory}/>
          <Route exact path="/karts/order-display" component={OrderDisplay}/>
          <Route exact path="/karts/about" component={About}/>
          <Route exact path="/karts/contact" component={Contact}/>
        </div>
      </Router>
    )
  }
}

export default App;
