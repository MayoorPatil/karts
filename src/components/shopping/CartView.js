import React, { Component } from 'react';
import $ from 'jquery';
const store = require('../../store');

class CartView extends Component {

  constructor(props) {
    super(props);
    this.updateCart = this.updateCart.bind(this);
    this.state = {
      cartProducts: []
    }
  }

componentDidMount () {
  this.setState({
    cartProducts: store.cartProducts
  })
}

  checkout () {
    if (store.user) {
      this.props.history.push('/karts/order-view')
    } else {
      store.proceedToCheckout = true
      this.props.history.push('/karts/sign-in')
    }
  }

  updateCart (e, props) {
    var updatedProducts = this.state.cartProducts
    updatedProducts.splice(updatedProducts.findIndex((ele) => ele.id === props),1)
    this.setState({
      cartProducts: updatedProducts
    })
    $('#cart-count').html(this.state.cartProducts.length)
  }

  render() {
    if (store.cartProducts && store.cartProducts.length > 0) {
      var sum = 0.0
      var cartProducts = store.cartProducts.map((item, index) => {
        sum += Number((Math.round(parseFloat(item.price) + 'e2')) + 'e-2')
        return <tr id={item.id} key={index}>
          <td>{item.id}</td>
          <td>{item.description}</td>
          <td>{item.price}&nbsp;&nbsp;&nbsp;&nbsp;
            <button type="button" className="btn btn-danger btn-sm" onClick={(e) => this.updateCart(e, item.id)}>
            <span className="glyphicon glyphicon-trash"></span>
            </button>
          </td>
        </tr>
      })
      var checkout
      if (store.user) {
        checkout = <button id="place-order" className="btn btn-success" onClick={(e) => this.checkout(e)}>Place Order</button>
      } else {
        checkout = <button id="checkout" className="btn btn-success" onClick={(e) => this.checkout(e)}>Proceed To Checkout</button>
      }
      return (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Product Id</th>
                <th>Descripton</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {cartProducts}
              <tr>
                <th>&nbsp;</th>
                <th>Total</th>
                <th>{sum}</th>
              </tr>
              <tr>
                <th>&nbsp;</th>
                <th>&nbsp;</th>
                <th>{checkout}</th>
              </tr>
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div className="container">
          <h5>Cart is empty. Please continue shopping!</h5>
        </div>
      );
    }
  }
}

export default CartView;
