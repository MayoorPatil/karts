import React, { Component } from 'react';
import CartProducts from './CartProducts.js';
import $ from 'jquery';
const store = require('../../store');
const apiOrigin = require('../../config');

class ManageShopping extends Component {
  constructor(props) {
    super(props);
    this.updateCart = this.updateCart.bind(this);
    this.state = {
      products: null,
      cartProducts: []
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

  updateCart (e, props) {
    var product = store.products.find(ele => ele.id === props.id)
    var products = this.state.cartProducts
    products.push(product)
    this.setState({
      cartProducts: products
    })
    store.cartProducts = products
    $('#cart-count').html(this.state.cartProducts.length)
    $('#' + props.id).addClass('hidden')
  }

    render() {
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
                return <CartProducts
                id={item.id}
                key={index}
                image_url={item.image_url}
                price={item.price}
                description={item.description}
                updateCart={this.updateCart}
                />
              })
            return (
            <div id="test" className="container">
              <div className="row" ref="shopping-div">
                {components}
              </div>
            </div>
          );
        }
      }
}

export default ManageShopping;
