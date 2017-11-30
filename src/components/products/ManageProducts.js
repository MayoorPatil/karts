import React, { Component } from 'react';
import Product from './Product.js';
import $ from 'jquery';
const store = require('../../store');
const apiOrigin = require('../../config');

class ManageProducts extends Component {
  constructor(props) {
    super(props);
    this.updateClick = this.updateClick.bind(this);
    this.deleteClick = this.deleteClick.bind(this);
    this.state = {
      products: null
    }
  }

  componentDidMount () {
    $.ajax({
      url: apiOrigin() + '/products',
      method: 'GET',
      success: (data) => {
        this.setState({
          products: data.products
        })
        store.products = data.products
      },
      error: (error) => {
        console.error(error)
      }
    });
  }

updateClick(e, props) {
  store.itemIdToUpdate = props.id
  this.props.history.push('/karts/products/update-item')
}

deleteClick(e, props) {
  $.ajax({
    url: apiOrigin() + '/products/' + props.id,
    method: 'DELETE',
    headers: {
        Authorization: 'Token token=' + store.user.token
    },
    success: (data) => {
      var updatedProducts = this.state.products
      updatedProducts.splice(updatedProducts.findIndex((ele) => ele.id === props.id),1)
      this.setState({
        products: updatedProducts
      })
      this.props.history.push('/karts/products')
    },
    error: (error) => {
      console.error(error)
    }
  });
}

addProduct(e) {
  this.props.history.push('/karts/products/add')
}

    render() {
      if (store.user) {
        if (!this.state.products) {
          var styles = {
            width: '45%'
          }
          return (<div className="progress">Loading...
                    <div className="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style={styles}>
                      <span className="sr-only">45% Complete</span>
                    </div>
                  </div>);
        } else {
          var components = this.state.products.map((item, index) => {
            return <Product
            id={item.id}
            key={index}
            image_url={item.image_url}
            price={item.price}
            description={item.description}
            updateClick={this.updateClick}
            deleteClick={this.deleteClick}
            />
          })
        return (
        <div id="test" className="container">
          <button className="btn btn-success" onClick={(e) => this.addProduct(e)}>Add New Product</button><br /><br />
          {components}
        </div>
      );
      }
    } else {
      return (
        <div className="container">
        <h5>Sorry this page is only accesible to site administrators.</h5>
        Please continue <a href="/karts/shopping">shopping here</a>
        </div>);
    }
  }
}

export default ManageProducts;
