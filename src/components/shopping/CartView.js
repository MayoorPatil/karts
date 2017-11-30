import React, { Component } from 'react';
const store = require('../../store');

class CartView extends Component {

  checkout () {
    if (store.user) {
      this.props.history.push('/karts/order-view')
    } else {
      store.proceedToCheckout = true
      this.props.history.push('/karts/sign-in')
    }
  }

  render() {
    if (store.cartProducts) {
      var sum = 0.0
      var cartProducts = store.cartProducts.map((item, index) => {
        sum += Number((Math.round(parseFloat(item.price) + 'e2')) + 'e-2')
        return <tr id={item.id} key={index}>
          <td>{item.id}</td>
          <td>{item.description}</td>
          <td>{item.price}</td>
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
