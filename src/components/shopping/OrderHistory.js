import React, { Component } from 'react';
import $ from 'jquery';
const store = require('../../store');
const apiOrigin = require('../../config');

class OrderHistory extends Component {

  constructor(props) {
    super(props);
    this.displayOrder = this.displayOrder.bind(this);
    this.state = {
      orders: []
    }
  }

  componentDidMount () {
    let products = []
    let orders = []
    if (store.user) {
      store.user.orders.forEach((order, index) => {
        $.ajax({
          url: apiOrigin() + '/orders/' + order.id,
          method: 'GET',
          headers: {
              Authorization: 'Token token=' + store.user.token
          },
          success: (data) => {
            orders.push(data)
          },
          error: (error) => {
            console.error(error)
          }
        });
      }
    )}
    store.orders = orders
    this.setState({
    orders: orders
  })
  }

  displayOrder(e, props) {
    store.orderIdToDisplay = props
    this.props.history.push('/karts/order-display')
  }

  render() {
    if (store.user && store.user.orders.length > 0) {
      var amount = 0.0
      var status = ''
      var orders = store.user.orders.map((order, index) => {
        amount = order.amount === null ? 0 : Number((Math.round(parseFloat(order.amount) + 'e2')) + 'e-2')
        status = order.status === null ? 'completed' : order.status
        let orderId = order.id
        return <tr id={order.id} key={index}>
          <td> {order.id} </td>
          <td>{order.created_at}</td>
          <td>{amount}</td>
          <td>{status}</td>
          <td><button id={order.id} className="btn btn-info btn-xs" onClick={(e) => this.displayOrder(e, orderId)}>View Details</button></td>
        </tr>
      })
      return (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Order Id</th>
                <th>Order Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders}
            </tbody>
          </table>
        </div>
      );
    } else {
      if (store.user) {
        return (
          <div className="container">
            <h5>No orders to display. Please continue shopping!</h5>
          </div>
        );
      } else {
          return (
            <div className="container">
              <h5>No orders to display. Also you need to sign-in to view your orders <br/><br />Please continue shopping!</h5>
            </div>
          );
      }
    }
  }
}

export default OrderHistory;
