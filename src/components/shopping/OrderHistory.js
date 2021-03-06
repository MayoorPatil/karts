import React, { Component } from 'react';
import $ from 'jquery';
const store = require('../../store');
const apiOrigin = require('../../config');

class OrderHistory extends Component {

  constructor(props) {
    super(props);
    this.displayOrder = this.displayOrder.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);
    this.state = {
      orders: []
    }
  }

  componentDidMount () {
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
    if (store.user) {
      this.setState({
      orders: store.user.orders
      })
    }
  }

  deleteOrder (e, orderId) {
    if (store.user) {
      $.ajax({
        url: apiOrigin() + '/orders/' + orderId,
        method: 'DELETE',
        headers: {
            Authorization: 'Token token=' + store.user.token
        },
        success: (data) => {
          var updatedOrders = this.state.orders
          updatedOrders.splice(updatedOrders.findIndex((ele) => ele.id === orderId),1)
          this.setState({
            orders: updatedOrders
          })
          $('#status-message').html('Delete Success!!');
          var props = this.props.history
          setTimeout(function() {
          $('#status-message').html('');
          props.push('/karts/order-history');},500)
        },
        error: (error) => {
          console.error(error)
        }
      });
  }
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
        var date = (new Date()).toISOString().split('T')[0]
        date = (order.created_at === undefined) ? date : (new Date(order.created_at)).toISOString().split('T')[0]
        let orderId = order.id
        return <tr id={order.id} key={index}>
          <td> {order.id} </td>
          <td>{date}</td>
          <td>{amount}</td>
          <td>
            <button id={order.id} className="btn btn-info btn-xs" onClick={(e) => this.displayOrder(e, orderId)}>View Details</button>&nbsp;&nbsp;
            <button id={order.id} className="btn btn-danger btn-xs" onClick={(e) => this.deleteOrder(e, orderId)}>Delete Order</button>
          </td>
        </tr>
      })
      return (
        <div className="table-responsive">
        <div id="status-message" className="container"></div>
          <table className="table">
            <thead>
              <tr>
                <th>Order Id</th>
                <th>Order Date</th>
                <th>Amount</th>
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
              <h5>No orders to display. Also you need to sign-in to view your orders <br/><br />
              Please continue <a href="/karts/shopping">shopping here</a></h5>
            </div>
          );
      }
    }
  }
}

export default OrderHistory;
