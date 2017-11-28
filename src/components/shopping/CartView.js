import React, { Component } from 'react';
const store = require('../../store');

class CartView extends Component {

  render() {
    var sum = 0.0
    var cartProducts = store.cartProducts.map((item, index) => {
      sum += parseFloat(item.price)
      return <tr id={item.id} key={index}>
        <td>{item.id}</td>
        <td>{item.description}</td>
        <td>{item.price}</td>
      </tr>
    })

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
          </tbody>
        </table>
      </div>
    );
  }
}

export default CartView;
