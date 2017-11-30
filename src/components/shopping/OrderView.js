import React, { Component } from 'react';
import TextInput from '../TextInput.js';
import $ from 'jquery';
const store = require('../../store');
const apiOrigin = require('../../config');

class OrderView extends Component {

  constructor(props) {
    super(props);
    this.setOrderState = this.setOrderState.bind(this);
    this.state = {
      order: {
        name: '',
        address: '',
        phone_number: '',
        email: '',
        amount: 0
      },
      errors: {}
    }
  }

  checkout () {
    if (store.user) {
      this.props.history.push('/karts/order-view')
    } else {
      this.props.history.push('/karts/sign-in')
    }
  }

  setOrderState (e) {
    var field = e.target.name;
    var value = e.target.value;
    var order = this.state.order
    order[field] = value
      this.setState({
        order: order
      })
    }

  orderFormIsValid () {
    var formIsValid = true;
    this.state.errors = {} // clear any previous errors
    if (this.state.order.email.length < 7) {
      this.state.errors.email = 'Email must be at least 7 characters';
      formIsValid = false;
    }
    if (this.state.order.address.length < 10) {
      this.state.errors.address = 'Address must be at least 10 characters';
      formIsValid = false;
    }
    if (this.state.order.name.length < 2) {
      this.state.errors.name = 'Name must be at least 2 characters';
      formIsValid = false;
    }
    if (this.state.order.phone_number.length < 7 || this.state.order.phone_number.length > 10) {
      this.state.errors.phone_number = 'Phone number must be at least 7 digits and less than 11 digits';
      formIsValid = false;
    }
    this.setState({errors: this.state.errors});
    return formIsValid;
  }

  placeOrder (e) {
    e.preventDefault();
    if (!this.orderFormIsValid()) {
      return;
    }
    let data = {};
    data['order'] = this.state.order
    data.order.amount = store.amount
    $.ajax({
    url: apiOrigin() + '/orders',
    method: 'POST',
    headers: {
        Authorization: 'Token token=' + store.user.token
      },
    data: data,
    success: (response) => {
      store.cartProducts.forEach((cartProduct) => {
        let assignData = {}
        assignData['assignment'] = {}
        assignData.assignment['order_id'] = response.order.id
        assignData.assignment['product_id'] = cartProduct.id
        $.ajax({
        url: apiOrigin() + '/assignments',
        method: 'POST',
        headers: {
            Authorization: 'Token token=' + store.user.token
          },
        data: assignData,
        success: (response) => {
          // console.log('assign response..', response)
        },
        error: (response, error) => {
          this.setState({
            message: 'Failed to place order! Please try again ' + response.responseText
          })
            console.error(response)
          }
        })
      })
      store.cartProducts = []
      $('#cart-count').html(store.cartProducts.length)
      this.props.history.push('/karts/order-history');
    },
    error: (response, error) => {
      this.setState({
        message: 'Failed to place order! Please try again ' + response.responseText
      })
        console.error(response)
      }
    })
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
      store.amount = sum
      var checkout
      if (store.user) {
        checkout = <button id="confirm-order" className="btn btn-success" onClick={(e) => this.placeOrder(e)}>Confirm Order</button>
      } else {
        checkout = 'Please sign-in to place the order'
      }
      return (
      <div className="container">
        <div className="table-responsive">
          <h4>Order Details</h4>
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
        <h4>Shipping Details</h4>
        <TextInput
        type="text"
        name="name"
        label="Name"
        placeholder="Name here"
        value={this.state.name}
        onChange={this.setOrderState}
        error={this.state.errors.name}/>

        <TextInput
        type="text"
        name="address"
        label="Home Address"
        placeholder="Address here"
        value={this.state.adderess}
        onChange={this.setOrderState}
        error={this.state.errors.address}/>

        <TextInput
        type="number"
        name="phone_number"
        label="Phone Number"
        placeholder="Phone number here"
        value={this.state.phone_number}
        onChange={this.setOrderState}
        error={this.state.errors.phone_number}/>

        <TextInput
        type="text"
        name="email"
        label=" Confirm Email"
        placeholder="Confirm Email here"
        value={this.state.email}
        onChange={this.setOrderState}
        error={this.state.errors.email}/>
        <br />{checkout}
      </div>
      );
    } else {
      return (
        <div className="container">
          <h5>No orders to display. Please continue <a href="/karts/shopping">shopping here</a></h5>
        </div>
      );
    }
  }
}

export default OrderView;
