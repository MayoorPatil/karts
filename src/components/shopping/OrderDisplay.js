import React, { Component } from 'react';
import $ from 'jquery';
const store = require('../../store');
const apiOrigin = require('../../config');

class OrderDisplay extends Component {

  constructor(props) {
    super(props);
    this.deleteItem = this.deleteItem.bind(this);
    this.state = {
      products: []
    }
  }

  componentDidMount () {
    if (store.orders) {
      var order = store.orders.find(ele => ele.order.id === store.orderIdToDisplay)
      this.setState({
        products: order.order.products
      })
    }
  }

  deleteItem (e, array) {
    if (store.user) {
      let data = {};
      data['order'] = {}
      data.order.address = array[0].order.address
      data.order.amount = Number((Math.round(parseFloat(array[0].order.amount) - parseFloat(array[1].price) + 'e2')) + 'e-2')
      data.order.email = array[0].order.email
      data.order.name = array[0].order.name
      data.order.phone_number = array[0].order.phone_number
      data.order.status = 'completed'
      $.ajax({
        url: apiOrigin() + '/orders/' + array[0].order.id,
        method: 'PATCH',
        data: data,
        headers: {
            Authorization: 'Token token=' + store.user.token
        },
        success: (data) => {
          $.ajax({
            url: apiOrigin() + '/assignments/' + array[2],
            method: 'DELETE',
            headers: {
                Authorization: 'Token token=' + store.user.token
            },
            success: (data) => {
              var updatedProducts = this.state.products
              updatedProducts.splice(updatedProducts.findIndex((ele) => ele.id === array[1].id),1)
              this.setState({
                products: updatedProducts
              })
            },
            error: (error) => {
              console.error(error)
            }
          });
        },
        error: (error) => {
          console.error(error)
        }
      });
  }
}
  render() {
    if (store.orders && store.orders.length > 0) {
      let sum = 0
      let button = ''
        var order = store.orders.find(ele => ele.order.id === store.orderIdToDisplay)
        if (order.order.products.length > 1) {
          var orderProducts = order.order.products.map((product, index) => {
            sum += Number((Math.round(parseFloat(product.price) + 'e2')) + 'e-2')
            let assignIndex = order.order.assignment[index].id
            return <tr id={product.id} key={index}>
              <td>{product.id}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td><button id={assignIndex} className="btn btn-danger btn-xs" onClick={(e) => this.deleteItem(e, [order, product, assignIndex])}>Delete Item</button></td>
            </tr>
          })
        } else {
          var orderProducts = order.order.products.map((product, index) => {
            sum += Number((Math.round(parseFloat(product.price) + 'e2')) + 'e-2')
            return <tr id={product.id} key={index}>
              <td>{product.id}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
            </tr>
          })
        }

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

export default OrderDisplay;
