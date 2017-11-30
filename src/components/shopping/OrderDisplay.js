import React, { Component } from 'react';
const store = require('../../store');

class OrderDisplay extends Component {

  render() {
    let sum = 0
      var order = store.orders.find(ele => ele.order.id === store.orderIdToDisplay)
      var orderProducts = order.order.products.map((product, index) => {
        sum += Number((Math.round(parseFloat(product.price) + 'e2')) + 'e-2')
        return <tr id={product.id} key={index}>
          <td>{product.id}</td>
          <td>{product.description}</td>
          <td>{product.price}</td>
        </tr>
      })
      return <div className="table-responsive" id={order.id}>
        <table className="table">
          <thead>
            <tr>
              <th>Product Id</th>
              <th>Descripton</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {orderProducts}
            <tr>
              <th>&nbsp;</th>
              <th>Total</th>
              <th>{sum}</th>
            </tr>
          </tbody>
        </table>
      </div>
  }
}

export default OrderDisplay;
