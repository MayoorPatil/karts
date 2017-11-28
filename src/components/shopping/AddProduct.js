import React, { Component } from 'react';
import TextInput from '../TextInput.js';
import $ from 'jquery';
const store = require('../../store');
const apiOrigin = require('../../config');

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.setProductState = this.setProductState.bind(this);
    this.state = {
      product: {},
      errors: {},
      message: ''
    }
  }

  setProductState (e) {
    var field = e.target.name;
    var value = e.target.value;
    var product = this.state.product
    product[field] = value
      this.setState({
        product: product
      })
    }

  componentDidMount () {
    console.log('item to update', store.itemIdToUpdate)
    console.log('products in UpdateItem', store.products)
    var product = store.products.find(ele => ele.id === store.itemIdToUpdate)
    console.log('do i have the right product', product)
    this.setState({
      product: product
    })
  }

  updateFormIsValid () {
    var formIsValid = true;
    this.state.errors = {} // clear any previous errors
    if (this.state.product.description.length < 3) {
      this.state.errors.description = 'Description must be at least 3 characters';
      formIsValid = false;
    }
    if (this.state.product.price.length < 1) {
      this.state.errors.price = 'Price cannot be blank';
      formIsValid = false;
    }
    if (this.state.product.image_url.length < 10) {
      this.state.errors.password_confirmation = 'URL must be at least 10 characters';
      formIsValid = false;
    }
    this.setState({errors: this.state.errors});
    return formIsValid;
  }

  updateItem(e) {
    e.preventDefault();
    if (!this.updateFormIsValid()) {
      return;
    }
    let data = {};
    data['product'] = this.state.product
    $.ajax({
    url: apiOrigin() + '/products/' + this.state.product.id,
    method: 'PATCH',
    headers: {
        Authorization: 'Token token=' + store.user.token
      },
    data: data,
    success: (response) => {
      this.props.history.push('/karts/shopping');
    },
    error: (response, error) => {
      this.setState({
        message: 'Update Failed! Please try again ' + response.responseText
      })
      console.error(response)
    }
  })
  }

  render() {
    console.log('info in update props', this.props)
    console.log('sate in update render', this.state)
    return (
      <div className="container">
        <h3>Update Item</h3>
        <form>
          <TextInput
          type="text"
          name="description"
          label="Description"
          placeholder="Description here"
          value={this.state.product.description}
          onChange={this.setProductState}
          />

          <TextInput
          type="text"
          name="price"
          label="Price"
          placeholder="Price here"
          value={this.state.product.price}
          onChange={this.setProductState}
          />

          <TextInput
          type="text"
          name="image_url"
          label="Image URL"
          placeholder="Image URL here"
          value={this.state.product.image_url}
          onChange={this.setProductState}
          />

          <button className="btn btn-success" onClick={(e) => this.updateItem(e)}>Update</button>
          <br /><br /><p>{this.state.message}</p>
        </form>
      </div>
    );
  }
}

export default AddProduct;
